import { whyFeatureIcons } from "./whyFeatureIcons";

type Feature = { id: number; icon: string; title: string; title_ar: string };

type Props = {
  features: Feature[];
  isAr: boolean;
};

export default function WhyFeatures({ features, isAr }: Props) {
  return (
    <ul className="grid gap-6 grid-cols-12 " >
      {features.map((feature) => {
        const Icon = whyFeatureIcons[feature.icon as keyof typeof whyFeatureIcons];
        if (!Icon) return null;
        const label = isAr ? feature.title_ar : feature.title;
        return (
          <li
            key={feature.id}
            className="col-span-6 flex items-center gap-3"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center text-(--primary)" aria-hidden>
              <Icon className="h-10 w-10" aria-hidden />
            </span>
            <span className="text-lg font-medium text-neutral-800">{label}</span>
          </li>
        );
      })}
    </ul>
  );
}
