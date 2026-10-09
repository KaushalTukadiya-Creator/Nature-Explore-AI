import { IdentificationResult, NatureCategory } from './nature';

export interface JournalEntry {
  id: string;
  thumbnailUrl: string; // Resized data URL or compressed base64 to preserve localStorage limits
  fullImageUrl?: string; // Optional full resolution preview if stored in session/memory
  identification: IdentificationResult;
  category: NatureCategory;
  date: string;
  locationNotes?: string;
  personalNotes?: string;
  tags?: string[];
}

export interface OutdoorActivity {
  id: string;
  title: string;
  description: string;
  category: 'observation' | 'learning' | 'challenge' | 'wellbeing';
  estimatedDuration: string;
  difficulty: 'Easy' | 'Moderate' | 'Challenging';
  suggestedEquipment?: string[];
  tips?: string;
  isCompleted: boolean;
  completedAt?: string;
}
