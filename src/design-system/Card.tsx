import { useState } from 'react';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

export type CardTone = 'dark' | 'paper' | 'accent' | 'hot';

const tones: Record<CardTone, { bg: string; fg: string; bd: string }> = {
  dark: { bg: 'var(--surface-card)', fg: 'var(--text-body)', bd: 'var(--mh-ink-900)' },
  paper: { bg: 'var(--mh-paper-100)', fg: 'var(--mh-ink-900)', bd: 'var(--mh-ink-900)' },
  accent: { bg: 'var(--mh-yellow)', fg: 'var(--mh-ink-900)', bd: 'var(--mh-ink-900)' },
  hot: { bg: 'var(--mh-red)', fg: 'var(--mh-paper-100)', bd: 'var(--mh-ink-900)' },
};

type CardProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'> & {
  tone?: CardTone;
  lift?: boolean;
  interactive?: boolean;
  padding?: string;
  children: ReactNode;
  style?: CSSProperties;
};

/**
 * Flat panel with a chunky border and an optional hard sticker shadow.
 * Ported from `components/core/Card.jsx`.
 */
export function Card({
  tone = 'dark',
  lift = true,
  interactive = false,
  padding = 'var(--space-5)',
  children,
  style,
  ...rest
}: CardProps) {
  const t = tones[tone];
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      {...rest}
      style={{
        background: t.bg,
        color: t.fg,
        border: `var(--border-chunky) solid ${t.bd}`,
        borderRadius: 0,
        padding,
        boxShadow: lift
          ? interactive && hover
            ? '10px 10px 0 var(--mh-ink-900)'
            : 'var(--shadow-sticker)'
          : 'none',
        transform: interactive && hover ? 'translate(-3px,-3px)' : 'none',
        transition:
          'transform var(--dur-fast) var(--ease-step-2),box-shadow var(--dur-fast) var(--ease-step-2)',
        cursor: interactive ? 'pointer' : 'default',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
