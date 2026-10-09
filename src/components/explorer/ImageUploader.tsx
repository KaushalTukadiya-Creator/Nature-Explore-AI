import React, { useRef, useState } from 'react';
import { UploadCloud, Image as ImageIcon, Sparkles, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ImageUploaderProps {
  onFileSelected: (file: File) => void;
  isLoading: boolean;
  onSampleSelected?: (url: string) => void;
}

export function ImageUploader({ onFileSelected, isLoading, onSampleSelected }: ImageUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const sampleImages = [
    {
      name: 'European Robin',
      category: 'Bird',
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Monarch Butterfly',
      category: 'Insect',
      url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Common Sunflower',
      category: 'Plant',
      url: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80',
    },
    {
      name: 'Seven-Spot Ladybug',
      category: 'Insect',
      url: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80',
    },
  ];

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      onFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const loadSample = async (sampleUrl: string) => {
    try {
      const res = await fetch(sampleUrl);
      const blob = await res.blob();
      const file = new File([blob], 'sample_nature_specimen.jpg', { type: 'image/jpeg' });
      onFileSelected(file);
    } catch (err) {
      console.error('Failed to load sample image', err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Drag & Drop Zone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={`relative rounded-3xl border-2 border-dashed p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragOver
            ? 'border-forest-600 bg-forest-50/70 scale-[1.01]'
            : 'border-sage-300 hover:border-forest-500 bg-white/70 hover:bg-sage-50/50'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          className="hidden"
          disabled={isLoading}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              onFileSelected(e.target.files[0]);
            }
          }}
        />

        <div className="mx-auto w-16 h-16 rounded-2xl bg-forest-100 text-forest-700 flex items-center justify-center mb-4 shadow-xs">
          <UploadCloud className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-bold text-sage-950 font-display">
          Drag and drop your nature photo here
        </h3>
        <p className="text-sm text-sage-600 mt-1 max-w-sm mx-auto">
          Or <span className="text-forest-700 font-semibold underline underline-offset-2">browse files</span> from your device (JPG, PNG, WebP up to 10MB)
        </p>

        <div className="mt-5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 text-sage-700 text-xs font-medium">
          <ImageIcon className="w-3.5 h-3.5" />
          <span>Clear close-ups in natural lighting provide best accuracy</span>
        </div>
      </div>

      {/* Preset Nature Samples for Instant Testing */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs text-sage-600 font-semibold">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-forest-600" />
            Or test instantly with verified sample specimens:
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {sampleImages.map((sample) => (
            <button
              key={sample.name}
              type="button"
              disabled={isLoading}
              onClick={() => loadSample(sample.url)}
              className="group text-left p-2 rounded-2xl bg-white border border-sage-200/80 hover:border-forest-500 hover:shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-forest-600"
            >
              <div className="aspect-video w-full rounded-xl overflow-hidden mb-2 bg-sage-100">
                <img
                  src={sample.url}
                  alt={sample.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="text-xs font-bold text-sage-900 group-hover:text-forest-700 truncate">
                {sample.name}
              </p>
              <p className="text-[10px] text-sage-500">{sample.category}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
