import React from 'react';
import { ShieldCheck, HelpCircle, AlertTriangle } from 'lucide-react';

export function ConfidenceIndicator({ score }: { score?: number }) {
  if (score === undefined || score === null) {
    return (
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sage-100 text-sage-700 text-xs font-semibold">
        <HelpCircle className="w-3.5 h-3.5" />
        <span>Classification Score: Not Reported</span>
      </div>
    );
  }

  const percentage = Math.round(score * 100);
  const isHigh = percentage >= 85;
  const isMedium = percentage >= 65 && percentage < 85;

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between text-xs font-bold">
        <span className="flex items-center gap-1.5">
          {isHigh ? (
            <ShieldCheck className="w-4 h-4 text-forest-700" />
          ) : isMedium ? (
            <ShieldCheck className="w-4 h-4 text-amber-600" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-orange-600" />
          )}
          <span className={isHigh ? 'text-forest-800' : isMedium ? 'text-amber-800' : 'text-orange-800'}>
            {isHigh ? 'High Confidence' : isMedium ? 'Moderate Match' : 'Tentative Observation'}
          </span>
        </span>
        <span className="text-sage-800 font-mono">{percentage}%</span>
      </div>

      <div className="w-full bg-sage-200 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isHigh ? 'bg-forest-600' : isMedium ? 'bg-amber-500' : 'bg-orange-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
