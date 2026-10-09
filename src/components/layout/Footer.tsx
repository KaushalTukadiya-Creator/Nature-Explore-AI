import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Github, Heart, Shield, Sparkles } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-sage-900 text-sage-200 border-t border-sage-800 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-sage-800/80">
          {/* Brand info */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-forest-600 flex items-center justify-center text-white">
                <Leaf className="w-5 h-5 text-emerald-200" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight font-display">
                Nature Explorer <span className="text-forest-400">AI</span>
              </span>
            </div>
            <p className="text-sm text-sage-300 leading-relaxed">
              Empowering people to step outside, observe local biodiversity, and reconnect with the living world through open-weight AI.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-forest-950/60 border border-forest-700/50 text-xs font-medium text-forest-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Hacktoberfest 2026 &bull; Touch Grass</span>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Explore</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/explore" className="text-sage-300 hover:text-white transition-colors">
                  AI Species Identification
                </Link>
              </li>
              <li>
                <Link to="/journal" className="text-sage-300 hover:text-white transition-colors">
                  Personal Discovery Journal
                </Link>
              </li>
              <li>
                <Link to="/activities" className="text-sage-300 hover:text-white transition-colors">
                  Outdoor Challenges &amp; Quests
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sage-300 hover:text-white transition-colors">
                  Open-Weight Models &amp; Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Safety & Ethics */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Ethics &amp; Safety</h4>
            <ul className="space-y-2.5 text-sm text-sage-300">
              <li className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-forest-400 shrink-0" />
                <span>Leave No Trace principles</span>
              </li>
              <li>Do not consume wild plants based on AI</li>
              <li>Observe wildlife at respectful distance</li>
              <li>Never collect protected specimens</li>
            </ul>
          </div>

          {/* Open source */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white mb-4">Open Source</h4>
            <p className="text-sm text-sage-300 mb-4 leading-relaxed">
              Built with open-source Vision Transformers, React, Node.js, and Tailwind CSS. Released under the MIT License.
            </p>
            <a
              href="https://github.com/KaushalTukadiya-Creator/Nature-Explore-AI"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-sage-800 text-white hover:bg-sage-700 text-sm font-medium transition-colors border border-sage-700/60"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repository</span>
            </a>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-sage-400 gap-4">
          <p>
            &copy; {new Date().getFullYear()} Nature Explorer AI. Built for outdoor observation and environmental education.
          </p>
          <p className="flex items-center gap-1.5">
            Designed with <Heart className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400" /> for nature enthusiasts worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
