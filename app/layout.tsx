import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="bg-slate-50 text-slate-900">
        <div className="mx-auto flex min-h-screen max-w-6xl">
          <aside className="w-52 border-r bg-white p-4">
            <h1 className="mb-4 text-lg font-bold">Work Planner</h1>
            <nav className="space-y-2 text-sm">
              <Link href="/" className="block">홈</Link>
              <Link href="/planner" className="block">플래너</Link>
              <Link href="/projects" className="block">프로젝트</Link>
              <Link href="/history" className="block">히스토리</Link>
              <Link href="/insights" className="block">인사이트</Link>
            </nav>
          </aside>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
