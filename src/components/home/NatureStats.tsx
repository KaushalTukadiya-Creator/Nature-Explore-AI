import React from 'react';
import { Link } from 'react-router-dom';
import { Trees, Compass, Bird, Bug, Flower2, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NatureStats() {
  const stats = [
    { label: 'Identified Species Categories', value: '4 Major Kingdoms', detail: 'Birds, Plants, Insects, Wildlife' },
    { label: 'Inference Privacy', value: '100% Local Journal', detail: 'Zero cloud tracking or user profiling' },
    { label: 'Open-Weight Architecture', value: 'Apache & MIT Models', detail: 'ViT, Swin, Qwen2-VL, Ollama ready' },
    { label: 'Hacktoberfest 2026', value: 'Touch Grass', detail: 'Dedicated to outdoor mindfulness & ecology' },
  ];

  return (
    <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
      {/* Discover the Wild Around You Section */}
      <div className="rounded-3xl bg-forest-900 text-white p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-nature-lg">
        {/* Subtle decorative circles */}
        <div className="absolute -right-20 -top-20 w-80 h-80 bg-forest-700/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-forest-800 text-emerald-300 text-xs font-bold uppercase tracking-wider">
              <Compass className="w-3.5 h-3.5" />
              Micro-Exploration
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display leading-tight">
              Discover the Wild Around You
            </h2>
            <p className="text-sage-200 text-base sm:text-lg leading-relaxed max-w-xl">
              You do not need to journey into a distant national park to experience biodiversity. A cracked sidewalk has pioneering moss; an urban hedgerow houses foraging songbirds; an oak leaf carries microscopic ecosystems.
            </p>

            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="p-3.5 rounded-2xl bg-forest-800/80 border border-forest-700 flex flex-col items-center text-center">
                <Bird className="w-6 h-6 text-emerald-300 mb-1" />
                <span className="text-sm font-bold">Avian Life</span>
                <span className="text-[11px] text-sage-300">Singers &amp; Migrants</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-forest-800/80 border border-forest-700 flex flex-col items-center text-center">
                <Flower2 className="w-6 h-6 text-emerald-300 mb-1" />
                <span className="text-sm font-bold">Flora</span>
                <span className="text-[11px] text-sage-300">Wildflowers &amp; Trees</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-forest-800/80 border border-forest-700 flex flex-col items-center text-center">
                <Bug className="w-6 h-6 text-emerald-300 mb-1" />
                <span className="text-sm font-bold">Insects</span>
                <span className="text-[11px] text-sage-300">Pollinators &amp; Crawlers</span>
              </div>
            </div>

            <div className="pt-2">
              <Link to="/explore">
                <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-forest-950 font-bold px-8 shadow-sm">
                  Start Discovering Today
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80"
                alt="Vibrant butterfly perched on wildflower"
                className="rounded-2xl object-cover h-48 w-full shadow-md"
              />
              <img
                src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=600&q=80"
                alt="Sunbeams filtering through tall emerald trees"
                className="rounded-2xl object-cover h-40 w-full shadow-md"
              />
            </div>
            <div className="space-y-4 pt-6">
              <img
                src="https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=600&q=80"
                alt="Morning dew on a botanical leaf"
                className="rounded-2xl object-cover h-40 w-full shadow-md"
              />
              <img
                src="https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=600&q=80"
                alt="Golden wildflower meadow in afternoon light"
                className="rounded-2xl object-cover h-48 w-full shadow-md"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats and Community Ethos Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s) => (
          <div key={s.label} className="p-6 rounded-2xl bg-white border border-sage-200/80 shadow-subtle hover:shadow-nature transition-shadow">
            <p className="text-2xl sm:text-3xl font-extrabold text-forest-800 font-display">{s.value}</p>
            <p className="text-sm font-semibold text-sage-900 mt-1">{s.label}</p>
            <p className="text-xs text-sage-500 mt-1">{s.detail}</p>
          </div>
        ))}
      </div>

      {/* Touch Grass Outdoor Challenge Invitation */}
      <div className="rounded-3xl bg-sage-100/70 border border-sage-200 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <h3 className="text-2xl font-bold text-sage-950 font-display">
            Take the 15-Minute Outdoor Challenge
          </h3>
          <p className="text-sm sm:text-base text-sage-700 max-w-xl">
            Step outside right now. Leave open tabs behind, observe the sky, touch a tree bark, and snap one photo of something living.
          </p>
        </div>
        <Link to="/activities" className="shrink-0">
          <Button size="lg" className="shadow-sm">
            View All 8 Quests
          </Button>
        </Link>
      </div>
    </section>
  );
}
