"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { getPath, setPath } from "@/lib/path";

export type SaveStatus = "idle" | "dirty" | "saving" | "saved" | "publishing" | "published" | "error";

type EditableContextValue = {
  editing: boolean;
  get: (path: string) => unknown;
  set: (path: string, value: unknown) => void;
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
  saveDraftAction,
  publishAction,
  discardAction,
  children,
}: {
  page: string;
  initialDraft: T;
  saveDraftAction: (page: string, draft: T) => Promise<void>;
  publishAction: (page: string) => Promise<void>;
  discardAction: (page: string) => Promise<T>;
  children: React.ReactNode;
}) {
  const [draft, setDraft] = useState<T>(initialDraft);
  const [status, setStatus] = useState<SaveStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const get = useCallback((path: string) => getPath(draft, path), [draft]);

  const set = useCallback((path: string, value: unknown) => {
    setDraft((d) => setPath(d, path, value));
    setStatus("dirty");
  }, []);

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
    <EditableContext.Provider value={{ editing: true, get, set, status, errorMessage, save, publish, discard }}>
      {children}
    </EditableContext.Provider>
  );
}
