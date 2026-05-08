import { Sidebar } from "@/components/sidebar";
import { AppTopbar } from "@/components/app-topbar";
import { MobileNav } from "@/components/mobile-nav";
import { TopProgress } from "@/components/top-progress";
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
      <TopProgress />
      <Sidebar pendingCount={pendingCount} />
      <main className="flex-1 overflow-x-hidden pb-[88px] md:pb-0">
        <AppTopbar pendingCount={pendingCount} businessName={business?.name ?? null} />
        <div className="mx-auto max-w-6xl px-6 py-8 md:px-10 md:py-10">
          {children}
        </div>
      </main>
      <MobileNav
        pendingCount={pendingCount}
        businessName={business?.name ?? null}
      />
    </div>
  );
}
