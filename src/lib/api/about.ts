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

export async function getAboutSections() {
  return {
    data: aboutData.data,
  };
}