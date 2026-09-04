export const metadata = {
  title: "Admin | Vision Media & Entertainment",
  robots: { index: false, follow: false },
};

// Deliberately minimal: the sidebar shell and the auth gate live in
// (protected)/layout.tsx so that /admin/login can render outside them.
export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
