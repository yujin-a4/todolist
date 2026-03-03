import { DecomposeModal } from "@/components/ai/DecomposeModal";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">프로젝트 상세 #{params.id}</h2>
      <div className="rounded border bg-white p-4 text-sm text-gray-600">상태별 탭 투두 목록 영역</div>
      <DecomposeModal projectId={params.id} />
    </div>
  );
}
