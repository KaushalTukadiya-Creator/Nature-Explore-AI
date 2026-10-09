import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, BookMarked, Mountain, ArrowUpRight, Cpu, Eye, Leaf } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export function FeatureCards() {
  const features = [
    {
      title: 'Open-Weight AI Vision',
      category: 'Instant Recognition',
      description: 'Snap or upload any outdoor photograph to identify birds, flowers, trees, and insects using open-weight Vision Transformers with zero vendor lock-in.',
      icon: Camera,
      link: '/explore',
      badge: 'Vision Transformers',
      gradient: 'from-emerald-500/10 to-forest-600/10',
      iconBg: 'bg-forest-100 text-forest-700',
    },
    {
      title: 'Personal Nature Journal',
      category: 'Private & Offline',
      description: 'Record your outdoor discoveries with timestamps, field notes, and ecological habitats. All entries persist in local storage with zero tracking or telemetry.',
      icon: BookMarked,
      link: '/journal',
      badge: 'Local Persistence',
      gradient: 'from-sage-500/10 to-forest-600/10',
      iconBg: 'bg-sage-100 text-sage-800',
    },
    {
      title: 'Outdoor Exploration Quests',
      category: 'Screen-Free Adventures',
      description: 'Complete hands-on outdoor challenges: trace leaf margins, map local soundscapes, identify birds, and disconnect from stressful screen notifications.',
      icon: Mountain,
      link: '/activities',
      badge: 'Touch Grass Quests',
      gradient: 'from-amber-500/10 to-orange-600/10',
      iconBg: 'bg-amber-100 text-amber-800',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white/60 border-y border-sage-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-100 text-forest-800 text-xs font-bold uppercase tracking-wider mb-3">
            <Leaf className="w-3.5 h-3.5" />
            Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-sage-950 tracking-tight font-display">
            Built for Genuine Outdoor Curiosity
          </h2>
          <p className="text-sage-600 mt-3 text-base sm:text-lg">
            Technology designed to guide your eyes away from the screen and back toward the intricate living patterns of nature.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Link key={feature.title} to={feature.link} className="group">
                <Card className="h-full hover:-translate-y-1.5 hover:shadow-nature-lg hover:border-forest-400 transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.gradient} rounded-bl-full pointer-events-none`} />

                  <CardHeader>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`w-12 h-12 rounded-2xl ${feature.iconBg} flex items-center justify-center transition-transform group-hover:scale-110 duration-200`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-sage-100 text-sage-700 border border-sage-200">
                        {feature.badge}
                      </span>
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-forest-700">
                      {feature.category}
                    </span>
                    <CardTitle className="group-hover:text-forest-800 transition-colors mt-1">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <CardDescription className="text-sage-600 leading-relaxed text-sm">
                      {feature.description}
                    </CardDescription>

                    <div className="pt-2 flex items-center text-xs font-bold text-forest-700 group-hover:text-forest-900 group-hover:translate-x-1 transition-all">
                      <span>Explore this feature</span>
                      <ArrowUpRight className="w-4 h-4 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
