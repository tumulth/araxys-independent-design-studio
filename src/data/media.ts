/**
 * ARAXYS CENTRAL MEDIA REGISTRY
 * 
 * Media paths point to the uploaded production video files:
 * 1. home pg loading animation.mp4
 * 2. home pg loop video.mp4
 * 3. home to about img sequence.mp4
 */

export interface GalleryItem {
  readonly src: string;
  readonly caption: string;
  readonly aspect?: '16:9' | '4:3' | '1:1' | '21:9';
}

export interface ProjectMedia {
  readonly heroVideo?: string;
  readonly heroImage?: string;
  readonly gallery: readonly GalleryItem[];
  readonly projectVideo?: string;
}

export const MEDIA = {
  // Brand identity
  logoWhiteText: '/assets/images/araxys logo white text.png',
  logoIcon: '/assets/images/araxys-mark.svg',

  // Core Homepage Sequences (exact uploaded filenames)
  introVideo: '/assets/videos/home pg loading animation.mp4',
  homepageLoop: '/assets/videos/home pg loop video.mp4',
  aboutTransition: '/assets/videos/home to about img sequence.mp4',

  // Client Case Study Media
  projects: {
    bimacme: {
      heroVideo: '/assets/projects/bimacme/hero.mp4',
      heroImage: '/assets/projects/bimacme/hero.jpg',
      projectVideo: '/assets/projects/bimacme/showcase.mp4',
      gallery: [
        {
          src: '/assets/projects/bimacme/gallery-1.jpg',
          caption: 'Structural modular grid system and technical typography',
          aspect: '16:9'
        },
        {
          src: '/assets/projects/bimacme/gallery-2.jpg',
          caption: 'Laser-etched anodized aluminum signage & architectural wayfinding',
          aspect: '4:3'
        },
        {
          src: '/assets/projects/bimacme/gallery-3.jpg',
          caption: 'Digital interface components & enterprise CAD tool integration',
          aspect: '4:3'
        },
        {
          src: '/assets/projects/bimacme/gallery-4.jpg',
          caption: 'Monolithic stationery kit with blind debossed technical indices',
          aspect: '16:9'
        }
      ]
    },
    'butta-burger': {
      heroVideo: '/assets/projects/butta-burger/hero.mp4',
      heroImage: '/assets/projects/butta-burger/hero.jpg',
      projectVideo: '/assets/projects/butta-burger/showcase.mp4',
      gallery: [
        {
          src: '/assets/projects/butta-burger/gallery-1.jpg',
          caption: 'High-energy typographic kraft wraps and custom greaseproof print',
          aspect: '16:9'
        },
        {
          src: '/assets/projects/butta-burger/gallery-2.jpg',
          caption: 'Bold tactile condiment vessels and embossed takeout packaging',
          aspect: '4:3'
        },
        {
          src: '/assets/projects/butta-burger/gallery-3.jpg',
          caption: 'Motion design stickers and digital ordering kiosk interface',
          aspect: '4:3'
        },
        {
          src: '/assets/projects/butta-burger/gallery-4.jpg',
          caption: 'Warm ambient dining atmosphere & illuminated marquee signage',
          aspect: '16:9'
        }
      ]
    },
    'nikhil-kapahi': {
      heroVideo: '/assets/projects/nikhil-kapahi/hero.mp4',
      heroImage: '/assets/projects/nikhil-kapahi/hero.jpg',
      projectVideo: '/assets/projects/nikhil-kapahi/showcase.mp4',
      gallery: [
        {
          src: '/assets/projects/nikhil-kapahi/gallery-1.jpg',
          caption: 'Editorial monograph layout with ultra-wide negative margins',
          aspect: '16:9'
        },
        {
          src: '/assets/projects/nikhil-kapahi/gallery-2.jpg',
          caption: 'Heavyweight cotton paper cards with micro-foil typography',
          aspect: '4:3'
        },
        {
          src: '/assets/projects/nikhil-kapahi/gallery-3.jpg',
          caption: 'Personal portfolio digital experience with kinetic typographic pacing',
          aspect: '4:3'
        },
        {
          src: '/assets/projects/nikhil-kapahi/gallery-4.jpg',
          caption: 'Curated physical exhibition collateral and invitation suite',
          aspect: '16:9'
        }
      ]
    },
    burgyard: {
      heroVideo: '/assets/projects/burgyard/hero.mp4',
      heroImage: '/assets/projects/burgyard/hero.jpg',
      projectVideo: '/assets/projects/burgyard/showcase.mp4',
      gallery: [
        {
          src: '/assets/projects/burgyard/gallery-1.jpg',
          caption: 'High-contrast street wheatpaste campaign with gritty character art',
          aspect: '16:9'
        },
        {
          src: '/assets/projects/burgyard/gallery-2.jpg',
          caption: 'Industrial matte black delivery box with vivid hazard vermillion tape',
          aspect: '4:3'
        },
        {
          src: '/assets/projects/burgyard/gallery-3.jpg',
          caption: 'Streetwear crew apparel and screenprinted skate deck collaboration',
          aspect: '4:3'
        },
        {
          src: '/assets/projects/burgyard/gallery-4.jpg',
          caption: 'Digital drop storefront with countdown telemetry & secret menu portal',
          aspect: '16:9'
        }
      ]
    }
  }
} as const;
