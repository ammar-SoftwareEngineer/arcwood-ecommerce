import siteData from "@/lib/data/site.json";
import { whyFeatureIcons } from "./whyFeatureIcons";

type Feature = (typeof siteData.whyChooseUs.features)[number];

type Props = {
  features: Feature[];
  isAr: boolean;
};

export default function WhyFeatures({ features, isAr }: Props) {
  return (
    <ul className="grid gap-6 grid-cols-12">
      {features.map((feature, index) => {
        const Icon = whyFeatureIcons[feature.icon];
        const label = isAr ? feature.titleAr : feature.title;
        return (
          <li
            key={`${feature.icon}-${index}`}
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
