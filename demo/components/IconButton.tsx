import { useId } from 'react';

const paths = {
  shuffle:
    'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4ZM8 8h.01M16 8h.01M12 12h.01M8 16h.01M16 16h.01',
  reset: 'M3 11a9 9 0 1 1 2.6 7.4M3 4v7h7',
  share: 'M12 16V3m-5 5 5-5 5 5M5 13v7h14v-7',
  save: 'M5 3h12l3 3v15H4V3h1m3 0v6h8V3M8 21v-7h8v7',
  export: 'M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4',
  copy: 'M9 9h11v12H9zM15 9V3H3v12h6',
  close: 'm6 6 12 12M6 18 18 6',
} as const;

export function IconButton({
  icon,
  label,
  onClick,
  success = false,
}: {
  icon: keyof typeof paths;
  label: string;
  onClick: () => void;
  success?: boolean;
}) {
  const id = useId();
  return (
    <span className="icon-button-wrapper">
      <button
        type="button"
        className={`icon-button${success ? ' copy-success' : ''}`}
        aria-label={label}
        aria-describedby={id}
        onClick={onClick}
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d={paths[icon]} />
        </svg>
      </button>
      <span className="button-tooltip" role="tooltip" id={id}>
        {label}
      </span>
    </span>
  );
}
