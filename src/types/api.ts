import { IdentificationResult } from './nature';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  details?: unknown;
}

export interface ApiError {
  error: string;
  code?: string;
  details?: unknown;
}

export interface HealthCheckResponse {
  status: 'healthy' | 'degraded';
  timestamp: string;
  modelProvider: string;
  modelName: string;
  hasApiToken: boolean;
  localModelConfigured?: boolean;
  environment: string;
}

export interface IdentificationResponseData {
  result: IdentificationResult;
  meta: {
    processingTimeMs: number;
    provider: string;
    model: string;
  };
}
