import aboutData from "@/lib/data/about.json";

export type AboutSection = {
  id: string;
  badge: string;
  badgeAr: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  image: string;
  imageAlt: string;
  imageAltAr: string;
};

export type AboutResponse = {
  data: AboutSection[];
};

const source = aboutData as AboutResponse;

export function getAboutSections(): AboutResponse {
  return {
    data: source.data,
  };
}
