interface FeatureItemProps {
  title: string;
  description: string;
}

interface FeatureListProps {
  items: FeatureItemProps[];
}

function FeatureItem({ title, description }: FeatureItemProps) {
  return (
    <div className="flex items-start gap-3.5">
      <div className="w-[22px] h-[22px] bg-stayct-overlay-light rounded flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
          <polyline
            points="2,6 5,9 10,3"
            stroke="#2d6a4f"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div>
        <div className="text-[15px] font-bold text-stayct-green-dark mb-0.5">{title}</div>
        <div className="text-[14px] text-stayct-green-medium leading-[1.55]">{description}</div>
      </div>
    </div>
  );
}

export function FeatureList({ items }: FeatureListProps) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item, idx) => (
        <FeatureItem key={idx} {...item} />
      ))}
    </div>
  );
}
