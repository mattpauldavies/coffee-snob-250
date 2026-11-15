import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'hot' | 'inverse' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

const skins: Record<ButtonVariant, { bg: string; fg: string; bd: string }> = {
  primary: { bg: 'var(--mh-yellow)', fg: 'var(--mh-ink-900)', bd: 'var(--mh-ink-900)' },
  hot: { bg: 'var(--mh-red)', fg: 'var(--mh-paper-100)', bd: 'var(--mh-ink-900)' },
  inverse: { bg: 'var(--mh-paper-300)', fg: 'var(--mh-ink-900)', bd: 'var(--mh-ink-900)' },
  ghost: { bg: 'transparent', fg: 'var(--mh-yellow)', bd: 'var(--mh-yellow)' },
};

const sizes: Record<ButtonSize, { padding: string; fontSize: string; gap: number }> = {
  sm: { padding: '6px 12px', fontSize: 'var(--mono-step-1)', gap: 6 },
  md: { padding: '10px 18px', fontSize: 'var(--mono-step-2)', gap: 8 },
  lg: { padding: '14px 26px', fontSize: 'var(--mono-step-4)', gap: 10 },
};

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: ReactNode;
  style?: CSSProperties;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'style'> & { href?: undefined };

type ButtonAsLink = CommonProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'style'> & { href: string };

/**
 * Square, chunky, hard-shadow action button. Ported from the design system's
 * `components/core/Button.jsx`; renders an `<a>` when given an `href` so the
 * export's link-wrapped buttons become valid markup.
 */
export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { variant = 'primary', size = 'md', fullWidth, children, style, ...rest } = props;
  const skin = skins[variant];
  const scale = sizes[size];
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);
  const disabled = 'disabled' in rest && rest.disabled === true;

  const shadow =
    variant === 'ghost'
      ? 'none'
      : down
        ? '0 0 0 var(--mh-ink-900)'
        : hover
          ? '5px 5px 0 var(--mh-ink-900)'
          : 'var(--shadow-sticker-sm)';
  const shift = down ? 'translate(3px,3px)' : hover ? 'translate(-2px,-2px)' : 'none';

  const styles: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: fullWidth ? '100%' : 'auto',
    boxSizing: 'border-box',
    font: `400 ${scale.fontSize}/1 var(--font-mono)`,
    letterSpacing: 'var(--tracking-label)',
    textTransform: 'uppercase',
    padding: scale.padding,
    gap: scale.gap,
    background: skin.bg,
    color: skin.fg,
    border: `var(--border-chunky) solid ${skin.bd}`,
    borderRadius: 'var(--radius-none)',
    boxShadow: disabled ? 'none' : shadow,
    transform: disabled ? 'none' : shift,
    transition:
      'transform var(--dur-fast) var(--ease-step-2),box-shadow var(--dur-fast) var(--ease-step-2)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : 1,
    textDecoration: 'none',
    ...style,
  };

  const interactions = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setDown(false);
    },
    onMouseDown: () => setDown(true),
    onMouseUp: () => setDown(false),
  };

  if (typeof props.href === 'string') {
    const { href, ...anchorRest } = rest as React.AnchorHTMLAttributes<HTMLAnchorElement>;
    return (
      <a {...interactions} {...anchorRest} href={href} style={styles}>
        {children}
      </a>
    );
  }

  return (
    <button
      type="button"
      {...interactions}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      style={styles}
    >
      {children}
    </button>
  );
}
