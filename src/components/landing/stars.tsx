export function Stars({ n = 5, size = 13 }: { n?: number; size?: number }) {
  return (
    <span className="inline-flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} width={size} height={size} viewBox="0 0 14 14">
          <path
            fill={i <= n ? "#E8A630" : "#DDD"}
            d="M7 1l1.6 3.3 3.6.5-2.6 2.5.6 3.6L7 9.2 4.8 10.9l.6-3.6L2.8 4.8l3.6-.5z"
          />
        </svg>
      ))}
    </span>
  );
}
