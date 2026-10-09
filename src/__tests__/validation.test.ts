import { describe, it, expect } from 'vitest';
import { validateImageFile, ImageFileSchema, IdentificationResultSchema } from '../lib/validation';

describe('Image File Validation', () => {
  it('should accept valid JPG and PNG files within 10MB', () => {
    const validFile = new File(['mock content'], 'songbird.jpg', { type: 'image/jpeg' });
    const res = validateImageFile(validFile);
    expect(res.isValid).toBe(true);
    expect(res.error).toBeUndefined();
  });

  it('should reject unsupported file types like PDF or text', () => {
    const invalidFile = new File(['mock content'], 'notes.pdf', { type: 'application/pdf' });
    const res = validateImageFile(invalidFile);
    expect(res.isValid).toBe(false);
    expect(res.error).toContain('Unsupported format');
  });

  it('should validate structured identification result schema', () => {
    const mockResult = {
      commonName: 'European Robin',
      scientificName: 'Erithacus rubecula',
      category: 'birds',
      shortDescription: 'A friendly songbird with a bright orange-red breast.',
      distinguishingCharacteristics: ['Orange breast', 'Large dark eyes'],
      naturalHabitat: 'Woodlands and gardens',
      interestingFacts: ['Sing throughout winter'],
      confidenceScore: 0.95,
      suggestedActivity: 'Listen for its song at dusk',
      identificationDisclaimer: 'AI identifications may make mistakes.',
      modelUsed: 'google/vit-base-patch16-224',
      identifiedAt: new Date().toISOString(),
    };

    const parsed = IdentificationResultSchema.safeParse(mockResult);
    expect(parsed.success).toBe(true);
  });
});
