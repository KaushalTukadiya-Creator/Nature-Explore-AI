import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-cream-50 text-sage-900 bg-nature-grid">
      <Navbar />
      <main className="flex-1 w-full">{children}</main>
      <Footer />
    </div>
  );
}
