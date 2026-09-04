import { redirect } from "next/navigation";
import { credentialsConfigured, isAuthenticated } from "@/lib/auth";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage() {
  if (await isAuthenticated()) redirect("/admin/dashboard");

  return (
    <div className="bg-noise flex min-h-screen items-center justify-center bg-navy px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-display text-2xl italic text-gold-light">Vision Media</p>
          <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.2em] text-white/50">Admin Login</p>
        </div>

        {credentialsConfigured() ? (
          <LoginForm />
        ) : (
          <div className="rounded-2xl bg-white/95 p-6 text-center text-sm text-navy">
            <p className="font-semibold">Admin credentials aren&apos;t configured yet.</p>
            <p className="mt-2 text-muted-light">
              Set <code className="rounded bg-navy/5 px-1">ADMIN_USERNAME</code> and{" "}
              <code className="rounded bg-navy/5 px-1">ADMIN_PASSWORD</code> in the server&apos;s environment
              variables, then reload this page.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
