import type { TreasureHuntConfig } from "./Treasure";

export type ProductType = "featured" | "sale" | "new-arrival";
export type CtaType = "default" | "link";

export type Cta = {
  href: string;
  title: string;
  type: CtaType;
  variant: "primary" | "secondary";
};

export type Hero = {
  title: string;
  description: string;
  ctas: Cta[];
  subTitle: string;
  image: string;
};

export type ProductList = {
  title: string;
  subTitle: string;
  productType: ProductType;
  type: "productList";
};

type CardList = {
  title: string;
  subTitle: string;
  cardType: "categories" | "rooms";
  type: "cardList";
};

export type CtaCard = {
  ctas: Cta[];
  description: string;
  title: string;
  background: "light" | "dark";
  subTitle: string;
  type: "ctaCard";
};

type Step = {
  title: string;
  description: string;
};

type StepCard = {
  title: string;
  subTitle: string;
  steps: Step[];
  type: "stepCard";
};

type ContactCard = {
  title: string;
  description: string;
  subTitle: string;
  type: "contactCard";
};

type CtaCards = {
  type: "ctaCards";
  modules: CtaCard[];
};

type Module =
  | ProductList
  | CardList
  | CtaCard
  | StepCard
  | ContactCard
  | CtaCards;

export type RootContent = {
  hero: Hero;
  modules: Module[];
  treasureHunt: TreasureHuntConfig;
};
