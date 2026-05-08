type SpinnerProps = {
  className?: string;
  size?: number;
};

export function Spinner({ className = "", size = 14 }: SpinnerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      role="status"
      aria-label="Indlæser"
      className={`inline-block animate-[spin_0.8s_linear_infinite] motion-reduce:animate-none ${className}`}
    >
      <circle
        cx="8"
        cy="8"
        r="6.5"
        stroke="currentColor"
        strokeOpacity="0.28"
        strokeWidth="1.6"
      />
      <path
        d="M14.5 8a6.5 6.5 0 0 0-6.5-6.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
