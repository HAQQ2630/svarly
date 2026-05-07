export function GoogleLogo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18">
      <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
      <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"/>
      <path fill="#FBBC05" d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z"/>
      <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.163 6.656 3.58 9 3.58z"/>
    </svg>
  );
}

export function TrustpilotLogo({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
      <rect width="18" height="18" rx="2.5" fill="#00B67A"/>
      <path d="M9 3l1.545 4.76H15.5L11.477 10.7l1.545 4.76L9 12.82l-4.022 2.64L6.523 10.7 2.5 7.76H7.455z" fill="white"/>
    </svg>
  );
}

export function SvarlyWordmark({ size = 22, color = "#2F4F3E" }: { size?: number; color?: string }) {
  const r = Math.round(size * 0.3);
  return (
    <div className="flex items-center gap-2">
      <div
        style={{ width: size, height: size, borderRadius: r, background: color }}
        className="flex items-center justify-center shrink-0"
      >
        <svg width={size * 0.58} height={size * 0.58} viewBox="0 0 13 13" fill="none">
          <path d="M1.5 3.5h10M1.5 6.5h7M1.5 9.5h8" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
        </svg>
      </div>
      <span style={{ fontWeight: 600, fontSize: size * 0.78, color }} className="font-sans">
        Svarly
      </span>
    </div>
  );
}

export function PlantSvg({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 160" fill="none" className={className}>
      <path d="M50 155 C50 155 50 100 50 80" stroke="#2F4F3E" strokeWidth="6" strokeLinecap="round"/>
      <path d="M50 120 C35 105 22 78 32 55 C37 70 46 90 50 105" fill="#4A7A5E"/>
      <path d="M50 105 C65 90 78 63 66 40 C61 55 52 78 50 95" fill="#2F4F3E"/>
      <path d="M50 138 C38 125 28 103 38 85 C42 97 48 115 50 128" fill="#3D6B50"/>
      <ellipse cx="50" cy="50" rx="16" ry="22" fill="#4A7A5E"/>
      <ellipse cx="50" cy="46" rx="10" ry="14" fill="#5A8F6A"/>
      <rect x="40" y="148" width="20" height="12" rx="2" fill="#C4956A"/>
      <ellipse cx="50" cy="148" rx="13" ry="5" fill="#D4A574"/>
    </svg>
  );
}

export function CheckCircle({ color = "#2F4F3E" }: { color?: string }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <circle cx="8" cy="8" r="7.5" fill={color + "1A"}/>
      <path d="M5 8l2.5 2.5L11 5" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

export function XCircle() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0">
      <circle cx="8" cy="8" r="7" fill="#E8443A18"/>
      <line x1="5" y1="5" x2="11" y2="11" stroke="#E8443A" strokeWidth="1.5" strokeLinecap="round"/>
      <line x1="11" y1="5" x2="5" y2="11" stroke="#E8443A" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}
