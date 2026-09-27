// Lightweight inline SVG icons used across the policy pages.
// No external icon library required — keeps the bundle dependency-free.

interface IconProps {
  size?: number;
  color?: string;
}

const base = (size = 24) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
});

export function ShieldIcon({ size, color = "currentColor" }: IconProps) {
  return (
    <svg {...base(size)} style={{ color }}>
      <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />
    </svg>
  );
}

export function ShieldCheckIcon({ size, color = "currentColor" }: IconProps) {
  return (
    <svg {...base(size)} style={{ color }}>
      <path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function DatabaseIcon({ size, color = "currentColor" }: IconProps) {
  return (
    <svg {...base(size)} style={{ color }}>
      <ellipse cx="12" cy="5" rx="8" ry="3" />
      <path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5" />
      <path d="M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </svg>
  );
}

export function GearIcon({ size, color = "currentColor" }: IconProps) {
  return (
    <svg {...base(size)} style={{ color }}>
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1Z" />
    </svg>
  );
}

export function LockIcon({ size, color = "currentColor" }: IconProps) {
  return (
    <svg {...base(size)} style={{ color }}>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export function ShareIcon({ size, color = "currentColor" }: IconProps) {
  return (
    <svg {...base(size)} style={{ color }}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.6 10.5 6.8-3.9M8.6 13.5l6.8 3.9" />
    </svg>
  );
}

export function UserIcon({ size, color = "currentColor" }: IconProps) {
  return (
    <svg {...base(size)} style={{ color }}>
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

export function CookieIcon({ size, color = "currentColor" }: IconProps) {
  return (
    <svg {...base(size)} style={{ color }}>
      <path d="M12 2a10 10 0 1 0 10 10 5 5 0 0 1-5-5 5 5 0 0 1-5-5Z" />
      <circle cx="9" cy="10" r="0.6" fill={color} />
      <circle cx="13" cy="15" r="0.6" fill={color} />
      <circle cx="9" cy="16" r="0.6" fill={color} />
    </svg>
  );
}

export function DocumentIcon({ size, color = "currentColor" }: IconProps) {
  return (
    <svg {...base(size)} style={{ color }}>
      <path d="M7 3h7l4 4v14H7Z" />
      <path d="M14 3v4h4" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  );
}

export function MailIcon({ size, color = "currentColor" }: IconProps) {
  return (
    <svg {...base(size)} style={{ color }}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

export function TruckIcon({ size, color = "currentColor" }: IconProps) {
  return (
    <svg {...base(size)} style={{ color }}>
      <path d="M3 7h11v9H3z" />
      <path d="M14 11h4l3 3v2h-7z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </svg>
  );
}

export function RotateIcon({ size, color = "currentColor" }: IconProps) {
  return (
    <svg {...base(size)} style={{ color }}>
      <path d="M3 12a9 9 0 1 1 3 6.7" />
      <path d="M3 17v-5h5" />
    </svg>
  );
}

export function ClockIcon({ size, color = "currentColor" }: IconProps) {
  return (
    <svg {...base(size)} style={{ color }}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}

export function CreditCardIcon({ size, color = "currentColor" }: IconProps) {
  return (
    <svg {...base(size)} style={{ color }}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

export function PackageIcon({ size, color = "currentColor" }: IconProps) {
  return (
    <svg {...base(size)} style={{ color }}>
      <path d="m3.3 7 8.7-4 8.7 4-8.7 4-8.7-4Z" />
      <path d="M3.3 7v10l8.7 4 8.7-4V7" />
      <path d="M12 11v10" />
    </svg>
  );
}

export function HelpCircleIcon({ size, color = "currentColor" }: IconProps) {
  return (
    <svg {...base(size)} style={{ color }}>
      <circle cx="12" cy="12" r="9" />
      <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.9.4-1.5 1-1.5 2.2" />
      <path d="M12 17h.01" />
    </svg>
  );
}

export function AlertIcon({ size, color = "currentColor" }: IconProps) {
  return (
    <svg {...base(size)} style={{ color }}>
      <path d="M12 3 2 20h20L12 3Z" />
      <path d="M12 10v4" />
      <path d="M12 17h.01" />
    </svg>
  );
}
