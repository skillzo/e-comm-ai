export interface Product {
  name: string;
  fit: string;
  color: string;
  rating: number;
  price: number;
  image: string;
  badge?: {
    text: string;
    bgColor: string;
  };
  id?: number | string;
}

export interface HeroImage {
  alt: string;
  src: string;
}

export interface Color {
  name: string;
  image: string | null;
}

export interface Size {
  value: string;
  disabled?: boolean;
}

export interface ProductImage {
  alt: string;
  src: string;
}

