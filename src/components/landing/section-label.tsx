export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 mb-4 text-[10.5px] font-semibold tracking-[0.1em] uppercase text-svarly-muted">
      <span className="inline-block w-[18px] h-[1.5px] rounded-sm bg-svarly-muted" />
      {children}
    </div>
  );
}
