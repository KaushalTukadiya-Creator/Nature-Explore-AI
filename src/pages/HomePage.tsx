import React from 'react';
import { HeroSection } from '@/components/home/HeroSection';
import { FeatureCards } from '@/components/home/FeatureCards';
import { NatureStats } from '@/components/home/NatureStats';

export function HomePage() {
  return (
    <div className="space-y-4">
      <HeroSection />
      <FeatureCards />
      <NatureStats />
    </div>
  );
}
