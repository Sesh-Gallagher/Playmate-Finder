/** 
The `AdminSidebar` component renders a sidebar navigation menu for the admin section of the application. It displays a list of navigation items, each with an icon and a label, that link to different admin-related pages. The sidebar is positioned on the left side of the screen and has a fixed width of 64 pixels. The navigation items are rendered using the `NavLink` component from the `react-router-dom` library, which automatically applies an active state class when the current URL matches the item's path.
*/
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  Flag,
  Settings,
  AlertCircle,
  Bell,
  FileText
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
  { icon: Users, label: 'Profiles', path: '/admin/profiles' },
  { icon: Calendar, label: 'Events', path: '/admin/events' },
  { icon: Flag, label: 'Reports', path: '/admin/reports' },
  { icon: AlertCircle, label: 'Issues', path: '/admin/issues' },
  { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
  { icon: FileText, label: 'Logs', path: '/admin/logs' },
  { icon: Settings, label: 'Settings', path: '/admin/settings' },
];

export function AdminSidebar() {
  return (
    <aside className="w-64 bg-white shadow-sm min-h-screen">
      <nav className="px-4 py-6">
        <ul className="space-y-2">
          {navItems.map(({ icon: Icon, label, path }) => (
            <li key={path}>
              <NavLink
                to={path}
                className={({ isActive }) =>
                  `flex items-center px-4 py-2 rounded-lg ${
                    isActive
                      ? 'bg-purple-50 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`
                }
              >
                <Icon className="h-5 w-5 mr-3" />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
