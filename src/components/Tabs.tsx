type TabsProps<T extends string> = {
  tabs: { id: T; label: string; count: number }[];
  active: T;
  onChange: (tab: T) => void;
  label: string;
};

/** Pill filters for one list; each one is a toggle button. */
export function Tabs<T extends string>({ tabs, active, onChange, label }: TabsProps<T>) {
  return (
    <div className="filters" role="group" aria-label={label}>
      {tabs.map((tab) => (
        <button key={tab.id} type="button" aria-pressed={active === tab.id} onClick={() => onChange(tab.id)}>
          {tab.label}
          <span className="count">{tab.count}</span>
        </button>
      ))}
    </div>
  );
}
