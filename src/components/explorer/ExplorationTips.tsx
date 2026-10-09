import React from 'react';
import { Camera, Sun, ZoomIn, ShieldAlert, HeartHandshake, Eye } from 'lucide-react';

export function ExplorationTips() {
  const tips = [
    {
      icon: Sun,
      title: 'Lighting Matters',
      text: 'Take photos with soft natural daylight. Early morning or late afternoon provides soft light without harsh shadows.',
    },
    {
      icon: ZoomIn,
      title: 'Capture Key Details',
      text: 'For plants, photograph leaf arrangement and flower centers. For birds, capture the beak shape and eye ring.',
    },
    {
      icon: Camera,
      title: 'Use Optical Zoom',
      text: 'Avoid approaching wildlife too closely. Use optical zoom to photograph birds and insects without disturbing their feeding.',
    },
    {
      icon: ShieldAlert,
      title: 'Never Touch Unknown Species',
      text: 'Do not handle unknown plants (especially mushrooms or sap-producing stems) or venomous insects.',
    },
  ];

  return (
    <div className="bg-sage-50/80 rounded-3xl border border-sage-200/80 p-6 sm:p-8 space-y-6">
      <div className="flex items-center gap-2.5">
        <Eye className="w-5 h-5 text-forest-700" />
        <h3 className="text-lg font-bold text-sage-950 font-display">
          Tips for Better Wildlife Identification
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tips.map((tip) => {
          const Icon = tip.icon;
          return (
            <div key={tip.title} className="p-4 rounded-2xl bg-white/80 border border-sage-200/60 space-y-2">
              <div className="flex items-center gap-2 text-forest-800 font-bold text-sm">
                <Icon className="w-4 h-4 text-forest-600 shrink-0" />
                <span>{tip.title}</span>
              </div>
              <p className="text-xs text-sage-600 leading-relaxed">{tip.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
