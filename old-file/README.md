# PlayMate Finder

A modern web application designed to help parents find and arrange playdates for their children in a safe, controlled environment. The platform facilitates connections between families, manages virtual and in-person events, and creates meaningful friendships for children.

## Features

- **Safe Friend Matching**: Algorithm-based matching system considering age, interests, and location
- **Virtual Playdates**: Built-in video chat for supervised virtual playdates
- **Event Management**: Organize and join both virtual and in-person playdate events
- **Secure Messaging**: In-app messaging system for parent communication
- **Profile Management**: Detailed child profiles with interests, hobbies, and achievements
- **Dashboard**: Comprehensive parent dashboard for activity monitoring

## Technology Stack

- **Frontend**:
  - React 18.3
  - TypeScript
  - Tailwind CSS for styling
  - React Router for navigation
  - Lucide React for icons

- **Backend**:
  - Server-Side Frameworks: Node.js with Express.js for creating REST APIs.
  - Database: MongoDB for profile and user management and
  - Redis for caching frequently accessed data like profile details or matchmaking results.
  - Authentication: JWT (JSON Web Tokens) for secure authentication and authorization.
  - Error Logging: Winston.
  - Notifications: Firebase Cloud Messaging (FCM).

- **Development Tools**:
  - Vite for build tooling
  - ESLint for code quality
  - PostCSS for CSS processing

## Getting Started

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

### Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd playmate-finder
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```
3.5 - https://playmate-finder.netlify.app/login alternatively 
4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── common/        # Shared components (Button, Card, etc.)
│   ├── dashboard/     # Dashboard-specific components
│   ├── events/        # Event-related components
│   ├── features/      # Feature showcase components
│   ├── home/          # Homepage components
│   ├── layout/        # Layout components (Header, Footer)
│   ├── matching/      # Friend matching components
│   ├── messages/      # Messaging components
│   └── profile/       # Profile management components
├── pages/             # Page components
├── types/             # TypeScript type definitions
└── utils/             # Utility functions and constants
```

## Development Highlights

### Successes
- Implemented a responsive design that works across all device sizes
- Created a modular component architecture for easy maintenance
- Built an intuitive user interface with consistent styling
- Integrated real-time messaging capabilities
- Developed a comprehensive matching system

 

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Best Practices

- Component-based architecture
- TypeScript for type safety
- Consistent code formatting
- Proper error handling
- Responsive design principles
- Accessibility considerations
- Performance optimization

## Security Features

- Secure parent-to-parent communication
- Profile verification system
- Activity monitoring
- Report system for inappropriate behavior
- Privacy controls for child profiles

## Future Enhancements

Better backend integration with the database

1. Video Chat Integration
   - WebRTC implementation
   - Screen sharing for activities
   - Recording capabilities for safety

2. Enhanced Safety Features
   - ID verification
   - Background checks
   - AI-powered content moderation

3. Activity Tracking
   - Detailed activity logs
   - Progress tracking
   - Achievement system

4. Community Features
   - Group activities
   - Parent forums
   - Resource sharing

