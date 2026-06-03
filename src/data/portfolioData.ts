import { Service, Project, TeamMember, GalleryItem } from "../types";

export const services: Service[] = [
  {
    id: "01",
    title: "INTERIOR DESIGN",
    icon: "architecture",
    description: "Tailored spatial planning and concepts that optimize your layout, visual scale, and functionality for a harmonious flow.",
    imageUrl: "/images/Bedrooms/WhatsApp Image 2026-06-02 at 1.46.15 PM.webp"
  },
  {
    id: "02",
    title: "TURNKEY RENOVATION",
    icon: "key",
    description: "Seamless end-to-end renovation management. We supervise every detail on-site, ensuring strict alignment with the design vision and timeline.",
    imageUrl: "/images/Kitchen/WhatsApp Image 2026-06-02 at 1.51.02 PM.webp"
  },
  {
    id: "03",
    title: "SELECTION OF MATERIALS",
    icon: "palette",
    description: "Curation of high-end finishes, bespoke fabrics, and premium materials to ensure a balanced, lasting, and cohesive aesthetic.",
    imageUrl: "/images/Curtains/WhatsApp Image 2026-06-02 at 1.51.13 PM.webp"
  },
  {
    id: "04",
    title: "PLANNING SOLUTIONS",
    icon: "grid_view",
    description: "Optimization of space planning to maximize efficiency, architectural flow, and geometric ergonomic structures."
  },
  {
    id: "05",
    title: "LIGHTING DESIGN",
    icon: "lightbulb",
    description: "Architectural lighting layouts that define ambiance, highlighting custom textures, spatial forms, and key functional zones."
  },
  {
    id: "06",
    title: "DECOR & STYLING",
    icon: "flare",
    description: "Curated collection of designer objects, precise art placement, and premium textiles that bring character and soul to the space."
  },
  {
    id: "07",
    title: "CONSTRUCTION MGMT",
    icon: "engineering",
    description: "Supervising building phases to align strictly with architectural intent, blueprints, technical specs, and schedule agreements."
  },
  {
    id: "08",
    title: "3D VISUALIZATION",
    icon: "view_in_ar",
    description: "High-fidelity photorealistic rendering of planned concepts to preview visual outputs and scale relationships prior to construction."
  },
  {
    id: "09",
    title: "FURNITURE DESIGN",
    icon: "chair",
    description: "Bespoke furniture designs, custom millwork plans, and structural fittings engineered to fit the unique layout specifications."
  },
  {
    id: "10",
    title: "LANDSCAPE INTEGRATION",
    icon: "park",
    description: "Seamless transitions blending indoor luxury living sections with outdoor natural greenery, terraces, and water assets."
  },
  {
    id: "11",
    title: "SMART HOME TECH",
    icon: "sensors",
    description: "Integrating advanced automation systems, climate controls, intelligent sensors, and custom audio-visual setups."
  },
  {
    id: "12",
    title: "POST-DESIGN CARE",
    icon: "verified",
    description: "Stylistic support, updates, and maintenance manuals for clients to preserve the spaces in their pristine initial state."
  }
];

export const projects: Project[] = [
  {
    id: "bedroom-design",
    title: "BEDROOM DESIGN",
    description: "A serene, light-filled bedroom combining soft linen textures, light oak, and integrated ambient lighting.",
    concept: "Designed as a personal sanctuary, this master bedroom utilizes a warm minimalist approach. Soft textures, integrated headboard storage, and subtle linear LED lighting elements foster a restful and relaxing atmosphere.",
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
    description: "A cinematic, luxury living room featuring oak wood paneling, premium low-profile seating, and warm daylighting.",
    concept: "This space balances raw oak panels with smooth cream fabrics and polished concrete. The layout is optimized to foster flow, centering around a low-profile sectional sofa and expansive viewports that pull the natural skyline inside.",
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
    description: "An elegant culinary space featuring a marble waterfall island, concealed high-end appliances, and clean architectural lines.",
    concept: "Designed as the home's social anchor, this kitchen pairs a bold marble waterfall island with matte black fixtures. Built-in storage and custom pocket doors keep appliances out of sight, prioritizing clean geometric profiles and structural symmetry.",
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
    description: "Innovative ceiling architectures incorporating custom recessed illumination, structural wood slats, and geometric profiles.",
    concept: "Every structural panel is custom drafted to frame the room geometry, using acoustic oak slats and warm concealed LED channels to diffuse ambient light.",
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
    description: "Curated premium linen curtains, double-layer drapery structures, and customized motor automation layouts.",
    concept: "Matching color schemes and textures with natural room daylighting ratios, adding automated track integrations for seamless transitions.",
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
    description: "Minimalist washbasin vanities combining sleek quartz sinks, matte metal fixtures, and integrated led mirrors.",
    concept: "Focusing on clean linear geometry and water-resistant premium surfaces, offering bespoke layouts for compact and spacious vanity rooms.",
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
    description: "A bespoke wellness sanctuary crafted with premium cedar timber, seamless glass, and integrated ambient lighting.",
    concept: "Designed to evoke deep tranquility, this private spa balances rich cedar slats with cool travertine stone. The integration of concealed linear lighting highlights raw material textures, creating a sensory retreat defined by technical precision and silent luxury.",
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
