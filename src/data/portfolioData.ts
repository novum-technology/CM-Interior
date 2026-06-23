import { Service, Project, TeamMember, GalleryItem } from "../types";

export const services: Service[] = [
  {
    id: "01",
    title: "Interior Design",
    icon: "architecture",
    description: "Smart space planning and room layouts to make your home beautiful and comfortable.",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.46.15 PM.webp"
  },
  {
    id: "02",
    title: "Interior Gypsum Works",
    icon: "layers",
    description: "Professional false ceilings, decorative borders, and clean gypsum finishes.",
    imageUrl: "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.42 PM.webp"
  },
  {
    id: "03",
    title: "Wall Paneling",
    icon: "texture",
    description: "Beautiful wooden wall paneling and textured designs to add character to your rooms.",
    imageUrl: "/images/sauna_1.png"
  },
  {
    id: "04",
    title: "PVC Wall Panel",
    icon: "grid_view",
    description: "Durable, moisture-proof PVC paneling for quick, easy, and water-resistant wall styling.",
    imageUrl: "/images/sauna_2.png"
  },
  {
    id: "05",
    title: "Window Curtains",
    icon: "blinds",
    description: "Custom window curtains and blinds tailored to match your rooms perfectly.",
    imageUrl: "/images/Curtains/WhatsApp Image 2026-06-02 at 1.51.13 PM.webp"
  },
  {
    id: "06",
    title: "Plywood Works",
    icon: "carpenter",
    description: "Custom plywood cupboards, modular wardrobes, and quality kitchen cabinetry.",
    imageUrl: "/images/Kitchen/WhatsApp Image 2026-06-02 at 1.51.02 PM.webp"
  },
  {
    id: "07",
    title: "Residential Interiors",
    icon: "home",
    description: "Complete home interior design for houses, apartments, and living spaces.",
    imageUrl: "/images/apartment_1.png"
  },
  {
    id: "08",
    title: "Villa Interiors",
    icon: "cottage",
    description: "Elegant interior design and luxury spacing custom-made for independent villas.",
    imageUrl: "/images/sauna_3.png"
  },
  {
    id: "09",
    title: "Apartment Interiors",
    icon: "apartment",
    description: "Space-saving designs and smart storage solutions for modern apartments.",
    imageUrl: "/images/apartment_2.png"
  },
  {
    id: "10",
    title: "Commercial Interiors",
    icon: "storefront",
    description: "Attractive designs for shops, boutiques, and retail spaces to welcome clients.",
    imageUrl: "/images/plaster_art.png"
  },
  {
    id: "11",
    title: "Office Interiors",
    icon: "work",
    description: "Practical, comfortable, and productive designs for workspaces and offices.",
    imageUrl: "/images/office_map.png"
  },
  {
    id: "12",
    title: "Turnkey Interior Solutions",
    icon: "key",
    description: "End-to-end service from design plans and material selection to final handover.",
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

export const galleryItems: GalleryItem[] = [
  // 1. Bedrooms
  {
    id: "g_bed_0",
    title: "Bedroom Design Concept 1",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.46.15 PM (1).webp"
  },
  {
    id: "g_bed_1",
    title: "Bedroom Design Concept 2",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.46.15 PM.webp"
  },
  {
    id: "g_bed_2",
    title: "Bedroom Design Concept 3",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.46.16 PM.webp"
  },
  {
    id: "g_bed_3",
    title: "Bedroom Design Concept 4",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.50.58 PM.webp"
  },
  {
    id: "g_bed_4",
    title: "Bedroom Design Concept 5",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.50.59 PM (1).webp"
  },
  {
    id: "g_bed_5",
    title: "Bedroom Design Concept 6",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.50.59 PM.webp"
  },
  {
    id: "g_bed_6",
    title: "Bedroom Design Concept 7",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.00 PM.webp"
  },
  {
    id: "g_bed_7",
    title: "Bedroom Design Concept 8",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.01 PM (1).webp"
  },
  {
    id: "g_bed_8",
    title: "Bedroom Design Concept 9",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.01 PM (2).webp"
  },
  {
    id: "g_bed_9",
    title: "Bedroom Design Concept 10",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.01 PM.webp"
  },
  {
    id: "g_bed_10",
    title: "Bedroom Design Concept 11",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.04 PM (1).webp"
  },
  {
    id: "g_bed_11",
    title: "Bedroom Design Concept 12",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.04 PM (2).webp"
  },
  {
    id: "g_bed_12",
    title: "Bedroom Design Concept 13",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.04 PM.webp"
  },
  {
    id: "g_bed_13",
    title: "Bedroom Design Concept 14",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.06 PM.webp"
  },
  {
    id: "g_bed_14",
    title: "Bedroom Design Concept 15",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.07 PM (1).webp"
  },
  {
    id: "g_bed_15",
    title: "Bedroom Design Concept 16",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.07 PM (2).webp"
  },
  {
    id: "g_bed_16",
    title: "Bedroom Design Concept 17",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.07 PM.webp"
  },
  {
    id: "g_bed_17",
    title: "Bedroom Design Concept 18",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.08 PM (1).webp"
  },
  {
    id: "g_bed_18",
    title: "Bedroom Design Concept 19",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.08 PM (2).webp"
  },
  {
    id: "g_bed_19",
    title: "Bedroom Design Concept 20",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.08 PM.webp"
  },
  {
    id: "g_bed_20",
    title: "Bedroom Design Concept 21",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.09 PM.webp"
  },
  {
    id: "g_bed_21",
    title: "Bedroom Design Concept 22",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.10 PM (1).webp"
  },
  {
    id: "g_bed_22",
    title: "Bedroom Design Concept 23",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.10 PM (2).webp"
  },
  {
    id: "g_bed_23",
    title: "Bedroom Design Concept 24",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.10 PM.webp"
  },
  {
    id: "g_bed_24",
    title: "Bedroom Design Concept 25",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.11 PM (1).webp"
  },
  {
    id: "g_bed_25",
    title: "Bedroom Design Concept 26",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.11 PM.webp"
  },
  {
    id: "g_bed_26",
    title: "Bedroom Design Concept 27",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.12 PM (1).webp"
  },
  {
    id: "g_bed_27",
    title: "Bedroom Design Concept 28",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.12 PM (2).webp"
  },
  {
    id: "g_bed_28",
    title: "Bedroom Design Concept 29",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.51.12 PM.webp"
  },
  {
    id: "g_bed_29",
    title: "Bedroom Design Concept 30",
    category: "BEDROOMS",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 12.36.37 PM (1).webp"
  },

  // 2. Living Rooms
  {
    id: "g1",
    title: "Dusk Poolside Living Space",
    category: "LIVING ROOMS",
    imageUrl: "/images/poolside_terrace.png"
  },
  {
    id: "g4",
    title: "Vast Living Room Sunset View",
    category: "LIVING ROOMS",
    imageUrl: "/images/home_hero.webp"
  },
  {
    id: "g6",
    title: "Modern Modular Sofa Setup",
    category: "LIVING ROOMS",
    imageUrl: "/images/apartment_1.png"
  },
  {
    id: "g13",
    title: "Penthouse Panoramic Skyline View",
    category: "LIVING ROOMS",
    imageUrl: "/images/apartment_1.png"
  },
  {
    id: "g14",
    title: "Minimalist Modular Sofa Setup",
    category: "LIVING ROOMS",
    imageUrl: "/images/apartment_1.png"
  },

  // 3. Kitchens
  {
    id: "g_kit_0",
    title: "Kitchen Design Concept 1",
    category: "KITCHENS",
    imageUrl: "/images/Kitchen/WhatsApp Image 2026-06-02 at 1.51.02 PM (1).webp"
  },
  {
    id: "g_kit_1",
    title: "Kitchen Design Concept 2",
    category: "KITCHENS",
    imageUrl: "/images/Kitchen/WhatsApp Image 2026-06-02 at 1.51.02 PM (2).webp"
  },
  {
    id: "g_kit_2",
    title: "Kitchen Design Concept 3",
    category: "KITCHENS",
    imageUrl: "/images/Kitchen/WhatsApp Image 2026-06-02 at 1.51.02 PM.webp"
  },
  {
    id: "g_kit_3",
    title: "Kitchen Design Concept 4",
    category: "KITCHENS",
    imageUrl: "/images/Kitchen/WhatsApp Image 2026-06-02 at 1.51.03 PM (1).webp"
  },
  {
    id: "g_kit_4",
    title: "Kitchen Design Concept 5",
    category: "KITCHENS",
    imageUrl: "/images/Kitchen/WhatsApp Image 2026-06-02 at 1.51.03 PM.webp"
  },
  {
    id: "g_kit_5",
    title: "Kitchen Design Concept 6",
    category: "KITCHENS",
    imageUrl: "/images/Kitchen/WhatsApp Image 2026-06-02 at 1.51.05 PM (1).webp"
  },
  {
    id: "g_kit_6",
    title: "Kitchen Design Concept 7",
    category: "KITCHENS",
    imageUrl: "/images/Kitchen/WhatsApp Image 2026-06-02 at 1.51.05 PM.webp"
  },
  {
    id: "g_kit_7",
    title: "Kitchen Design Concept 8",
    category: "KITCHENS",
    imageUrl: "/images/Kitchen/WhatsApp Image 2026-06-02 at 1.51.06 PM.webp"
  },

  // 4. Ceiling
  {
    id: "g_ceil_0",
    title: "Ceiling Structural Concept 1",
    category: "CEILING",
    imageUrl: "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.36 PM.webp"
  },
  {
    id: "g_ceil_1",
    title: "Ceiling Structural Concept 2",
    category: "CEILING",
    imageUrl: "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.37 PM (2).webp"
  },
  {
    id: "g_ceil_2",
    title: "Ceiling Structural Concept 3",
    category: "CEILING",
    imageUrl: "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.37 PM.webp"
  },
  {
    id: "g_ceil_3",
    title: "Ceiling Structural Concept 4",
    category: "CEILING",
    imageUrl: "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.38 PM (1).webp"
  },
  {
    id: "g_ceil_4",
    title: "Ceiling Structural Concept 5",
    category: "CEILING",
    imageUrl: "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.38 PM.webp"
  },
  {
    id: "g_ceil_5",
    title: "Ceiling Structural Concept 6",
    category: "CEILING",
    imageUrl: "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.39 PM (1).webp"
  },
  {
    id: "g_ceil_6",
    title: "Ceiling Structural Concept 7",
    category: "CEILING",
    imageUrl: "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.39 PM.webp"
  },
  {
    id: "g_ceil_7",
    title: "Ceiling Structural Concept 8",
    category: "CEILING",
    imageUrl: "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.40 PM.webp"
  },
  {
    id: "g_ceil_8",
    title: "Ceiling Structural Concept 9",
    category: "CEILING",
    imageUrl: "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.41 PM (2).webp"
  },
  {
    id: "g_ceil_9",
    title: "Ceiling Structural Concept 10",
    category: "CEILING",
    imageUrl: "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.41 PM.webp"
  },
  {
    id: "g_ceil_10",
    title: "Ceiling Structural Concept 11",
    category: "CEILING",
    imageUrl: "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.42 PM (1).webp"
  },
  {
    id: "g_ceil_11",
    title: "Ceiling Structural Concept 12",
    category: "CEILING",
    imageUrl: "/images/Cieling/WhatsApp Image 2026-06-02 at 12.36.42 PM.webp"
  },

  // 5. Curtains
  {
    id: "g_curt_0",
    title: "Curtains Curation Concept 1",
    category: "CURTAINS",
    imageUrl: "/images/Curtains/WhatsApp Image 2026-06-02 at 1.51.13 PM (1).webp"
  },
  {
    id: "g_curt_1",
    title: "Curtains Curation Concept 2",
    category: "CURTAINS",
    imageUrl: "/images/Curtains/WhatsApp Image 2026-06-02 at 1.51.13 PM.webp"
  },
  {
    id: "g_curt_2",
    title: "Curtains Curation Concept 3",
    category: "CURTAINS",
    imageUrl: "/images/Curtains/WhatsApp Image 2026-06-02 at 1.51.14 PM (1).webp"
  },
  {
    id: "g_curt_3",
    title: "Curtains Curation Concept 4",
    category: "CURTAINS",
    imageUrl: "/images/Curtains/WhatsApp Image 2026-06-02 at 1.51.14 PM.webp"
  },

  // 6. Washbase
  {
    id: "g_wash_0",
    title: "Washbasin Vanity Concept 1",
    category: "WASHBASE",
    imageUrl: "/images/Washbase/WhatsApp Image 2026-06-02 at 1.46.12 PM (1).webp"
  },
  {
    id: "g_wash_1",
    title: "Washbasin Vanity Concept 2",
    category: "WASHBASE",
    imageUrl: "/images/Washbase/WhatsApp Image 2026-06-02 at 1.46.12 PM.webp"
  },
  {
    id: "g_wash_2",
    title: "Washbasin Vanity Concept 3",
    category: "WASHBASE",
    imageUrl: "/images/Washbase/WhatsApp Image 2026-06-02 at 1.46.13 PM (1).webp"
  },
  {
    id: "g_wash_3",
    title: "Washbasin Vanity Concept 4",
    category: "WASHBASE",
    imageUrl: "/images/Washbase/WhatsApp Image 2026-06-02 at 1.46.13 PM.webp"
  },
  {
    id: "g_wash_4",
    title: "Washbasin Vanity Concept 5",
    category: "WASHBASE",
    imageUrl: "/images/Washbase/WhatsApp Image 2026-06-02 at 1.46.14 PM.webp"
  },

  // 7. Villas
  {
    id: "g10",
    title: "Cedar Slats Sauna Suite",
    category: "VILLAS",
    imageUrl: "/images/sauna_1.png"
  },
  {
    id: "g11",
    title: "Travertine Slate Bath Details",
    category: "VILLAS",
    imageUrl: "/images/sauna_2.png"
  },
  {
    id: "g12",
    title: "Master Suite Concrete Polish Floor",
    category: "VILLAS",
    imageUrl: "/images/sauna_3.png"
  }
];

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
