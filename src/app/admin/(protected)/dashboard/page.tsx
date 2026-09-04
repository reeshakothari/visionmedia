import Link from "next/link";
import { Inbox, FileEdit, TrendingUp, Clock } from "lucide-react";
import { getSubmissions, type Submission } from "@/lib/cms";

export const dynamic = "force-dynamic";

function countThisWeek(submissions: Submission[]) {
  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  return submissions.filter((s) => new Date(s.created_at).getTime() >= weekAgo).length;
}

const FORM_TYPE_LABELS: Record<string, string> = {
  home: "Home",
  wedding: "Wedding",
  "corporate-event": "Corporate Events",
  "wedding-venues": "Wedding Venues",
  "social-events": "Social Events",
  blog: "Blog",
};

export default async function AdminDashboardPage() {
  const submissions = await getSubmissions();

  const thisWeek = countThisWeek(submissions);
  const newCount = submissions.filter((s) => s.status === "new").length;

  const byType = new Map<string, number>();
  for (const s of submissions) byType.set(s.form_type, (byType.get(s.form_type) ?? 0) + 1);

  const recent = submissions.slice(0, 6);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-10">
      <h1 className="font-display text-2xl text-navy sm:text-3xl">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-light">An overview of enquiries and quick links to manage your site.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard icon={Inbox} label="Total Enquiries" value={submissions.length} />
        <StatCard icon={TrendingUp} label="This Week" value={thisWeek} />
        <StatCard icon={Clock} label="Awaiting Reply" value={newCount} accent />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_320px]">
        <div className="hairline rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-navy">Recent Enquiries</h2>
            <Link href="/admin/submissions" className="text-xs font-semibold text-gold-dark hover:underline">
              View all →
            </Link>
          </div>
          <div className="mt-4 divide-y divide-navy/5">
            {recent.length === 0 && <p className="py-6 text-center text-sm text-muted-light">No enquiries yet.</p>}
            {recent.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-navy">{s.name || "Unnamed"}</p>
                  <p className="truncate text-xs text-muted-light">{s.email || s.phone || "No contact info"}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <span className="badge badge-gold text-[10px]">{FORM_TYPE_LABELS[s.form_type] ?? s.form_type}</span>
                  <StatusBadge status={s.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="hairline rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="font-heading text-sm font-semibold uppercase tracking-wide text-navy">By Page</h2>
            <div className="mt-4 space-y-2">
              {[...byType.entries()].map(([type, count]) => (
                <div key={type} className="flex items-center justify-between text-sm">
                  <span className="text-muted">{FORM_TYPE_LABELS[type] ?? type}</span>
                  <span className="font-semibold text-navy">{count}</span>
                </div>
              ))}
              {byType.size === 0 && <p className="text-sm text-muted-light">No data yet.</p>}
            </div>
          </div>

          <Link
            href="/admin/content"
            className="hairline flex items-center gap-3 rounded-2xl bg-navy p-6 text-white shadow-sm transition-transform hover:-translate-y-0.5"
          >
            <FileEdit className="h-5 w-5 text-gold-light" aria-hidden />
            <div>
              <p className="font-heading text-sm font-semibold">Edit the website</p>
              <p className="text-xs text-white/60">Change any text, image, or gallery — live.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, accent }: { icon: typeof Inbox; label: string; value: number; accent?: boolean }) {
  return (
    <div className={`hairline rounded-2xl p-6 shadow-sm ${accent ? "bg-navy text-white" : "bg-white"}`}>
      <Icon className={`h-5 w-5 ${accent ? "text-gold-light" : "text-gold-dark"}`} aria-hidden />
      <p className={`mt-3 font-display text-3xl ${accent ? "text-white" : "text-navy"}`}>{value}</p>
      <p className={`mt-1 text-xs font-medium uppercase tracking-wide ${accent ? "text-white/60" : "text-muted-light"}`}>{label}</p>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    new: "bg-gold/15 text-gold-dark",
    contacted: "bg-blue-100 text-blue-700",
    closed: "bg-navy/10 text-navy/60",
  };
  return <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${styles[status] ?? styles.new}`}>{status}</span>;
}
