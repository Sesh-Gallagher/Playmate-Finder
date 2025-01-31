import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useMatches } from '../hooks/useMatches';
import { useBadges } from '../hooks/useBadges';
import { useChildProfiles } from '../hooks/useChildProfiles';
import { ParentDashboard } from '../components/dashboard/ParentDashboard';

export function DashboardPage() {
  const navigate = useNavigate();
  const { pendingMatches } = useMatches();
  const { badges } = useBadges();
  const { profiles } = useChildProfiles();

  const menuItems = [
    {
      title: 'Profiles',
      description: 'Manage child profile and progress',
      action: () => navigate('/profiles'),
      count: profiles.length,
    },
    {
      title: 'Find Matches',
      description: 'Discover new playmates based on interests',
      action: () => navigate('/matches'),
      notification: pendingMatches.length,
    },
    {
      title: 'Playdates',
      description: 'Schedule and manage playdates',
      action: () => navigate('/playdates'),
    },
    {
      title: 'Game Center',
      description: 'Play games and earn rewards',
      action: () => navigate('/game-center'),
      highlight: true,
    },
    {
      title: 'Achievements',
      description: 'View earned badges and rewards',
      action: () => navigate('/achievements'),
      count: badges.length,
    },
  ];

  return <ParentDashboard menuItems={menuItems} />;
}