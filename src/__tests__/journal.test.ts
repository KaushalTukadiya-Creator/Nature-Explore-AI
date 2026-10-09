import { describe, it, expect, beforeEach } from 'vitest';
import {
  getJournalEntries,
  saveJournalEntry,
  deleteJournalEntry,
  filterJournalEntries,
} from '../services/journalService';
import { JournalEntry } from '../types/journal';

describe('Nature Journal Service', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const sampleEntry: JournalEntry = {
    id: 'test-1',
    thumbnailUrl: 'data:image/jpeg;base64,mockthumb',
    category: 'birds',
    date: new Date().toISOString(),
    personalNotes: 'Spotted by the river',
    identification: {
      commonName: 'Northern Cardinal',
      scientificName: 'Cardinalis cardinalis',
      category: 'birds',
      shortDescription: 'Brilliant red songbird',
      distinguishingCharacteristics: ['Red plumage', 'Pointed crest'],
      naturalHabitat: 'Dense brush',
      interestingFacts: ['Females sing too'],
      confidenceScore: 0.92,
      suggestedActivity: 'Listen for song',
      identificationDisclaimer: 'AI disclaimer',
      modelUsed: 'open-model-v1',
      identifiedAt: new Date().toISOString(),
    },
  };

  it('should start with empty journal', () => {
    expect(getJournalEntries()).toEqual([]);
  });

  it('should save and retrieve a journal entry', () => {
    saveJournalEntry(sampleEntry);
    const retrieved = getJournalEntries();
    expect(retrieved.length).toBe(1);
    expect(retrieved[0].identification.commonName).toBe('Northern Cardinal');
  });

  it('should filter entries by category and query', () => {
    saveJournalEntry(sampleEntry);
    const birds = filterJournalEntries([sampleEntry], 'birds', '');
    expect(birds.length).toBe(1);

    const insects = filterJournalEntries([sampleEntry], 'insects', '');
    expect(insects.length).toBe(0);

    const queryMatch = filterJournalEntries([sampleEntry], 'all', 'cardinal');
    expect(queryMatch.length).toBe(1);
  });

  it('should delete an entry by id', () => {
    saveJournalEntry(sampleEntry);
    deleteJournalEntry(sampleEntry.id);
    expect(getJournalEntries().length).toBe(0);
  });
});
