import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Sparkles, ArrowRight, ShieldCheck, Camera, Feather, Trees } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28">
      {/* Decorative organic ambient gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-forest-200/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-amber-100/50 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading and CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-100 border border-forest-200/80 text-forest-800 text-xs sm:text-sm font-semibold tracking-wide shadow-xs">
              <span className="w-2 h-2 rounded-full bg-forest-600 animate-pulse" />
              <span>Hacktoberfest 2026 &bull; Touch Grass Edition</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-sage-950 tracking-tight leading-[1.1] font-display">
              Step Outside. <br />
              <span className="text-forest-700 font-editorial italic font-normal">Discover More.</span>
            </h1>

            <p className="text-lg sm:text-xl text-sage-700 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Reconnect with the outdoors. Use open-weight vision AI to identify wild birds, native plants, and fascinating insects right from your local park, hiking trail, or backyard.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <Link to="/explore" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto shadow-nature gap-2.5 px-7">
                  <Camera className="w-5 h-5 text-emerald-200" />
                  <span>Identify Something</span>
                </Button>
              </Link>
              <Link to="/activities" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 px-6">
                  <span>Explore Activities</span>
                  <ArrowRight className="w-4 h-4 text-forest-700" />
                </Button>
              </Link>
            </div>

            {/* Value Highlights */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-sage-200/80 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2 text-left">
                <Feather className="w-4 h-4 text-forest-600 shrink-0" />
                <span className="text-xs font-semibold text-sage-700">Open-Weight Vision</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <ShieldCheck className="w-4 h-4 text-forest-600 shrink-0" />
                <span className="text-xs font-semibold text-sage-700">100% Private &amp; Local</span>
              </div>
              <div className="flex items-center gap-2 text-left">
                <Trees className="w-4 h-4 text-forest-600 shrink-0" />
                <span className="text-xs font-semibold text-sage-700">Eco Ethics First</span>
              </div>
            </div>
          </div>

          {/* Right Column: Nature Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Card Showcase */}
              <div className="relative rounded-3xl overflow-hidden shadow-nature-lg border-4 border-white bg-sage-100">
                <img
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=900&q=80"
                  alt="European Robin perched gracefully on a forest moss branch"
                  className="w-full h-[380px] object-cover hover:scale-105 transition-transform duration-700"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sage-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full bg-forest-600/90 text-white text-[11px] font-bold tracking-wide uppercase">
                      Passerine Songbird
                    </span>
                    <span className="text-xs text-emerald-200 font-medium">96% AI Match</span>
                  </div>
                  <h3 className="text-xl font-bold font-display">European Robin</h3>
                  <p className="text-xs text-sage-200 italic font-editorial">Erithacus rubecula</p>
                </div>
              </div>

              {/* Floating Badge 1: Butterfly Observation */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-nature border border-sage-200/80 flex items-center gap-3 animate-in fade-in zoom-in-75 duration-300">
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  🦋
                </div>
                <div>
                  <p className="text-xs font-bold text-sage-900">Monarch Butterfly</p>
                  <p className="text-[11px] text-sage-500">Migratory Pollinator</p>
                </div>
              </div>

              {/* Floating Badge 2: Local Journal saved */}
              <div className="absolute -bottom-5 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-nature border border-sage-200/80 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-forest-100 text-forest-800 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-forest-700" />
                </div>
                <div>
                  <p className="text-xs font-bold text-sage-900">Journal Synchronized</p>
                  <p className="text-[11px] text-sage-500">Stored safely on device</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
