export enum DesignFormat {
  INSTAGRAM_POST = 'Instagram Post (1:1)',
  INSTAGRAM_STORY = 'Instagram Story (9:16)',
  FACEBOOK_POST = 'Facebook Post (1.91:1)',
  TWITTER_POST = 'Twitter Post (16:9)',
}

export enum DesignStyle {
  REALISTIC = 'Hyper-Realistic',
  MODERN = 'Modern',
  MINIMALIST = 'Minimalist',
  VINTAGE = 'Vintage',
  FUTURISTIC = 'Futuristic',
  ELEGANT = 'Elegant',
  BOLD = 'Bold & Vibrant',
  ANIME = 'Anime / Manga',
  STUDIO_GHIBLI = 'Studio Ghibli Inspired',
  WATERCOLOR = 'Watercolor',
}

export enum VisualType {
  SOCIAL_MEDIA_AD = 'Social Media Ad',
  EVENT_FLYER = 'Event Flyer',
  RESTAURANT_MENU = 'Restaurant Menu',
  BUSINESS_CARD = 'Business Card',
  BANNER = 'Website Banner',
}


export interface DesignGenerationParams {
  prompt: string;
  primaryColor: string;
  secondaryColor: string;
  format: string;
  logoBase64?: string;
  logoMimeType?: string;
  visualText?: string;
  style: DesignStyle;
  visualType: VisualType;
  componentStyle?: string;
}

export interface DesignResult {
  imageUrl: string;
  text: string;
}