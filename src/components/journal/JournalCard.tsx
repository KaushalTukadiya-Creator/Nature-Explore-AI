import React, { useState } from 'react';
import { Trash2, ExternalLink, Calendar, MapPin, Sparkles, Feather } from 'lucide-react';
import { JournalEntry } from '@/types/journal';
import { formatJournalDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Dialog } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export interface JournalCardProps {
  entry: JournalEntry;
  onDelete: (id: string) => void;
  onOpenDetails: (entry: JournalEntry) => void;
}

export function JournalCard({ entry, onDelete, onOpenDetails }: JournalCardProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const categoryVariants: Record<string, 'forest' | 'sage' | 'amber' | 'blue' | 'purple'> = {
    birds: 'blue',
    plants: 'forest',
    insects: 'amber',
    wildlife: 'purple',
    auto: 'sage',
  };

  return (
    <>
      <div className="group bg-white rounded-2xl border border-sage-200/80 shadow-subtle hover:shadow-nature-lg transition-all duration-300 overflow-hidden flex flex-col justify-between">
        {/* Card Thumbnail */}
        <div
          onClick={() => onOpenDetails(entry)}
          className="relative aspect-[4/3] w-full overflow-hidden bg-sage-100 cursor-pointer"
        >
          <img
            src={entry.thumbnailUrl}
            alt={entry.identification.commonName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute top-3 left-3">
            <Badge variant={categoryVariants[entry.category] || 'forest'} className="capitalize shadow-xs">
              {entry.category}
            </Badge>
          </div>
          <div className="absolute inset-0 bg-sage-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span className="px-3 py-1.5 rounded-xl bg-white/95 text-sage-900 text-xs font-bold shadow-sm flex items-center gap-1.5">
              <ExternalLink className="w-3.5 h-3.5" />
              View Details
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-sage-500 mb-1">
              <Calendar className="w-3 h-3 text-sage-400" />
              <span>{formatJournalDate(entry.date)}</span>
            </div>
            <h3
              onClick={() => onOpenDetails(entry)}
              className="text-lg font-bold text-sage-950 group-hover:text-forest-700 transition-colors cursor-pointer truncate"
            >
              {entry.identification.commonName}
            </h3>
            <p className="text-xs text-sage-500 italic font-editorial truncate">
              {entry.identification.scientificName}
            </p>

            {entry.personalNotes && (
              <p className="text-xs text-sage-700 mt-2 line-clamp-2 italic bg-sage-50 p-2 rounded-lg border border-sage-200/50">
                &ldquo;{entry.personalNotes}&rdquo;
              </p>
            )}
          </div>

          {/* Action Row */}
          <div className="pt-2 border-t border-sage-100 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => onOpenDetails(entry)}
              className="text-forest-700 font-bold hover:text-forest-900 transition-colors flex items-center gap-1"
            >
              Full Profile &rarr;
            </button>
            <button
              type="button"
              onClick={() => setShowConfirmDelete(true)}
              className="p-1.5 rounded-lg text-sage-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              aria-label={`Delete discovery ${entry.identification.commonName}`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Dialog
        isOpen={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        title="Delete Discovery Entry?"
        description="Are you sure you want to delete this record from your local journal? This cannot be undone."
      >
        <div className="pt-4 flex items-center justify-end gap-3">
          <Button variant="outline" size="sm" onClick={() => setShowConfirmDelete(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              onDelete(entry.id);
              setShowConfirmDelete(false);
            }}
          >
            Yes, Delete Entry
          </Button>
        </div>
      </Dialog>
    </>
  );
}
