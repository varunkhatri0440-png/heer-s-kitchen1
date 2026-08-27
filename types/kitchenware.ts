export interface ProductHotspotItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  top: string; // percentage or px
  left: string;
  badge: string;
  metric?: string;
  metricLabel?: string;
  frameRange: [number, number]; // active frame range
}

export interface CollectionData {
  id: "whisk" | "knife" | "ensemble";
  title: string;
  subtitle: string;
  series: string;
  tagline: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewsCount: number;
  specs: {
    label: string;
    value: string;
    icon?: string;
  }[];
  features: string[];
  materials: {
    name: string;
    description: string;
    purity: string;
  }[];
  folder: "f1" | "f2" | "f3";
  startFrame: number;
  endFrame: number;
  totalFrames: number;
  hotspots: ProductHotspotItem[];
}

export const WHISK_COLLECTION: CollectionData = {
  id: "whisk",
  title: "The Aurelia Master Balloon Whisk & Acacia Array",
  subtitle: "Aerodynamic Culinary Instrument",
  series: "Series I // Kinetic Harmony",
  tagline: "Engineered with 12 calibrated spring-wire tines and a solid, counterbalanced ergonomic handle for effortless emulsion.",
  price: "$145",
  originalPrice: "$180",
  rating: 4.96,
  reviewsCount: 148,
  folder: "f1",
  startFrame: 0,
  endFrame: 117,
  totalFrames: 118,
  specs: [
    { label: "Material", value: "18/10 Electro-Polished Stainless Steel" },
    { label: "Handle Balance", value: "54:46 Centre-Pivot Counterweight" },
    { label: "Tine Geometry", value: "12 Elliptical Aeration Loops" },
    { label: "Thermal Rating", value: "Up to 550°F / 288°C" },
    { label: "Wood Complement", value: "Sustainably Harvested Acacia" },
    { label: "Finish", value: "Hand-Buffed Satin Mirror" },
  ],
  features: [
    "Vibration-dampening core eliminates wrist fatigue during extended reductions.",
    "Graduated loop curvature maximizes air entrapment for 40% faster egg-white peaks.",
    "Seamless hygienic seal prevents moisture ingress and bacterial buildup.",
    "Includes set of 4 artisanal acacia tasting and sauté spoons.",
  ],
  materials: [
    { name: "304 Surgical Grade Steel", description: "Corrosion-proof matrix resistant to acid & heat", purity: "18% Cr / 10% Ni" },
    { name: "Solid Brass Core Pin", description: "Internal balance stabilizer for ergonomic momentum", purity: "99.8% Cu-Zn" },
    { name: "Organic Acacia Hardwood", description: "Mineral-oil conditioned natural grain", purity: "Grade AAA Solid" },
  ],
  hotspots: [
    {
      id: "whisk-tilted-handle",
      title: "Counterbalanced Pivot Handle",
      subtitle: "Kinetic Geometry",
      description: "Machined from a single block of weighted surgical steel for natural balance and zero wrist strain.",
      top: "76%",
      left: "44%",
      badge: "ERGONOMICS",
      metric: "54:46",
      metricLabel: "Weight Ratio",
      frameRange: [5, 53],
    },
    {
      id: "whisk-tilted-tines",
      title: "12-Tine Aeration Cage",
      subtitle: "Hydrodynamic Loops",
      description: "Calibrated micro-flexible stainless wire loops that accelerate emulsion velocity by 40%.",
      top: "32%",
      left: "56%",
      badge: "AERODYNAMICS",
      metric: "12-Loops",
      metricLabel: "Calibrated Tines",
      frameRange: [10, 53],
    },
    {
      id: "whisk-handle-vertical",
      title: "Electro-Polished Satin Grip",
      subtitle: "Ergonomic Balance",
      description: "Counterbalanced centre pivot ensures fluid control during high-velocity reductions.",
      top: "20%",
      left: "50%",
      badge: "ERGONOMICS",
      metric: "54:46",
      metricLabel: "Balance Ratio",
      frameRange: [54, 117],
    },
    {
      id: "whisk-tines-vertical",
      title: "Hydrodynamic Cage Array",
      subtitle: "Precision Loops",
      description: "Seamless ultrasonic welding guarantees lifetime structural rigidity under rigorous culinary load.",
      top: "54%",
      left: "50%",
      badge: "METALLURGY",
      metric: "304-SS",
      metricLabel: "Surgical Grade",
      frameRange: [54, 117],
    },
    {
      id: "spoons-wood",
      title: "Artisanal Acacia Sauté Array",
      subtitle: "Hand-Healed Grain",
      description: "Individually hand-carved organic acacia spoons with deep bowls, naturally heat-resistant.",
      top: "78%",
      left: "35%",
      badge: "CRAFTSMANSHIP",
      metric: "100%",
      metricLabel: "Organic Acacia",
      frameRange: [60, 117],
    },
  ],
};

export const KNIFE_COLLECTION: CollectionData = {
  id: "knife",
  title: "The Hydro-Series 8.5\" Damascus Chef's Knife",
  subtitle: "Cryogenic German High-Carbon Steel",
  series: "Series II // Precision Cutlery",
  tagline: "Cryo-tempered to 62 HRC with an ultra-hydrophobic nano-finish that effortlessly repels liquid and starchy adhesion.",
  price: "$280",
  originalPrice: "$340",
  rating: 4.98,
  reviewsCount: 312,
  folder: "f2",
  startFrame: 118,
  endFrame: 183,
  totalFrames: 66,
  specs: [
    { label: "Steel Type", value: "German High-Carbon X50CrMoV15" },
    { label: "Hardness", value: "62 ± 1 HRC (Rockwell)" },
    { label: "Edge Angle", value: "11° per side Hand-Honed Micro-Bevel" },
    { label: "Surface Finish", value: "Nano-Hydrophobic Liquid Shield" },
    { label: "Handle Material", value: "Military-Grade G10 Composite" },
    { label: "Bolster", value: "Full-Tang Tapered Pinch Bolster" },
  ],
  features: [
    "Sub-zero cryogenic quenching creates ultra-refined carbide grain structure for lasting razor retention.",
    "Hydrophobic liquid repulsion keeps moisture and starchy vegetables from sticking to the blade face.",
    "Ergonomic G10 composite handle impervious to moisture, kitchen oils, and extreme thermal swings.",
    "Full-tang geometry ensures perfect center-of-mass balance along the pinch grip.",
  ],
  materials: [
    { name: "Cryo-Tempered High-Carbon", description: "Deep frozen at -300°F for crystalline edge hardness", purity: "62 HRC" },
    { name: "Hydro-Shield Nano Coating", description: "Surface energy reduction to shed liquid droplets", purity: "Food-Safe Poly" },
    { name: "G10 Military Composite", description: "High-pressure fiberglass resin handle rivets", purity: "Aerospace Spec" },
  ],
  hotspots: [
    {
      id: "knife-edge",
      title: "11° Honed Micro-Bevel",
      subtitle: "Razor Precision",
      description: "Hand-stropped on whetstones to an acute 11-degree angle per side, gliding effortlessly through meats and produce.",
      top: "48%",
      left: "28%",
      badge: "CUTTING EDGE",
      metric: "11°",
      metricLabel: "Per Side Angle",
      frameRange: [130, 183],
    },
    {
      id: "knife-surface",
      title: "Hydro-Surface Liquid Shed",
      subtitle: "Zero Friction",
      description: "Micro-textured surface tension reduction causes water droplets and vegetable juices to bead off instantly without sticking.",
      top: "42%",
      left: "48%",
      badge: "HYDROPHOBIC",
      metric: "0.02μm",
      metricLabel: "Surface Texture",
      frameRange: [135, 183],
    },
    {
      id: "knife-handle",
      title: "Triple-Riveted G10 Bolster",
      subtitle: "Pinch-Grip Ergonomics",
      description: "Contoured military-grade composite handle with full tang and seamless stainless rivets for slip-resistant tactile control.",
      top: "46%",
      left: "75%",
      badge: "ERGONOMICS",
      metric: "62 HRC",
      metricLabel: "Rockwell Rating",
      frameRange: [125, 183],
    },
  ],
};

export const ENSEMBLE_COLLECTION: CollectionData = {
  id: "ensemble",
  title: "The Grand Atelier 14-Piece Master Ensemble",
  subtitle: "Zero-Gravity Kinetic Utensil Symphony",
  series: "Series III // Complete Culinary Atelier",
  tagline: "The complete artisanal orchestra of hand-carved acacia tools, perforated skimmers, and electro-polished surgical instruments in dynamic radial balance.",
  price: "$460",
  originalPrice: "$580",
  rating: 4.99,
  reviewsCount: 428,
  folder: "f3",
  startFrame: 184,
  endFrame: 300,
  totalFrames: 117,
  specs: [
    { label: "Piece Count", value: "14 Hand-Crafted Culinary Instruments" },
    { label: "Hardwood", value: "Kiln-Dried Old-Growth Acacia" },
    { label: "Steel Specification", value: "304 & 316 Marine Surgical Alloy" },
    { label: "Heat Tolerance", value: "Up to 600°F (315°C)" },
    { label: "Assembly Geometry", value: "Kinetic Radial Counterbalance" },
    { label: "Storage", value: "Solid Walnut Floating Stand Included" },
  ],
  features: [
    "Full radial orchestra including skimmers, slotted turners, deep ladles, tasting paddles, and lockable precision tongs.",
    "Engineered center-of-gravity pivot ensures no active utensil head touches the kitchen surface when set down.",
    "Deep food-grade mineral cure resists staining, odors, and moisture retention indefinitely.",
    "Complete heirloom collection presented in numbered museum-grade packaging.",
  ],
  materials: [
    { name: "Marine 316 Surgical Steel", description: "Maximum pitting and corrosion resistance for high-acid gastronomy", purity: "18% Cr / 12% Ni / 2.5% Mo" },
    { name: "A-Grade Hardwood Acacia", description: "Dense closed-grain structure hand-buffed with organic walnut oil", purity: "100% Solid Heartwood" },
    { name: "Silicone Thermal Grips", description: "Food-safe platinum-cured silicone heat barriers", purity: "FDA / LFGB Certified" },
  ],
  hotspots: [
    {
      id: "radial-mandala",
      title: "Kinetic Radial Symphony",
      subtitle: "Dynamic Geometry",
      description: "14 instruments calibrated to spin and settle into an exact ergonomic counterpoise, offering instant chef access.",
      top: "48%",
      left: "50%",
      badge: "KINETIC HARMONY",
      metric: "14 Pieces",
      metricLabel: "Instrument Count",
      frameRange: [184, 250],
    },
    {
      id: "acacia-paddle",
      title: "Hand-Healed Acacia Risotto Paddle",
      subtitle: "Thermal Precision",
      description: "Asymmetrical corner contour reaches pan edges effortlessly, preserving delicate fond without scratching copper or non-stick cookware.",
      top: "38%",
      left: "32%",
      badge: "ORGANIC GRAIN",
      metric: "600°F",
      metricLabel: "Thermal Resilience",
      frameRange: [220, 300],
    },
    {
      id: "perforated-skimmer",
      title: "Surgical Micro-Skimmer & Ladle",
      subtitle: "Hydrodynamic Drainage",
      description: "Ultra-thin electro-polished stainless matrix drains boiling broth and fryer oil 3x faster than conventional skimmers.",
      top: "58%",
      left: "68%",
      badge: "316 ALLOY",
      metric: "3x Faster",
      metricLabel: "Drain Velocity",
      frameRange: [230, 300],
    },
  ],
};
