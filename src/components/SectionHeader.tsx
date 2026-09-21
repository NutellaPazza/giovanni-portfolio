type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "split";
};

export function SectionHeader({ eyebrow, title, description, align = "split" }: SectionHeaderProps) {
  return (
    <div className={align === "split" ? "section-header section-header--split" : "section-header"}>
      <div>
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h2>{title}</h2>
      </div>
      {description && <p className="section-description">{description}</p>}
    </div>
  );
}
