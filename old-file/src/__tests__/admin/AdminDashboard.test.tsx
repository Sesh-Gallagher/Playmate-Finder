import { render, screen, waitFor } from '@testing-library/react';
import { AdminDashboard } from '../../pages/admin/AdminDashboard';
import { adminService } from '../../services/admin';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../../contexts/AuthContext';

// Mock the admin service
jest.mock('../../services/admin');

describe('AdminDashboard', () => {
  beforeEach(() => {
    // Mock the service responses
    (adminService.getMetrics as jest.Mock).mockResolvedValue({
      activeProfiles: 100,
      pendingVerifications: 5,
      flaggedActivities: 2
    });
    
    (adminService.getSystemHealth as jest.Mock).mockResolvedValue({
      database: 'healthy',
      cache: 'healthy',
      timestamp: new Date()
    });
  });

  it('renders the dashboard with metrics', async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <AdminDashboard />
        </MemoryRouter>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('100')).toBeInTheDocument(); // Active profiles
      expect(screen.getByText('5')).toBeInTheDocument(); // Pending verifications
      expect(screen.getByText('2')).toBeInTheDocument(); // Flagged activities
    });
  });

  it('displays system health status', async () => {
    render(
      <AuthProvider>
        <MemoryRouter>
          <AdminDashboard />
        </MemoryRouter>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('System Status')).toBeInTheDocument();
      expect(screen.getByText('healthy')).toBeInTheDocument();
    });
  });
});