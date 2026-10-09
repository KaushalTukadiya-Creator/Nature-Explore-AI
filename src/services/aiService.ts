import { IdentificationResult, NatureCategory } from '@/types/nature';
import { ApiResponse, HealthCheckResponse, IdentificationResponseData } from '@/types/api';

const API_BASE = import.meta.env.VITE_API_URL || '';

export async function checkBackendHealth(): Promise<HealthCheckResponse> {
  const res = await fetch(`${API_BASE}/api/health`);
  if (!res.ok) {
    throw new Error(`Health check failed with status ${res.status}`);
  }
  return res.json();
}

export async function identifyNatureImage(
  imageDataUrl: string,
  preferredCategory: NatureCategory = 'auto'
): Promise<IdentificationResponseData> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 30000); // 30s timeout

  try {
    const response = await fetch(`${API_BASE}/api/identify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        image: imageDataUrl,
        preferredCategory,
      }),
      signal: controller.signal,
    });

    const data: ApiResponse<IdentificationResponseData> = await response.json();

    if (!response.ok || !data.success || !data.data) {
      const errorMessage = data.error || `Identification failed with status ${response.status}`;
      throw new Error(errorMessage);
    }

    return data.data;
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw new Error('Identification request timed out. Please try again with a smaller image or check network.');
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}
