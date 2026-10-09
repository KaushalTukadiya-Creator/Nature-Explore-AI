import React, { useState } from 'react';
import { Compass, AlertCircle, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';
import { useIdentification } from '@/hooks/useIdentification';
import { ImageUploader } from '@/components/explorer/ImageUploader';
import { ImagePreview } from '@/components/explorer/ImagePreview';
import { IdentificationResult } from '@/components/explorer/IdentificationResult';
import { ExplorationTips } from '@/components/explorer/ExplorationTips';
import { saveJournalEntry } from '@/services/journalService';
import { createThumbnail } from '@/lib/utils';
import { useToast } from '@/components/ui/toast';
import { Button } from '@/components/ui/button';

export function ExplorerPage() {
  const {
    previewUrl,
    category,
    setCategory,
    isLoading,
    error,
    result,
    handleSelectFile,
    handleIdentify,
    reset,
  } = useIdentification();

  const [isSaved, setIsSaved] = useState(false);
  const { toast } = useToast();

  const handleSaveToJournal = async (notes?: string) => {
    if (!result || !previewUrl) return;

    try {
      // Create lightweight thumbnail for localStorage
      const thumbnailUrl = await createThumbnail(previewUrl, 320, 0.75);

      saveJournalEntry({
        id: `discovery-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        thumbnailUrl,
        identification: result,
        category: result.category,
        date: new Date().toISOString(),
        personalNotes: notes,
      });

      setIsSaved(true);
      toast(`Saved "${result.commonName}" to your Nature Journal!`, 'success');
    } catch (err: any) {
      toast(err?.message || 'Failed to save to journal', 'error');
    }
  };

  const handleResetAll = () => {
    setIsSaved(false);
    reset();
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-bold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5" />
          <span>Open-Weight AI Vision</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-sage-950 tracking-tight font-display">
          Identify Wildlife &amp; Wild Flora
        </h1>
        <p className="text-sm sm:text-base text-sage-600 max-w-xl mx-auto">
          Upload an outdoor photograph to identify species, learn distinguishing traits, and discover safe ecological activities.
        </p>
      </div>

      {/* Error Banner with Retry */}
      {error && (
        <div className="p-4 sm:p-5 rounded-2xl bg-red-50 border border-red-200 text-red-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 animate-in fade-in">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={handleIdentify}
            disabled={isLoading}
            className="border-red-300 text-red-800 hover:bg-red-100 shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
            Retry Analysis
          </Button>
        </div>
      )}

      {/* Main Flow */}
      {!previewUrl && (
        <ImageUploader
          onFileSelected={(file) => {
            setIsSaved(false);
            handleSelectFile(file);
          }}
          isLoading={isLoading}
        />
      )}

      {previewUrl && !result && (
        <ImagePreview
          previewUrl={previewUrl}
          category={category}
          onCategoryChange={setCategory}
          onIdentify={handleIdentify}
          onReset={handleResetAll}
          isLoading={isLoading}
        />
      )}

      {result && previewUrl && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-forest-800 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-forest-600" />
              Identification Completed
            </span>
            <Button size="sm" variant="outline" onClick={handleResetAll}>
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
              Identify Another Specimen
            </Button>
          </div>

          <IdentificationResult
            result={result}
            previewUrl={previewUrl}
            onSaveToJournal={handleSaveToJournal}
            isSaved={isSaved}
          />
        </div>
      )}

      {/* Exploration Tips Section */}
      <ExplorationTips />
    </div>
  );
}
