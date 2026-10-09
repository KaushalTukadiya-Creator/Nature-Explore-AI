import { JournalEntry } from '@/types/journal';
import { NatureCategory } from '@/types/nature';

const JOURNAL_STORAGE_KEY = 'nature_explorer_journal_v1';

export function getJournalEntries(): JournalEntry[] {
  try {
    const raw = localStorage.getItem(JOURNAL_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch (err) {
    console.error('Failed to load journal entries from localStorage', err);
    return [];
  }
}

export function saveJournalEntry(entry: JournalEntry): JournalEntry[] {
  const current = getJournalEntries();
  // Prepend newest discovery
  const updated = [entry, ...current.filter((e) => e.id !== entry.id)];

  try {
    localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (err: any) {
    // If quota exceeded, attempt to strip any full resolution preview or keep only 30 entries
    console.warn('Storage quota warning, trimming stored thumbnails', err);
    const compactEntries = updated.slice(0, 25).map((e) => ({
      ...e,
      fullImageUrl: undefined, // remove full resolution
    }));
    try {
      localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(compactEntries));
      return compactEntries;
    } catch {
      throw new Error('Local browser storage is full. Please delete older journal entries to free up space.');
    }
  }

  return updated;
}

export function deleteJournalEntry(id: string): JournalEntry[] {
  const current = getJournalEntries();
  const filtered = current.filter((e) => e.id !== id);
  localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(filtered));
  return filtered;
}

export function filterJournalEntries(
  entries: JournalEntry[],
  categoryFilter: NatureCategory | 'all',
  searchQuery: string
): JournalEntry[] {
  const query = searchQuery.trim().toLowerCase();

  return entries.filter((entry) => {
    // Category match
    const matchesCategory =
      categoryFilter === 'all' || entry.category === categoryFilter;

    if (!matchesCategory) return false;

    // Search query match
    if (!query) return true;

    const common = entry.identification.commonName.toLowerCase();
    const scientific = entry.identification.scientificName.toLowerCase();
    const notes = (entry.personalNotes || '').toLowerCase();
    const habitat = (entry.identification.naturalHabitat || '').toLowerCase();

    return (
      common.includes(query) ||
      scientific.includes(query) ||
      notes.includes(query) ||
      habitat.includes(query)
    );
  });
}
