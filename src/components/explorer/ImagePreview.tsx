import React from 'react';
import { RotateCcw, Sparkles, Bird, Flower2, Bug, Trees, Wand2 } from 'lucide-react';
import { NatureCategory } from '@/types/nature';
import { Button } from '@/components/ui/button';

export interface ImagePreviewProps {
  previewUrl: string;
  category: NatureCategory;
  onCategoryChange: (cat: NatureCategory) => void;
  onIdentify: () => void;
  onReset: () => void;
  isLoading: boolean;
}

export function ImagePreview({
  previewUrl,
  category,
  onCategoryChange,
  onIdentify,
  onReset,
  isLoading,
}: ImagePreviewProps) {
  const categoryOptions: { id: NatureCategory; label: string; icon: React.ElementType }[] = [
    { id: 'auto', label: 'Auto Detect', icon: Wand2 },
    { id: 'birds', label: 'Birds', icon: Bird },
    { id: 'plants', label: 'Plants & Flora', icon: Flower2 },
    { id: 'insects', label: 'Insects', icon: Bug },
    { id: 'wildlife', label: 'Other Wildlife', icon: Trees },
  ];

  return (
    <div className="bg-white rounded-3xl border border-sage-200/80 p-6 sm:p-8 shadow-nature space-y-6">
      {/* Image Preview & Change Controls */}
      <div className="relative rounded-2xl overflow-hidden bg-sage-100 max-h-[460px] flex items-center justify-center border border-sage-200">
        <img
          src={previewUrl}
          alt="Uploaded nature subject"
          className="w-full h-auto max-h-[460px] object-contain"
        />

        <div className="absolute top-4 right-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            disabled={isLoading}
            className="shadow-sm bg-white/90 backdrop-blur-sm text-sage-800 border-sage-300"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Change Photo
          </Button>
        </div>
      </div>

      {/* Category Selection Filter */}
      <div className="space-y-3">
        <label className="text-sm font-bold text-sage-900 block">
          Observation Category:
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {categoryOptions.map((opt) => {
            const Icon = opt.icon;
            const isSelected = category === opt.id;
            return (
              <button
                key={opt.id}
                type="button"
                disabled={isLoading}
                onClick={() => onCategoryChange(opt.id)}
                className={`flex flex-col sm:flex-row items-center justify-center gap-2 p-3 rounded-xl border text-xs font-semibold transition-all ${
                  isSelected
                    ? 'border-forest-600 bg-forest-50 text-forest-900 shadow-xs ring-1 ring-forest-500'
                    : 'border-sage-200 bg-white text-sage-700 hover:bg-sage-50 hover:border-sage-300'
                }`}
              >
                <Icon className={`w-4 h-4 ${isSelected ? 'text-forest-700' : 'text-sage-500'}`} />
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Action CTA */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-sage-100">
        <p className="text-xs text-sage-500 text-center sm:text-left">
          Image will be analyzed by open-weight vision transformers on the backend.
        </p>

        <Button
          size="lg"
          onClick={onIdentify}
          isLoading={isLoading}
          disabled={isLoading}
          className="w-full sm:w-auto px-8 font-bold shadow-nature"
        >
          <Sparkles className="w-5 h-5 mr-2 text-emerald-200" />
          {isLoading ? 'Analyzing Features...' : 'Identify with AI'}
        </Button>
      </div>
    </div>
  );
}
