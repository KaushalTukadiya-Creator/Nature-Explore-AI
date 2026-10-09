import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, BookOpen, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EmptyJournal({ hasFilters = false }: { hasFilters?: boolean }) {
  if (hasFilters) {
    return (
      <div className="text-center py-16 px-4 bg-white/70 rounded-3xl border border-sage-200/80 max-w-lg mx-auto">
        <div className="w-14 h-14 rounded-2xl bg-sage-100 text-sage-600 flex items-center justify-center mx-auto mb-4">
          <BookOpen className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-sage-950 font-display">No Matches Found</h3>
        <p className="text-xs sm:text-sm text-sage-600 mt-1">
          Try clearing your search query or switching to another category filter.
        </p>
      </div>
    );
  }

  return (
    <div className="text-center py-20 px-6 bg-white/80 rounded-3xl border border-sage-200/80 max-w-xl mx-auto shadow-sm">
      <div className="w-16 h-16 rounded-3xl bg-forest-100 text-forest-700 flex items-center justify-center mx-auto mb-5 shadow-xs">
        <BookOpen className="w-8 h-8" />
      </div>
      <h3 className="text-2xl font-bold text-sage-950 font-display">
        Your Nature Journal is Waiting
      </h3>
      <p className="text-sm text-sage-600 mt-2 max-w-md mx-auto leading-relaxed">
        You haven&rsquo;t saved any outdoor discoveries yet. Step outside, photograph a bird, flower, or insect, and add your first specimen!
      </p>

      <div className="mt-8 flex justify-center">
        <Link to="/explore">
          <Button size="lg" className="shadow-nature gap-2">
            <Compass className="w-4 h-4 text-emerald-200" />
            <span>Identify Your First Specimen</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
