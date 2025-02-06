import { render, screen, waitFor } from '@testing-library/react';
import { AdminMetrics } from '../../components/admin/metrics/AdminMetrics';
import { adminService } from '../../services/admin';

jest.mock('../../services/admin');

describe('AdminMetrics', () => {
  beforeEach(() => {
    (adminService.getMetrics as jest.Mock).mockResolvedValue({
      activeProfiles: 150,
      recentMatches: 25,
      pendingVerifications: 10,
      flaggedActivities: 3,
      profileTrend: 5,
      matchTrend: 10,
      verificationTrend: -2,
      flaggedTrend: 1
    });
  });

  it('renders all metric cards', async () => {
    render(<AdminMetrics />);

    await waitFor(() => {
      expect(screen.getByText('Active Profiles')).toBeInTheDocument();
      expect(screen.getByText('Recent Matches')).toBeInTheDocument();
      expect(screen.getByText('Pending Verifications')).toBeInTheDocument();
      expect(screen.getByText('Flagged Activities')).toBeInTheDocument();
    });
  });

  it('displays correct metric values', async () => {
    render(<AdminMetrics />);

    await waitFor(() => {
      expect(screen.getByText('150')).toBeInTheDocument();
      expect(screen.getByText('25')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
    });
  });

  it('shows loading state initially', () => {
    render(<AdminMetrics />);
    expect(screen.getByText('Loading metrics...')).toBeInTheDocument();
  });

  it('handles error state', async () => {
    (adminService.getMetrics as jest.Mock).mockRejectedValue(new Error('Failed to load'));
    render(<AdminMetrics />);

    await waitFor(() => {
      expect(screen.getByText('Error loading metrics: Failed to load')).toBeInTheDocument();
    });
  });
});