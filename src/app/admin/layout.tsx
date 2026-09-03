import Link from "next/link";
import { LayoutDashboard, FileEdit, Inbox, ExternalLink } from "lucide-react";

export const metadata = {
  title: "Admin | Vision Media & Entertainment",
  robots: { index: false, follow: false },
};

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/content", label: "Edit Website", icon: FileEdit },
  { href: "/admin/submissions", label: "Enquiries", icon: Inbox },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-cream-alt">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 flex-col border-r border-navy/10 bg-navy text-white md:flex">
        <div className="px-6 py-6">
          <p className="font-display text-lg italic text-gold-light">Vision Media</p>
          <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-white/50">Admin</p>
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/75 transition-colors hover:bg-white/10 hover:text-white"
            >
              <item.icon className="h-4 w-4" aria-hidden />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-white/10 p-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-xs font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            View live site
          </Link>
        </div>
      </aside>

      <div className="flex min-h-screen w-full flex-col md:pl-60">
        <header className="flex items-center justify-between border-b border-navy/10 bg-white px-4 py-3 md:hidden">
          <p className="font-display text-base italic text-navy">Vision Media Admin</p>
        </header>
        <nav className="flex gap-1 overflow-x-auto border-b border-navy/10 bg-white px-3 py-2 md:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-navy/70 hover:bg-navy/5"
            >
              <item.icon className="h-3.5 w-3.5" aria-hidden />
              {item.label}
            </Link>
          ))}
        </nav>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
