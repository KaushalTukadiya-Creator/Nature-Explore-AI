import React, { useState } from 'react';
import { Bookmark, Sparkles, AlertTriangle, MapPin, Info, Compass, Check, ShieldAlert, Cpu } from 'lucide-react';
import { IdentificationResult as IIdentificationResult } from '@/types/nature';
import { ConfidenceIndicator } from './ConfidenceIndicator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import confetti from 'canvas-confetti';

export interface IdentificationResultProps {
  result: IIdentificationResult;
  previewUrl: string;
  onSaveToJournal: (notes?: string) => void;
  isSaved?: boolean;
}

export function IdentificationResult({
  result,
  previewUrl,
  onSaveToJournal,
  isSaved = false,
}: IdentificationResultProps) {
  const [personalNote, setPersonalNote] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    onSaveToJournal(personalNote);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#22c55e', '#15803d', '#86efac'],
      });
    } catch {}
    setIsSaving(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-sage-200/80 shadow-nature-lg overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 bg-forest-900 text-white relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Badge variant="forest" className="bg-forest-800 text-emerald-300 border-forest-700 capitalize">
                {result.category}
              </Badge>
              <span className="text-xs text-sage-300 font-mono flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5" />
                {result.modelUsed}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-white">
              {result.commonName}
            </h2>
            <p className="text-sm text-emerald-200 italic font-editorial">
              {result.scientificName}
            </p>
          </div>

          <div className="min-w-[140px]">
            <ConfidenceIndicator score={result.confidenceScore} />
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Short Description */}
        <p className="text-base text-sage-800 leading-relaxed font-normal">
          {result.shortDescription}
        </p>

        {/* Safety Warning if Present */}
        {result.safetyNotes && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-900 space-y-0.5">
              <p className="font-bold">Outdoor Safety Advisory:</p>
              <p>{result.safetyNotes}</p>
            </div>
          </div>
        )}

        {/* Grid: Characteristics & Habitat */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          {/* Distinguishing Characteristics */}
          <div className="p-5 rounded-2xl bg-sage-50/70 border border-sage-200/70 space-y-3">
            <h4 className="text-sm font-bold text-sage-950 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-forest-700" />
              Distinguishing Characteristics
            </h4>
            <ul className="space-y-2 text-xs text-sage-700">
              {result.distinguishingCharacteristics.map((char, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-forest-600 shrink-0 mt-1.5" />
                  <span>{char}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Natural Habitat */}
          <div className="p-5 rounded-2xl bg-sage-50/70 border border-sage-200/70 space-y-3">
            <h4 className="text-sm font-bold text-sage-950 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-forest-700" />
              Natural Habitat &amp; Range
            </h4>
            <p className="text-xs text-sage-700 leading-relaxed">
              {result.naturalHabitat}
            </p>
          </div>
        </div>

        {/* Interesting Facts */}
        {result.interestingFacts.length > 0 && (
          <div className="p-5 rounded-2xl bg-cream-100/70 border border-cream-200 space-y-3">
            <h4 className="text-sm font-bold text-sage-950 flex items-center gap-2">
              <Info className="w-4 h-4 text-amber-700" />
              Fascinating Ecological Facts
            </h4>
            <ul className="space-y-2 text-xs text-sage-700">
              {result.interestingFacts.map((fact, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-700 font-bold">&bull;</span>
                  <span>{fact}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Suggested Observation Activity */}
        <div className="p-5 rounded-2xl bg-forest-50/80 border border-forest-200 space-y-2">
          <h4 className="text-sm font-bold text-forest-950 flex items-center gap-2">
            <Compass className="w-4 h-4 text-forest-700" />
            Suggested Outdoor Activity
          </h4>
          <p className="text-xs text-forest-900 leading-relaxed">
            {result.suggestedActivity}
          </p>
        </div>

        {/* Save to Journal Form */}
        <div className="pt-4 border-t border-sage-200 space-y-3">
          <label className="text-xs font-bold text-sage-800 block">
            Add Field Notes for your Journal (optional):
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={personalNote}
              onChange={(e) => setPersonalNote(e.target.value)}
              placeholder="e.g. Observed on south branch near oak trees, brisk morning..."
              disabled={isSaved}
              className="flex-1 px-4 py-2.5 rounded-xl border border-sage-300 text-sm focus:outline-none focus:ring-2 focus:ring-forest-600 disabled:bg-sage-100"
            />
            <Button
              onClick={handleSave}
              disabled={isSaved || isSaving}
              variant={isSaved ? 'secondary' : 'primary'}
              className="px-6 font-semibold shrink-0"
            >
              {isSaved ? (
                <>
                  <Check className="w-4 h-4 mr-1.5 text-forest-600" />
                  Saved in Journal
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4 mr-1.5" />
                  Save Discovery
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="p-4 rounded-xl bg-sage-50 border border-sage-200 text-[11px] text-sage-600 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-sage-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-sage-800">Important Disclaimer:</strong> {result.identificationDisclaimer}
          </p>
        </div>
      </div>
    </div>
  );
}
