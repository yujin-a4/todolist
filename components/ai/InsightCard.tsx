export function InsightCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <article className="rounded-xl border bg-white p-4 shadow-sm">
      <p className="text-2xl">{icon}</p>
      <h4 className="mt-2 font-semibold">{title}</h4>
      <p className="mt-1 text-sm text-gray-600">{description}</p>
    </article>
  );
}
