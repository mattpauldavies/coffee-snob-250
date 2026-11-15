import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export type BadgeTone = 'new' | 'live' | 'neutral' | 'outline';

const tones: Record<BadgeTone, { bg: string; fg: string }> = {
  new: { bg: 'var(--mh-yellow)', fg: 'var(--mh-ink-900)' },
  live: { bg: 'var(--mh-red)', fg: 'var(--mh-paper-100)' },
  neutral: { bg: 'var(--mh-ink-600)', fg: 'var(--mh-paper-300)' },
  outline: { bg: 'transparent', fg: 'var(--mh-yellow)' },
};

type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, 'style'> & {
  tone?: BadgeTone;
  blink?: boolean;
  children: ReactNode;
  style?: CSSProperties;
};

/** Small status flag. Ported from `components/core/Badge.jsx`. */
export function Badge({ tone = 'new', blink = false, children, style, ...rest }: BadgeProps) {
  const t = tones[tone];
  return (
    <span
      {...rest}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        background: t.bg,
        color: t.fg,
        border: `var(--border-standard) solid ${tone === 'outline' ? 'var(--mh-yellow)' : 'var(--mh-ink-900)'}`,
        font: '400 var(--mono-step-1)/1 var(--font-mono)',
        letterSpacing: 'var(--tracking-label)',
        textTransform: 'uppercase',
        padding: '4px 8px',
        borderRadius: 0,
        ...style,
      }}
    >
      {blink && (
        <span
          style={{
            width: 6,
            height: 6,
            background: 'currentColor',
            animation: 'mh-blink var(--blink) var(--ease-step-2) infinite',
          }}
        />
      )}
      {children}
    </span>
  );
}
