import { getSubmissions } from "@/lib/cms";
import SubmissionsTable from "./SubmissionsTable";

export const dynamic = "force-dynamic";

export default async function AdminSubmissionsPage() {
  const submissions = await getSubmissions();
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 md:py-10">
      <h1 className="font-display text-2xl text-navy sm:text-3xl">Enquiries</h1>
      <p className="mt-1 text-sm text-muted-light">Every contact form submission across the site, newest first.</p>
      <div className="mt-6">
        <SubmissionsTable initialSubmissions={submissions} />
      </div>
    </div>
  );
}
