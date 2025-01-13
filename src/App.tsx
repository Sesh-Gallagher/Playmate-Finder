import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProfileProvider } from './contexts/ProfileContext';
import { AuthProvider } from './contexts/AuthContext';
import { AuthGuard } from './components/auth/AuthGuard';
import { AdminGuard } from './components/admin/auth/AdminGuard';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { FindFriendsPage } from './pages/FindFriendsPage';
import { EventsPage } from './pages/EventsPage';
import { ProfilePage } from './pages/ProfilePage';
import { DashboardPage } from './pages/DashboardPage';
import { PlaydatePage } from './pages/PlaydatePage';
import { MessagePage } from './pages/MessagePage';
import { GameCenterPage } from './pages/GameCenterPage';
import { AchievementsPage } from './pages/AchievementsPage';
import { ProfilesPage } from './pages/ProfilesPage';
import { PlaydatesPage } from './pages/PlaydatesPage';
import { MatchesPage } from './pages/MatchesPage';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminProfilesPage } from './pages/admin/AdminProfilesPage';
import { AdminEventsPage } from './pages/admin/AdminEventsPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ProfileProvider>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              
              {/* Admin Routes */}
              <Route
                path="/admin/*"
                element={
                  <AdminGuard>
                    <Routes>
                      <Route path="/" element={<AdminDashboard />} />
                      <Route path="/profiles" element={<AdminProfilesPage />} />
                      <Route path="/events" element={<AdminEventsPage />} />
                      <Route path="/reports" element={<AdminReportsPage />} />
                      <Route path="/settings" element={<AdminSettingsPage />} />
                    </Routes>
                  </AdminGuard>
                }
              />

              {/* User Routes */}
              <Route
                path="/*"
                element={
                  <AuthGuard>
                    <>
                      <Header />
                      <main className="flex-1">
                        <Routes>
                          <Route path="/" element={<HomePage />} />
                          <Route path="/find-friends" element={<FindFriendsPage />} />
                          <Route path="/events" element={<EventsPage />} />
                          <Route path="/profile" element={<ProfilePage />} />
                          <Route path="/dashboard" element={<DashboardPage />} />
                          <Route path="/playdate/:id" element={<PlaydatePage />} />
                          <Route path="/messages/:id" element={<MessagePage />} />
                          <Route path="/game-center" element={<GameCenterPage />} />
                          <Route path="/achievements" element={<AchievementsPage />} />
                          <Route path="/profiles" element={<ProfilesPage />} />
                          <Route path="/playdates" element={<PlaydatesPage />} />
                          <Route path="/matches" element={<MatchesPage />} />
                          <Route path="*" element={<Navigate to="/dashboard" replace />} />
                        </Routes>
                      </main>
                      <Footer />
                    </>
                  </AuthGuard>
                }
              />
            </Routes>
          </div>
        </ProfileProvider>
      </Router>
    </AuthProvider>
  );
}