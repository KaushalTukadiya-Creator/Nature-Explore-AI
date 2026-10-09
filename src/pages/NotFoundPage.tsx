import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, MapPinOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-forest-100 text-forest-700 flex items-center justify-center mx-auto shadow-sm">
        <MapPinOff className="w-10 h-10" />
      </div>
      <h1 className="text-3xl font-extrabold text-sage-950 font-display">
        Trail Path Not Found
      </h1>
      <p className="text-sm text-sage-600 leading-relaxed">
        It seems you have wandered off the marked trail. Return to familiar territory to continue your nature journey.
      </p>

      <div className="pt-2 flex justify-center gap-3">
        <Link to="/">
          <Button variant="primary" className="gap-2">
            <Home className="w-4 h-4" />
            <span>Return to Camp (Home)</span>
          </Button>
        </Link>
        <Link to="/explore">
          <Button variant="outline" className="gap-2">
            <Compass className="w-4 h-4" />
            <span>Explore</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}
