export type NatureCategory = 'birds' | 'plants' | 'insects' | 'wildlife' | 'auto';

export interface IdentificationResult {
  commonName: string;
  scientificName: string;
  category: 'birds' | 'plants' | 'insects' | 'wildlife';
  shortDescription: string;
  distinguishingCharacteristics: string[];
  naturalHabitat: string;
  interestingFacts: string[];
  confidenceScore?: number; // 0 to 1, only if meaningfully supported
  suggestedActivity: string;
  safetyNotes?: string;
  identificationDisclaimer: string;
  modelUsed: string;
  identifiedAt: string;
}

export interface IdentificationRequest {
  image: string; // base64 or data URL
  preferredCategory?: NatureCategory;
}

export interface NatureStatItem {
  label: string;
  value: string;
  description: string;
}
