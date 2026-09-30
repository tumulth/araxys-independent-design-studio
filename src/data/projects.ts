/**
 * ARAXYS PROJECT DATA REGISTRY
 * 
 * Central project repository for all case studies.
 * Designed to be modular, editable, and loop-linked.
 */

import { MEDIA, ProjectMedia } from './media';

export type FilterCategory = 'ALL' | 'BRANDING' | 'DIGITAL' | 'MOTION' | 'PACKAGING';

export interface CaseStudyContent {
  statement: string;
  overview: string;
  challenge: string;
  approach: string;
  identitySystem: {
    title: string;
    description: string;
    specs: { label: string; value: string }[];
  };
  applications: {
    title: string;
    description: string;
  };
  finalNotes: string;
}

export interface ClientVisualWorld {
  theme: 'industrial' | 'food' | 'editorial' | 'street';
  primaryColor: string;
  accentColor: string;
  surfaceBg: string;
  textColor: string;
  mutedColor: string;
  borderStyle: string;
  moodKeywords: string[];
}

export interface Project {
  slug: string;
  number: string;
  name: string;
  category: string;
  year: string;
  client: string;
  tags: FilterCategory[];
  media: ProjectMedia;
  visualWorld: ClientVisualWorld;
  content: CaseStudyContent;
  nextProject: string; // slug of next project in loop
  prevProject: string; // slug of previous project in loop
}

export const PROJECTS: Project[] = [
  {
    slug: 'bimacme',
    number: '01',
    name: 'BIMACME',
    category: 'Brand Identity / B2B',
    year: '2026',
    client: 'BIMACME Engineering Systems',
    tags: ['BRANDING', 'DIGITAL'],
    media: MEDIA.projects.bimacme,
    visualWorld: {
      theme: 'industrial',
      primaryColor: '#718096',
      accentColor: '#94A3B8',
      surfaceBg: '#090D14',
      textColor: '#F1F5F9',
      mutedColor: '#64748B',
      borderStyle: 'border-slate-800',
      moodKeywords: ['Industrial', 'Architectural', 'Technical', 'Precise', 'Structured']
    },
    content: {
      statement: 'A rigorous, architectural brand identity for technical infrastructure and precision modeling systems.',
      overview: 'Project overview goes here. BIMACME required a cohesive visual system to unify their industrial building information tools and computational engineering workflows across international markets.',
      challenge: 'Project challenge details go here. Balancing the cold mathematical rigor of industrial infrastructure with a sharp, contemporary brand posture that sets the company apart from legacy enterprise B2B players.',
      approach: 'Project approach goes here. We established a modular, grid-centric design system rooted in technical drafting conventions, blueprint layouts, and structural steel geometry.',
      identitySystem: {
        title: 'Drafting Grid & Modular Monospaced Architecture',
        description: 'Every touchpoint adheres to a calibrated 12-column sub-grid inspired by structural engineering calculations. Typographic rules enforce exact vertical alignments and monospaced technical metadata.',
        specs: [
          { label: 'DISCIPLINE', value: 'B2B Brand Identity & Digital System' },
          { label: 'TYPOGRAPHY', value: 'Space Grotesk & IBM Plex Mono' },
          { label: 'COLOR MATRIX', value: 'Slate 900 / Zinc 800 / Steel 400 / Ice 100' },
          { label: 'DELIVERABLES', value: 'Visual Guidelines, Enterprise CAD UI, Signage' }
        ]
      },
      applications: {
        title: 'Physical & Digital Deployment',
        description: 'From heavy-duty laser-etched aluminum architectural plates to real-time 3D telemetry interfaces, the brand language adapts seamlessly across physical materials and high-density software screens.'
      },
      finalNotes: 'The complete identity system was documented into a digital design handbook enabling global teams to deploy collateral with uncompromising precision.'
    },
    nextProject: 'butta-burger',
    prevProject: 'burgyard'
  },
  {
    slug: 'butta-burger',
    number: '02',
    name: 'BUTTA BURGER',
    category: 'Branding / Packaging / Content',
    year: '2026',
    client: 'Butta Burger Hospitality Group',
    tags: ['BRANDING', 'MOTION'],
    media: MEDIA.projects['butta-burger'],
    visualWorld: {
      theme: 'food',
      primaryColor: '#F59E0B',
      accentColor: '#FCD34D',
      surfaceBg: '#120D0A',
      textColor: '#FFFBEB',
      mutedColor: '#A17855',
      borderStyle: 'border-amber-950/60',
      moodKeywords: ['Food', 'Bold', 'Warm', 'Energetic', 'Appetizing']
    },
    content: {
      statement: 'An energetic, bold culinary brand identity crafted around rich warmth, tactile packaging, and unapologetic flavor.',
      overview: 'Project overview goes here. BUTTA BURGER reimagines the modern gourmet smashburger experience with vibrant packaging, custom motion assets, and high-impact physical storefront branding.',
      challenge: 'Project challenge details go here. Creating an appetizing visual world that feels contemporary and premium without losing the messy, joyful energy of authentic street food culture.',
      approach: 'Project approach goes here. We developed a rich golden-amber palette paired with heavyweight condensed typography, buttery curve motifs, and tactile kraft paper packaging.',
      identitySystem: {
        title: 'Warm Gastronomy & High-Contrast Packaging',
        description: 'The visual system pairs warm toasted hues with dynamic sticker elements, greaseproof wrapping patterns, and bold animated micro-interactions for digital ordering.',
        specs: [
          { label: 'DISCIPLINE', value: 'Hospitality Branding & Custom Packaging' },
          { label: 'TYPOGRAPHY', value: 'Heavyweight Grotesk & Custom Display' },
          { label: 'COLOR MATRIX', value: 'Toasted Amber / Deep Butter / Espresso / Cream' },
          { label: 'DELIVERABLES', value: 'Packaging Suite, Menu System, Motion Loops' }
        ]
      },
      applications: {
        title: 'Tactile Packaging & In-Store Motion',
        description: 'Eco-conscious grease-resistant paper wraps, structural takeaway boxes with embossed foil stamps, and synchronized digital ordering kiosk displays.'
      },
      finalNotes: 'A cohesive food brand identity that commands attention in physical spaces, delivery apps, and fast-paced social feeds.'
    },
    nextProject: 'nikhil-kapahi',
    prevProject: 'bimacme'
  },
  {
    slug: 'nikhil-kapahi',
    number: '03',
    name: 'NIKHIL KAPAHI',
    category: 'Brand / Visual Identity',
    year: '2026',
    client: 'Nikhil Kapahi Architecture & Design',
    tags: ['BRANDING', 'DIGITAL'],
    media: MEDIA.projects['nikhil-kapahi'],
    visualWorld: {
      theme: 'editorial',
      primaryColor: '#E7E5E4',
      accentColor: '#D6D3D1',
      surfaceBg: '#0C0A09',
      textColor: '#FAFAF9',
      mutedColor: '#78716C',
      borderStyle: 'border-stone-800',
      moodKeywords: ['Editorial', 'Refined', 'Personal', 'Minimal']
    },
    content: {
      statement: 'A refined, editorial personal identity celebrating architectural stillness, negative space, and curated restraint.',
      overview: 'Project overview goes here. A bespoke visual identity and digital archive created for architect Nikhil Kapahi, emphasizing spatial clarity and materiality over decorative excess.',
      challenge: 'Project challenge details go here. Allowing the architectural photography and physical material samples to breathe while establishing a quiet, authoritative signature presence.',
      approach: 'Project approach goes here. We built an ultra-restrained editorial system utilizing generous negative space, subtle blind debossing, and razor-sharp typographic proportions.',
      identitySystem: {
        title: 'Spatial Silence & Architectural Monograms',
        description: 'Drawing direct inspiration from modernist floor plans, the identity utilizes hairline rules, asymmetrical page geometry, and a custom geometric monogram.',
        specs: [
          { label: 'DISCIPLINE', value: 'Personal Identity & Archival Portfolio' },
          { label: 'TYPOGRAPHY', value: 'Refined Editorial Grotesk & Light Serif' },
          { label: 'COLOR MATRIX', value: 'Charcoal Stone / Linen White / Raw Paper / Silver' },
          { label: 'DELIVERABLES', value: 'Monogram, Stationery, Exhibition Catalog, Web' }
        ]
      },
      applications: {
        title: 'Physical Stationery & Archival Monograph',
        description: 'Heavyweight uncoated cotton paper stocks, edge-gilded portfolios, and a quiet, responsive digital viewing room.'
      },
      finalNotes: 'A timeless personal brand system designed to endure across decades of architectural practice.'
    },
    nextProject: 'burgyard',
    prevProject: 'butta-burger'
  },
  {
    slug: 'burgyard',
    number: '04',
    name: 'BURGYARD',
    category: 'Branding / Packaging / Digital',
    year: '2026',
    client: 'Burgyard Street Culture Co.',
    tags: ['BRANDING', 'PACKAGING', 'DIGITAL'],
    media: MEDIA.projects.burgyard,
    visualWorld: {
      theme: 'street',
      primaryColor: '#EF4444',
      accentColor: '#FFFFFF',
      surfaceBg: '#0A0505',
      textColor: '#F8FAFC',
      mutedColor: '#991B1B',
      borderStyle: 'border-red-950/70',
      moodKeywords: ['Red', 'Black', 'White', 'Street', 'Character-driven']
    },
    content: {
      statement: 'A raw, character-driven street brand forged from underground graphics, high-contrast vermillion, and urban attitude.',
      overview: 'Project overview goes here. Burgyard is a rebellious urban food and streetwear crossover concept operating at the intersection of late-night food culture, skate art, and limited-edition product drops.',
      challenge: 'Project challenge details go here. Designing an authentic subcultural identity that resonates with street culture without feeling like corporate caricature or manufactured edge.',
      approach: 'Project approach goes here. We deployed a stark tri-color palette of vermillion red, asphalt black, and raw white, supported by gritty character illustrations and industrial hazard tape accents.',
      identitySystem: {
        title: 'Reckless Contrast & Street Graphics',
        description: 'Aggressive display typography, stark stencil layouts, wheatpaste poster arrays, and custom mascot graphics built for high-speed street recognition.',
        specs: [
          { label: 'DISCIPLINE', value: 'Street Brand Identity, Packaging & Digital Drops' },
          { label: 'TYPOGRAPHY', value: 'Brutalist Heavy Sans & Stencil Gothic' },
          { label: 'COLOR MATRIX', value: 'Signal Vermillion / Asphalt 950 / Stencil White' },
          { label: 'DELIVERABLES', value: 'Apparel Graphics, Custom Packaging, Drop Portal' }
        ]
      },
      applications: {
        title: 'Street Wheatpaste, Apparel & Drop Site',
        description: 'Matte black greaseproof takeout cartons sealed with custom red security tape, screenprinted heavy-gauge hoodies, and a drop site engineered for rapid flash releases.'
      },
      finalNotes: 'Burgyard established an immediate cult following through its unapologetic visual aggression and unified street execution.'
    },
    nextProject: 'bimacme', // Loops back to first project!
    prevProject: 'nikhil-kapahi'
  }
];

export const PROJECT_LOOKUP: Record<string, Project> = PROJECTS.reduce((acc, project) => {
  acc[project.slug] = project;
  return acc;
}, {} as Record<string, Project>);
