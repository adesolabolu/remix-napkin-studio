/**
 * Hand-Drawn Design Tokens and Visual Primitives
 */

export const TOKENS = {
  colors: {
    paper: '#fdfbf7',
    pencil: '#2d2d2d',
    erased: '#e5e0d8',
    marker: '#ff4d4d',
    pen: '#2d5da1',
    postit: '#fff9c4',
    postitPink: '#ffd6e0',
    postitBlue: '#dbeafe',
    postitGreen: '#dcfce7',
  },
  radii: {
    wobbly: '255px 15px 225px 15px / 15px 225px 15px 255px',
    wobblyMd: '15px 225px 15px 255px / 255px 15px 225px 15px',
    wobblyLg: '255px 25px 225px 25px / 25px 225px 25px 255px',
    wobblySm: '120px 8px 110px 8px / 8px 110px 8px 120px',
    wobblyCircle1: '58% 42% 63% 37% / 41% 59% 41% 59%',
    wobblyCircle2: '45% 55% 35% 65% / 55% 45% 65% 35%',
    wobblyCircle3: '62% 38% 54% 46% / 48% 62% 38% 52%',
    wobblyCircle4: '41% 59% 47% 53% / 59% 41% 53% 47%',
    wobblyBubble: '255px 18px 225px 15px / 18px 225px 18px 255px',
  },
  shadows: {
    standard: '4px 4px 0px 0px #2d2d2d',
    emphasized: '8px 8px 0px 0px #2d2d2d',
    subtle: '3px 3px 0px 0px rgba(45, 45, 45, 0.1)',
    pressed: '0px 0px 0px 0px #2d2d2d',
  },
};

/**
 * Reusable Hand-drawn SVG components
 */
export function HandDrawnArrow({
  className = '',
  color = '#2d2d2d',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M6 18C28 6 68 10 98 42M98 42L82 32M98 42L94 22"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="4 3"
      />
    </svg>
  );
}

export function HandDrawnLoopArrow({
  className = '',
  color = '#ff4d4d',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 80 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M8 38C20 10 50 8 52 26C53 36 40 44 32 36C22 26 56 12 72 20M72 20L64 12M72 20L62 26"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function HandDrawnUnderline({
  className = '',
  color = '#ff4d4d',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 160 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M3 11C28 5 62 14 94 9C116 5 142 12 157 8"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HandDrawnCircleHighlight({
  className = '',
  color = '#ff4d4d',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 120 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M12 32C10 16 35 7 64 6C95 5 112 16 110 32C108 48 82 55 54 54C25 53 6 43 14 26"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="5 3"
      />
    </svg>
  );
}

export function HandDrawnSquiggle({
  className = '',
  color = '#2d2d2d',
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 300 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M4 22C28 10 46 32 72 20C98 8 116 30 144 20C172 10 190 32 218 20C246 8 268 30 296 18"
        stroke={color}
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function TapeStrip({
  className = '',
  rotation = '-2deg',
}: {
  className?: string;
  rotation?: string;
}) {
  return (
    <div
      className={`h-6 w-24 masking-tape ${className}`}
      style={{
        transform: `rotate(${rotation})`,
        borderRadius: '2px',
      }}
      aria-hidden="true"
    />
  );
}

export function PushPin({
  color = 'red',
  className = '',
}: {
  color?: 'red' | 'blue';
  className?: string;
}) {
  return (
    <div
      className={`w-4 h-4 rounded-full border border-[#2d2d2d] z-20 ${
        color === 'red' ? 'pushpin-red' : 'pushpin-blue'
      } ${className}`}
      aria-hidden="true"
    />
  );
}
