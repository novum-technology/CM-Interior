export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  location: string;
  execution: string;
  images: string[];
  mainImage?: string;
  category: string;
  concept?: string;
  durationDays?: number;
}

export interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
}
