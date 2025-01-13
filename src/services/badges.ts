import { Badge } from '../types';
import { SAMPLE_BADGES } from '../data/sampleData';

export async function getBadges(): Promise<Badge[]> {
  return SAMPLE_BADGES;
}

export async function getBadgeById(id: string): Promise<Badge | null> {
  const badge = SAMPLE_BADGES.find(b => b.id === id);
  return badge || null;
}

export async function awardBadge(profileId: string, badgeId: string): Promise<void> {
  // In a real app, this would update the database
  console.log(`Awarded badge ${badgeId} to profile ${profileId}`);
}