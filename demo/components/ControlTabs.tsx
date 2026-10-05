import { type ReactNode, useId, useRef, useState } from 'react';

export function ControlTabs({
  appearance,
  movement,
}: {
  appearance: ReactNode;
  movement: ReactNode;
}) {
  const [selected, setSelected] = useState(0);
  const id = useId();
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  return (
    <>
      <div
        role="tablist"
        aria-label="Configuración del personaje"
        className="control-tabs"
      >
        {['Apariencia', 'Movimiento'].map((label, index) => (
          <button
            key={label}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${index}`}
            aria-controls={`${id}-panel-${index}`}
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              const next =
                event.key === 'Home'
                  ? 0
                  : event.key === 'End'
                    ? 1
                    : ['ArrowLeft', 'ArrowRight'].includes(event.key)
                      ? 1 - index
                      : undefined;
              if (next !== undefined) {
                event.preventDefault();
                setSelected(next);
                tabs.current[next]?.focus();
              }
            }}
          >
            {label}
          </button>
        ))}
      </div>
      {[appearance, movement].map((content, index) => (
        <div
          key={index === 0 ? 'appearance' : 'movement'}
          role="tabpanel"
          id={`${id}-panel-${index}`}
          aria-labelledby={`${id}-tab-${index}`}
          hidden={selected !== index}
        >
          {content}
        </div>
      ))}
    </>
  );
}
