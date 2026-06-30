import { Service, Project, TeamMember, GalleryItem } from "../types";
import galleryData from "./gallery.json";

export const services: Service[] = [
  {
    id: "01",
    title: "Interior Design",
    icon: "architecture",
    description: "Smart space planning and layouts.",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.46.15 PM.webp"
  },
  {
    id: "02",
    title: "Interior Gypsum Works",
    icon: "layers",
    description: "False ceilings and gypsum finishes.",
    imageUrl: "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.42 PM.webp"
  },
  {
    id: "03",
    title: "Wall Paneling",
    icon: "texture",
    description: "Wooden paneling and textured designs.",
    imageUrl: "/images/sauna_1.png"
  },
  {
    id: "04",
    title: "PVC Wall Panel",
    icon: "grid_view",
    description: "Water-resistant PVC wall styling.",
    imageUrl: "/images/sauna_2.png"
  },
  {
    id: "05",
    title: "Window Curtains",
    icon: "blinds",
    description: "Custom-made curtains and blinds.",
    imageUrl: "/images/Curtains/WhatsApp Image 2026-06-02 at 1.51.13 PM.webp"
  },
  {
    id: "06",
    title: "Plywood Works",
    icon: "carpenter",
    description: "Custom cupboards and modular wardrobes.",
    imageUrl: "/images/Kitchen/WhatsApp Image 2026-06-02 at 1.51.02 PM.webp"
  },
  {
    id: "07",
    title: "Residential Interiors",
    icon: "home",
    description: "Complete home interior design.",
    imageUrl: "/images/apartment_1.png"
  },
  {
    id: "08",
    title: "Villa Interiors",
    icon: "cottage",
    description: "Luxury interior spacing for villas.",
    imageUrl: "/images/sauna_3.png"
  },
  {
    id: "09",
    title: "Apartment Interiors",
    icon: "apartment",
    description: "Space-saving layouts and storage.",
    imageUrl: "/images/apartment_2.png"
  },
  {
    id: "10",
    title: "Commercial Interiors",
    icon: "storefront",
    description: "Modern designs for shops and retail.",
    imageUrl: "/images/plaster_art.png"
  },
  {
    id: "11",
    title: "Office Interiors",
    icon: "work",
    description: "Productive office and workspace layouts.",
    imageUrl: "/images/office_map.png"
  },
  {
    id: "12",
    title: "Turnkey Interior Solutions",
    icon: "key",
    description: "End-to-end design and turnkey execution.",
    imageUrl: "/images/service_renovation.png"
  }
];

export const projects: Project[] = [
  {
    id: "bedroom-design",
    title: "BEDROOM DESIGN",
    description: "A comfortable, light-filled bedroom with warm lighting and clean wooden finishes.",
    concept: "We designed this master bedroom as a cozy retreat. It features smart built-in storage, warm lighting, and a soft color palette to create a peaceful space to relax.",
    location: "CALICUT, IN",
    execution: "40 DAYS",
    durationDays: 40,
    category: "BEDROOMS",
    mainImage: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.46.15 PM (1).webp",
    images: [
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.46.15 PM (1).webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.46.15 PM.webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.46.16 PM.webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.50.58 PM.webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.50.59 PM (1).webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.50.59 PM.webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.00 PM.webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.01 PM (1).webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.01 PM (2).webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.01 PM.webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.04 PM (1).webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.04 PM (2).webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.04 PM.webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.06 PM.webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.07 PM (1).webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.07 PM (2).webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.07 PM.webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.08 PM (1).webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.08 PM (2).webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.08 PM.webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.09 PM.webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.10 PM (1).webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.10 PM (2).webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.10 PM.webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.11 PM (1).webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.11 PM.webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.12 PM (1).webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.12 PM (2).webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.12 PM.webp",
  "/images/Bedrooms/WhatsApp Image 2026-06-02 at 12.36.37 PM (1).webp"
]
  },
  {
    id: "living-room-design",
    title: "LIVING ROOM DESIGN",
    description: "A spacious, modern living room with warm wood panels and comfortable low-profile seating.",
    concept: "This living room connects the indoor space with natural outdoor light. We used clean wooden wall panels, cozy seating, and a simple layout to make it perfect for family time.",
    location: "CALICUT, IN",
    execution: "50 DAYS",
    durationDays: 50,
    category: "LIVING ROOMS",
    mainImage: "/images/home_hero.webp",
    images: [
      "/images/home_hero.webp",
      "/images/apartment_1.png",
      "/images/poolside_terrace.png"
    ]
  },
  {
    id: "kitchen-design",
    title: "KITCHEN DESIGN",
    description: "A modern kitchen with a clean marble island and smart, hidden cabinet storage.",
    concept: "Designed as the heart of the home, this kitchen features a practical marble island and modern storage. We hid appliances inside custom cabinets to keep the kitchen clean and organized.",
    location: "ODESA, UA",
    execution: "45 DAYS",
    durationDays: 45,
    category: "KITCHENS",
    mainImage: "/images/Kitchen/WhatsApp Image 2026-06-02 at 1.51.02 PM (1).webp",
    images: [
  "/images/Kitchen/WhatsApp Image 2026-06-02 at 1.51.02 PM (1).webp",
  "/images/Kitchen/WhatsApp Image 2026-06-02 at 1.51.02 PM (2).webp",
  "/images/Kitchen/WhatsApp Image 2026-06-02 at 1.51.02 PM.webp",
  "/images/Kitchen/WhatsApp Image 2026-06-02 at 1.51.03 PM (1).webp",
  "/images/Kitchen/WhatsApp Image 2026-06-02 at 1.51.03 PM.webp",
  "/images/Kitchen/WhatsApp Image 2026-06-02 at 1.51.05 PM (1).webp",
  "/images/Kitchen/WhatsApp Image 2026-06-02 at 1.51.05 PM.webp",
  "/images/Kitchen/WhatsApp Image 2026-06-02 at 1.51.06 PM.webp"
]
  },
  {
    id: "ceiling-design",
    title: "CEILING DESIGN",
    description: "Custom ceiling designs with warm border lighting and stylish wood accents.",
    concept: "We designed custom false ceilings to frame each room beautifully. Warm border lights and wood accents add a modern feel to the entire space.",
    location: "CALICUT, IN",
    execution: "25 DAYS",
    durationDays: 25,
    category: "CEILING",
    mainImage: "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.36 PM.webp",
    images: [
  "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.36 PM.webp",
  "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.37 PM (2).webp",
  "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.37 PM.webp",
  "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.38 PM (1).webp",
  "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.38 PM.webp",
  "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.39 PM (1).webp",
  "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.39 PM.webp",
  "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.40 PM.webp",
  "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.41 PM (2).webp",
  "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.41 PM.webp",
  "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.42 PM (1).webp",
  "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.42 PM.webp"
]
  },
  {
    id: "curtains-design",
    title: "CURTAINS DESIGN",
    description: "Custom-made curtains and blinds designed to match each room's colors and lighting.",
    concept: "We customized the curtain fabrics and styles to match the natural light and theme of each room, adding smooth track systems for daily ease.",
    location: "CALICUT, IN",
    execution: "15 DAYS",
    durationDays: 15,
    category: "CURTAINS",
    mainImage: "/images/Curtains/WhatsApp Image 2026-06-02 at 1.51.13 PM (1).webp",
    images: [
  "/images/Curtains/WhatsApp Image 2026-06-02 at 1.51.13 PM (1).webp",
  "/images/Curtains/WhatsApp Image 2026-06-02 at 1.51.13 PM.webp",
  "/images/Curtains/WhatsApp Image 2026-06-02 at 1.51.14 PM (1).webp",
  "/images/Curtains/WhatsApp Image 2026-06-02 at 1.51.14 PM.webp"
]
  },
  {
    id: "washbase-design",
    title: "WASHBASE DESIGN",
    description: "Modern washbasin counters with quartz tops and smart LED mirrors.",
    concept: "Simple washbasin vanities designed for both compact and large spaces. We combined water-resistant materials with elegant LED mirrors.",
    location: "CALICUT, IN",
    execution: "20 DAYS",
    durationDays: 20,
    category: "WASHBASE",
    mainImage: "/images/Washbase/WhatsApp Image 2026-06-02 at 1.46.12 PM (1).webp",
    images: [
  "/images/Washbase/WhatsApp Image 2026-06-02 at 1.46.12 PM (1).webp",
  "/images/Washbase/WhatsApp Image 2026-06-02 at 1.46.12 PM.webp",
  "/images/Washbase/WhatsApp Image 2026-06-02 at 1.46.13 PM (1).webp",
  "/images/Washbase/WhatsApp Image 2026-06-02 at 1.46.13 PM.webp",
  "/images/Washbase/WhatsApp Image 2026-06-02 at 1.46.14 PM.webp"
]
  },
  {
    id: "sauna-design",
    title: "SAUNA DESIGN",
    description: "A relaxing private wellness space built with natural cedar wood and glass.",
    concept: "We crafted this private sauna using natural cedar wood and clean glass walls. Soft, warm lighting highlights the wood texture to create a peaceful space to unwind.",
    location: "KYIV, UA",
    execution: "30 DAYS",
    durationDays: 30,
    category: "VILLAS",
    mainImage: "/images/sauna_1.png",
    images: [
      "/images/sauna_1.png",
      "/images/sauna_2.png",
      "/images/sauna_3.png"
    ]
  }
];

export const teamMembers: TeamMember[] = [
  {
    name: "ALEXANDER NOVAN",
    role: "FOUNDER & LEAD ARCHITECT",
    imageUrl: "/images/team_alexander.png"
  },
  {
    name: "ELENA VANCE",
    role: "HEAD OF INTERIOR STYLING",
    imageUrl: "/images/team_elena.png"
  }
];

export const galleryItems: GalleryItem[] = galleryData as GalleryItem[];

export const allCategories = [
  "ALL PROJECTS",
  "BEDROOMS",
  "LIVING ROOMS",
  "KITCHENS",
  "CEILING",
  "CURTAINS",
  "WASHBASE",
  "VILLAS"
];

export const brandName = "CM Interior Design";
export const contactPhoneNumber = "+91 97478 38663";
export const contactEmail = "hello@cminteriordesign.com";
export const contactAddress = "Calicut, Kerala";

export const openingHours = [
  { days: "Monday — Friday", hours: "09:00 — 19:00" },
  { days: "Saturday", hours: "11:00 — 16:00" },
  { days: "Sunday", hours: "Closed", closed: true }
];
