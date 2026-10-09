import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, BookOpen, Sparkles, HelpCircle, Menu, X, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Explore & Identify', path: '/explore', icon: Compass },
    { label: 'My Journal', path: '/journal', icon: BookOpen },
    { label: 'Outdoor Activities', path: '/activities', icon: Sparkles },
    { label: 'About', path: '/about', icon: HelpCircle },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-cream-50/90 backdrop-blur-md border-b border-sage-200/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo and Brand */}
          <Link to="/" className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-forest-600 rounded-lg p-1">
            <div className="w-10 h-10 rounded-xl bg-forest-700 flex items-center justify-center text-white shadow-sm group-hover:bg-forest-800 transition-colors">
              <Leaf className="w-6 h-6 text-emerald-200" />
            </div>
            <div>
              <span className="text-xl font-bold text-sage-950 tracking-tight flex items-center gap-1.5 font-display">
                Nature Explorer <span className="text-forest-700 font-extrabold text-xs uppercase px-1.5 py-0.5 bg-forest-100 rounded-md">AI</span>
              </span>
              <span className="text-[11px] text-sage-500 font-medium block -mt-0.5">Touch Grass &bull; Hacktoberfest 2026</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? 'bg-forest-100/80 text-forest-900 font-semibold shadow-xs'
                      : 'text-sage-700 hover:text-sage-950 hover:bg-sage-100/70'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/explore">
              <Button size="md" className="gap-2 shadow-sm font-semibold">
                <Compass className="w-4 h-4 text-emerald-200" />
                Start Exploring
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-sage-700 hover:text-sage-950 hover:bg-sage-100 transition-colors"
              aria-label="Toggle Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-sage-200 bg-white/95 backdrop-blur-lg px-4 pt-3 pb-6 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    active
                      ? 'bg-forest-100 text-forest-900 font-semibold'
                      : 'text-sage-700 hover:bg-sage-50 hover:text-sage-950'
                  }`}
                >
                  {Icon && <Icon className="w-5 h-5 text-forest-600" />}
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-4 pt-3 border-t border-sage-100">
              <Link to="/explore" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full justify-center text-base py-3 font-semibold shadow-sm">
                  <Compass className="w-5 h-5 mr-2" />
                  Start Exploring
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
