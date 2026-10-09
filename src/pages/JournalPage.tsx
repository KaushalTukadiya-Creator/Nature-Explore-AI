import React, { useState, useEffect } from 'react';
import { BookOpen, Search, Filter, Bird, Flower2, Bug, Sparkles, X, Calendar, MapPin, ShieldAlert, Cpu } from 'lucide-react';
import { JournalEntry } from '@/types/journal';
import { NatureCategory } from '@/types/nature';
import { getJournalEntries, deleteJournalEntry, filterJournalEntries } from '@/services/journalService';
import { JournalCard } from '@/components/journal/JournalCard';
import { EmptyJournal } from '@/components/journal/EmptyJournal';
import { Dialog } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ConfidenceIndicator } from '@/components/explorer/ConfidenceIndicator';
import { formatJournalDate } from '@/lib/utils';
import { useToast } from '@/components/ui/toast';

export function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<NatureCategory | 'all'>('all');
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    setEntries(getJournalEntries());
  }, []);

  const handleDelete = (id: string) => {
    const updated = deleteJournalEntry(id);
    setEntries(updated);
    toast('Entry removed from your Nature Journal', 'info');
  };

  const filteredEntries = filterJournalEntries(entries, activeCategory, searchQuery);

  const categories: { id: NatureCategory | 'all'; label: string; icon?: React.ElementType }[] = [
    { id: 'all', label: 'All Discoveries' },
    { id: 'birds', label: 'Birds', icon: Bird },
    { id: 'plants', label: 'Plants', icon: Flower2 },
    { id: 'insects', label: 'Insects', icon: Bug },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-sage-200">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Personal Nature Log</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-sage-950 tracking-tight font-display">
            My Nature Journal
          </h1>
          <p className="text-sm text-sage-600 mt-1">
            {entries.length} saved {entries.length === 1 ? 'discovery' : 'discoveries'} stored securely on this device.
          </p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-sage-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search common or scientific..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-sage-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 placeholder:text-sage-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sage-400 hover:text-sage-700"
              aria-label="Clear search query"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      {entries.length > 0 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Filter className="w-4 h-4 text-sage-400 shrink-0 mr-1" />
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-forest-800 text-white shadow-xs'
                    : 'bg-white border border-sage-200 text-sage-700 hover:bg-sage-50'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Content Grid or Empty States */}
      {entries.length === 0 ? (
        <EmptyJournal hasFilters={false} />
      ) : filteredEntries.length === 0 ? (
        <EmptyJournal hasFilters={true} />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredEntries.map((entry) => (
            <JournalCard
              key={entry.id}
              entry={entry}
              onDelete={handleDelete}
              onOpenDetails={setSelectedEntry}
            />
          ))}
        </div>
      )}

      {/* Full Discovery Detail Modal */}
      {selectedEntry && (
        <Dialog
          isOpen={Boolean(selectedEntry)}
          onClose={() => setSelectedEntry(null)}
          title={selectedEntry.identification.commonName}
          description={selectedEntry.identification.scientificName}
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="space-y-5 pt-2">
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-sage-100">
              <img
                src={selectedEntry.thumbnailUrl}
                alt={selectedEntry.identification.commonName}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-sage-500 pb-2 border-b border-sage-100">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-forest-700" />
                Observed on {formatJournalDate(selectedEntry.date)}
              </span>
              <span className="flex items-center gap-1.5 font-mono">
                <Cpu className="w-3.5 h-3.5 text-sage-400" />
                {selectedEntry.identification.modelUsed}
              </span>
            </div>

            <p className="text-sm text-sage-800 leading-relaxed">
              {selectedEntry.identification.shortDescription}
            </p>

            {selectedEntry.personalNotes && (
              <div className="p-3.5 rounded-xl bg-forest-50/70 border border-forest-200/60 text-xs text-forest-900 space-y-1">
                <span className="font-bold">Your Field Notes:</span>
                <p className="italic">&ldquo;{selectedEntry.personalNotes}&rdquo;</p>
              </div>
            )}

            <div className="space-y-2">
              <h4 className="text-xs font-bold text-sage-950 uppercase tracking-wider">
                Distinguishing Characteristics:
              </h4>
              <ul className="space-y-1.5 text-xs text-sage-700">
                {selectedEntry.identification.distinguishingCharacteristics.map((c, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-forest-600 mt-1.5 shrink-0" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-3.5 rounded-xl bg-sage-50 border border-sage-200/60 text-xs text-sage-700 space-y-1">
              <span className="font-bold text-sage-900">Natural Habitat:</span>
              <p>{selectedEntry.identification.naturalHabitat}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedEntry(null)}
                className="px-4 py-2 rounded-xl bg-sage-100 hover:bg-sage-200 text-sage-800 text-xs font-semibold transition-colors"
              >
                Close Profile
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </div>
  );
}
