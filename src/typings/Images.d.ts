type ImageSize = {
  small: string;
  tiny: string;
  medium: string;
  large: string;
};

export type Image = {
  id: number;
  src: ImageSize;
  photographer: string;
  alt: string;
  avg_color: string;

  // photographers credits
  url: string;
  photographer_url: string;
};
