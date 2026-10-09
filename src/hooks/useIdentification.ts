import { useState } from 'react';
import { NatureCategory, IdentificationResult } from '@/types/nature';
import { validateImageFile } from '@/lib/validation';
import { identifyNatureImage } from '@/services/aiService';

export function useIdentification() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [category, setCategory] = useState<NatureCategory>('auto');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<IdentificationResult | null>(null);
  const [modelInfo, setModelInfo] = useState<{ provider: string; model: string; processingTimeMs: number } | null>(null);

  const handleSelectFile = (file: File) => {
    setError(null);
    setResult(null);

    const validation = validateImageFile(file);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid file format');
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleIdentify = async () => {
    if (!previewUrl) {
      setError('Please select or capture a photograph first.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await identifyNatureImage(previewUrl, category);
      setResult(data.result);
      setModelInfo(data.meta);
    } catch (err: any) {
      setError(err?.message || 'Failed to identify the image. Please verify your connection or try another angle.');
    } finally {
      setIsLoading(false);
    }
  };

  const reset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setError(null);
    setModelInfo(null);
  };

  return {
    selectedFile,
    previewUrl,
    category,
    setCategory,
    isLoading,
    error,
    result,
    modelInfo,
    handleSelectFile,
    handleIdentify,
    reset,
  };
}
