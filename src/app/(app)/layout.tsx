import { Sidebar } from "@/components/sidebar";
import { AppTopbar } from "@/components/app-topbar";
import { getCurrentBusiness, getReviewStats } from "@/lib/queries";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [business, stats] = await Promise.all([
    getCurrentBusiness(),
    getReviewStats(),
  ]);
  const pendingCount = stats.newCount + stats.pendingCount;

  return (
    <div className="flex min-h-screen bg-[#F8F9F7] text-[#1F2A24]">
      <Sidebar pendingCount={pendingCount} />
      <main className="flex-1 overflow-x-hidden">
        <AppTopbar pendingCount={pendingCount} businessName={business?.name ?? null} />
        <div className="mx-auto max-w-6xl px-6 py-8 md:px-10 md:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
