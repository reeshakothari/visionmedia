"use client";

import { useMemo, useState, useTransition } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Submission } from "@/lib/cms";
import { updateSubmissionStatusAction } from "@/lib/actions";

const FORM_TYPE_LABELS: Record<string, string> = {
  home: "Home",
  wedding: "Wedding",
  "corporate-event": "Corporate Events",
  "wedding-venues": "Wedding Venues",
  "social-events": "Social Events",
  blog: "Blog",
};

const STATUS_OPTIONS: Submission["status"][] = ["new", "contacted", "closed"];

// Explicit locale + options so the server-rendered and client-hydrated output
// always match, regardless of the machine's or browser's default locale.
function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default function SubmissionsTable({ initialSubmissions }: { initialSubmissions: Submission[] }) {
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [, startTransition] = useTransition();

  const formTypes = useMemo(() => {
    const set = new Set(submissions.map((s) => s.form_type));
    return [...set];
  }, [submissions]);

  const filtered = submissions.filter(
    (s) => (typeFilter === "all" || s.form_type === typeFilter) && (statusFilter === "all" || s.status === statusFilter)
  );

  function handleStatusChange(id: number, status: Submission["status"]) {
    const previousStatus = submissions.find((s) => s.id === id)?.status;
    setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
    startTransition(() => {
      updateSubmissionStatusAction(id, status).catch(() => {
        if (!previousStatus) return;
        setSubmissions((prev) => prev.map((s) => (s.id === id ? { ...s, status: previousStatus } : s)));
      });
    });
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-3">
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="rounded-lg border border-navy/15 px-3 py-2 text-sm text-navy"
        >
          <option value="all">All pages</option>
          {formTypes.map((t) => (
            <option key={t} value={t}>
              {FORM_TYPE_LABELS[t] ?? t}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-navy/15 px-3 py-2 text-sm text-navy"
        >
          <option value="all">All statuses</option>
          {STATUS_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s[0].toUpperCase() + s.slice(1)}
            </option>
          ))}
        </select>
        <span className="flex items-center text-xs text-muted-light">{filtered.length} result(s)</span>
      </div>

      <div className="hairline overflow-hidden rounded-2xl bg-white shadow-sm">
        {filtered.length === 0 ? (
          <p className="py-12 text-center text-sm text-muted-light">No enquiries match these filters.</p>
        ) : (
          <div className="divide-y divide-navy/5">
            {filtered.map((s) => {
              const expanded = expandedId === s.id;
              return (
                <div key={s.id}>
                  <button
                    type="button"
                    onClick={() => setExpandedId(expanded ? null : s.id)}
                    className="flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-cream-alt/60 sm:px-6"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-semibold text-navy">{s.name || "Unnamed"}</p>
                        <span className="badge badge-gold text-[10px]">{FORM_TYPE_LABELS[s.form_type] ?? s.form_type}</span>
                      </div>
                      <p className="mt-0.5 truncate text-xs text-muted-light">
                        {s.email || "—"} {s.phone ? `· ${s.phone}` : ""} · {formatDate(s.created_at)}
                      </p>
                    </div>
                    <select
                      value={s.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => handleStatusChange(s.id, e.target.value as Submission["status"])}
                      className="shrink-0 rounded-full border border-navy/15 px-3 py-1 text-xs font-semibold text-navy"
                    >
                      {STATUS_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt[0].toUpperCase() + opt.slice(1)}
                        </option>
                      ))}
                    </select>
                    {expanded ? <ChevronUp className="h-4 w-4 text-muted-light" /> : <ChevronDown className="h-4 w-4 text-muted-light" />}
                  </button>
                  {expanded && (
                    <div className="bg-cream-alt/50 px-4 py-4 text-sm sm:px-6">
                      {s.subject && (
                        <p className="mb-2">
                          <span className="font-semibold text-navy">Subject: </span>
                          {s.subject}
                        </p>
                      )}
                      {s.event_type && (
                        <p className="mb-2">
                          <span className="font-semibold text-navy">Type: </span>
                          {s.event_type}
                        </p>
                      )}
                      {s.message && (
                        <p className="mb-3 whitespace-pre-wrap text-muted">
                          <span className="font-semibold text-navy">Message: </span>
                          {s.message}
                        </p>
                      )}
                      <details className="text-xs text-muted-light">
                        <summary className="cursor-pointer select-none font-medium">Raw form data</summary>
                        <pre className="mt-2 overflow-x-auto rounded-lg bg-white p-3">{JSON.stringify(s.data, null, 2)}</pre>
                      </details>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
