export type TreasureHuntItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  room: string;
  tags: string[];
  foundFor: string;
  highlight: string;
};

export type TreasureHuntConfig = {
  title: string;
  subTitle: string;
  maxItems: number;
  ctaLabel: string;
  ctaHref: string;
};
