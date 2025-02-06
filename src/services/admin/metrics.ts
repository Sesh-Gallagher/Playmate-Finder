// Temporary mock data until backend is implemented
export async function fetchAdminMetrics() {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  return {
    activeProfiles: 1250,
    recentMatches: 85,
    pendingVerifications: 23,
    flaggedActivities: 5,
    profileTrend: 12,
    matchTrend: 8,
    verificationTrend: -15,
    flaggedTrend: 25,
    activityData: [
      {
        date: '2024-03-01',
        profiles: 1200,
        matches: 75,
        events: 25
      },
      // Add more historical data points
    ]
  };
}