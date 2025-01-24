import React from 'react';
import { Hero } from '../components/home/Hero';
import { FeatureGrid } from '../components/features/FeatureGrid';

export function HomePage() {
  return (
    <div>
      <Hero />
      <FeatureGrid />
    </div>
  );
}