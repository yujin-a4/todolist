import Link from "next/link";

export default function ProjectsPage() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">프로젝트 허브</h2>
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map((n) => (
          <Link key={n} href={`/projects/${n}`} className="rounded-xl border bg-white p-4">
            <p className="font-semibold">프로젝트 {n}</p>
            <p className="text-sm text-gray-500">완료율 / D-day / 컬러 표시</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
