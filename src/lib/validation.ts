import { z } from 'zod';

export const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'];

export const ImageFileSchema = z.object({
  name: z.string(),
  size: z.number().max(MAX_FILE_SIZE_BYTES, 'Image size exceeds maximum limit of 10MB'),
  type: z.string().refine((type) => ALLOWED_IMAGE_TYPES.includes(type), {
    message: 'Unsupported format. Please upload JPG, PNG, WebP, or GIF',
  }),
});

export const IdentificationRequestSchema = z.object({
  image: z.string().min(20, 'Image data is required'),
  preferredCategory: z.enum(['birds', 'plants', 'insects', 'wildlife', 'auto']).default('auto'),
});

export const IdentificationResultSchema = z.object({
  commonName: z.string().min(1),
  scientificName: z.string().default('Species not resolved'),
  category: z.enum(['birds', 'plants', 'insects', 'wildlife']),
  shortDescription: z.string().min(1),
  distinguishingCharacteristics: z.array(z.string()).default([]),
  naturalHabitat: z.string().default('Forest, grasslands, or gardens'),
  interestingFacts: z.array(z.string()).default([]),
  confidenceScore: z.number().min(0).max(1).optional(),
  suggestedActivity: z.string().min(1),
  safetyNotes: z.string().optional(),
  identificationDisclaimer: z.string().min(1),
  modelUsed: z.string(),
  identifiedAt: z.string(),
});

export const JournalEntrySchema = z.object({
  id: z.string().uuid().or(z.string().min(5)),
  thumbnailUrl: z.string().min(10),
  fullImageUrl: z.string().optional(),
  identification: IdentificationResultSchema,
  category: z.enum(['birds', 'plants', 'insects', 'wildlife', 'auto']),
  date: z.string(),
  locationNotes: z.string().max(300).optional(),
  personalNotes: z.string().max(1000).optional(),
  tags: z.array(z.string()).optional(),
});

export function validateImageFile(file: File): { isValid: boolean; error?: string } {
  const result = ImageFileSchema.safeParse({
    name: file.name,
    size: file.size,
    type: file.type,
  });

  if (!result.success) {
    const errorMsg = result.error.errors[0]?.message || 'Invalid image file';
    return { isValid: false, error: errorMsg };
  }
  return { isValid: true };
}
