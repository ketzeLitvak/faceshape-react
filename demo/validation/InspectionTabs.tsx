const tabs = [
  { id: 'expressions', label: 'Expresiones y tamaños' },
  { id: 'poses', label: 'Blink y mirada' },
  { id: 'motion', label: 'Transiciones en vivo' },
  { id: 'parts', label: 'Partes ocultas' },
  { id: 'variants', label: 'Variantes de la forma' },
] as const;

export type InspectionView = (typeof tabs)[number]['id'];

export function InspectionTabs({
  value,
  onChange,
  panelId,
}: {
  value: InspectionView;
  onChange: (value: InspectionView) => void;
  panelId: string;
}) {
  return (
    <div className="inspection-tabs" role="tablist" aria-label="Vista de inspección">
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          id={`${panelId}-${tab.id}`}
          aria-selected={value === tab.id}
          aria-controls={panelId}
          tabIndex={value === tab.id ? 0 : -1}
          onClick={() => onChange(tab.id)}
          onKeyDown={(event) => {
            let next: number;
            switch (event.key) {
              case 'ArrowRight':
                next = (index + 1) % tabs.length;
                break;
              case 'ArrowLeft':
                next = (index + tabs.length - 1) % tabs.length;
                break;
              case 'Home':
                next = 0;
                break;
              case 'End':
                next = tabs.length - 1;
                break;
              default:
                return;
            }
            event.preventDefault();
            onChange(tabs[next].id);
            document.getElementById(`${panelId}-${tabs[next].id}`)?.focus();
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
