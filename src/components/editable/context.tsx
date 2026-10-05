"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getPath, setPath } from "@/lib/path";

export type SaveStatus = "idle" | "unpublished" | "dirty" | "saving" | "saved" | "publishing" | "published" | "error";

type EditableContextValue = {
  editing: boolean;
  get: (path: string) => unknown;
  set: (path: string, value: unknown) => void;
  /** Writes a field straight to both draft and published content, live
   * immediately — used for image replacements, which shouldn't need a
   * separate Publish click the way batched text edits do. */
  setAndPublish: (path: string, value: unknown) => Promise<void>;
  status: SaveStatus;
  errorMessage: string | null;
  save: () => Promise<void>;
  publish: () => Promise<void>;
  discard: () => Promise<void>;
};

const EditableContext = createContext<EditableContextValue | null>(null);

export function useEditable() {
  return useContext(EditableContext);
}

export function EditableProvider<T>({
  page,
  initialDraft,
  initiallyUnpublished = false,
  saveDraftAction,
  publishAction,
  publishFieldAction,
  discardAction,
  children,
}: {
  page: string;
  initialDraft: T;
  /** True when the saved draft already differs from what's published — e.g.
   * someone uploaded an image or edited text in a previous visit and never
   * clicked Publish. Without this, the toolbar would say "No changes" on
   * load even though there's unpublished work waiting. */
  initiallyUnpublished?: boolean;
  saveDraftAction: (page: string, draft: T) => Promise<void>;
  publishAction: (page: string) => Promise<void>;
  publishFieldAction: (page: string, path: string, value: unknown) => Promise<void>;
  discardAction: (page: string) => Promise<T>;
  children: React.ReactNode;
}) {
  const [draft, setDraft] = useState<T>(initialDraft);
  const [status, setStatus] = useState<SaveStatus>(initiallyUnpublished ? "unpublished" : "idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const get = useCallback((path: string) => getPath(draft, path), [draft]);

  const set = useCallback((path: string, value: unknown) => {
    setDraft((d) => setPath(d, path, value));
    setStatus("dirty");
  }, []);

  const setAndPublish = useCallback(
    async (path: string, value: unknown) => {
      setDraft((d) => setPath(d, path, value));
      setErrorMessage(null);
      try {
        await publishFieldAction(page, path, value);
        // Leave "dirty"/"saving" alone — there may be unrelated text edits
        // still pending their own Publish click. Otherwise this field is
        // now fully live, so clear any stale "unpublished" warning.
        setStatus((s) => (s === "dirty" || s === "saving" ? s : "published"));
      } catch (err) {
        setErrorMessage(err instanceof Error ? err.message : "Failed to publish");
        setStatus("error");
        throw err;
      }
    },
    [page, publishFieldAction]
  );

  const save = useCallback(async () => {
    setStatus("saving");
    setErrorMessage(null);
    try {
      await saveDraftAction(page, draft);
      setStatus("saved");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to save");
      setStatus("error");
      throw err;
    }
  }, [page, draft, saveDraftAction]);

  const publish = useCallback(async () => {
    setErrorMessage(null);
    try {
      if (status === "dirty") {
        setStatus("saving");
        await saveDraftAction(page, draft);
      }
      setStatus("publishing");
      await publishAction(page);
      setStatus("published");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to publish");
      setStatus("error");
      throw err;
    }
  }, [status, page, draft, saveDraftAction, publishAction]);

  // Autosave the draft a moment after the last edit, so switching tabs in the
  // editor (which keeps every tab mounted, just hidden) never loses work.
  useEffect(() => {
    if (status !== "dirty") return;
    const timer = setTimeout(() => {
      save().catch(() => {});
    }, 900);
    return () => clearTimeout(timer);
  }, [status, save]);

  const discard = useCallback(async () => {
    setErrorMessage(null);
    try {
      const restored = await discardAction(page);
      setDraft(restored);
      setStatus("idle");
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Failed to discard changes");
      setStatus("error");
      throw err;
    }
  }, [page, discardAction]);

  return (
    <EditableContext.Provider
      value={{ editing: true, get, set, setAndPublish, status, errorMessage, save, publish, discard }}
    >
      {children}
    </EditableContext.Provider>
  );
}
