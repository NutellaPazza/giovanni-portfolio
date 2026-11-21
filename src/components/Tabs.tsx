type TabsProps<T extends string> = {
  tabs: { id: T; label: string; count: number }[];
  active: T;
  onChange: (tab: T) => void;
  label: string;
};

/** Filter keys styled like terminal function keys. They filter one list, so they act as toggle buttons. */
export function Tabs<T extends string>({ tabs, active, onChange, label }: TabsProps<T>) {
  return (
    <div className="fkeys" role="group" aria-label={label}>
      {tabs.map((tab) => (
        <button key={tab.id} type="button" aria-pressed={active === tab.id} onClick={() => onChange(tab.id)}>
          {tab.label}
          <span className="count num">{tab.count}</span>
        </button>
      ))}
    </div>
  );
}
