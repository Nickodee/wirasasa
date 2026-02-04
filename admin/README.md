# WiraSasa Admin Panel

A modern, feature-rich admin dashboard for managing the WiraSasa service marketplace platform.

## Features

### ✨ Core Features
- **Authentication** - Secure admin login with JWT tokens
- **Dark/Light Mode** - Toggle between themes with system preference detection
- **Dashboard Overview** - Real-time statistics and analytics
- **User Management** - View, edit, and manage clients and providers
- **Provider Verification** - Approve or reject provider registration requests
- **Job Management** - Monitor and manage all service jobs
- **Service Management** - Add, edit, and delete service categories
- **Payment Tracking** - View all transactions and payment statuses
- **Analytics** - Revenue charts and activity tracking
- **Responsive Design** - Works seamlessly on desktop and mobile

### 🎨 UI/UX Features
- Modern, clean interface with Tailwind CSS
- Smooth animations and transitions
- Toast notifications for user actions
- Loading states and skeleton screens
- Accessible components following WCAG guidelines
- Mobile-friendly responsive layout

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **State Management**: React Hooks

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Backend API running (default: http://localhost:5000)

### Installation

1. Navigate to the admin directory:
```bash
cd admin
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Update the `.env` file with your API URL:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:3001](http://localhost:3001) in your browser

### Default Admin Credentials
```
Email: admin@wirasasa.com
Password: admin123
```
(These should be configured in your backend)

## Project Structure

```
admin/
├── app/
│   ├── dashboard/          # Dashboard pages
│   │   ├── users/         # User management
│   │   ├── providers/     # Provider verification
│   │   ├── jobs/          # Job management
│   │   ├── services/      # Service management
│   │   ├── payments/      # Payment tracking
│   │   └── analytics/     # Analytics & reports
│   ├── login/             # Login page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── Sidebar.tsx       # Navigation sidebar
│   ├── Header.tsx        # Top header with theme toggle
│   ├── StatCard.tsx      # Statistics card component
│   └── ...
├── contexts/             # React contexts
│   └── ThemeContext.tsx  # Dark/Light mode context
├── lib/                  # Utilities
│   ├── api.ts           # API client & endpoints
│   └── types.ts         # TypeScript types
└── public/              # Static assets
```

## Available Scripts

- `npm run dev` - Start development server (port 3001)
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## API Integration

The admin panel connects to your WiraSasa backend API. Make sure to implement the following admin endpoints:

### Authentication
- `POST /api/v1/auth/login` - Admin login

### Dashboard
- `GET /api/v1/admin/stats` - Dashboard statistics

### Users
- `GET /api/v1/admin/users` - List all users
- `GET /api/v1/admin/users/:id` - Get user details
- `PUT /api/v1/admin/users/:id` - Update user
- `DELETE /api/v1/admin/users/:id` - Delete user

### Providers
- `GET /api/v1/admin/verifications/pending` - Pending verifications
- `PUT /api/v1/admin/verifications/:id` - Approve/reject provider

### Jobs
- `GET /api/v1/admin/jobs` - List all jobs
- `GET /api/v1/admin/jobs/:id` - Get job details
- `PUT /api/v1/admin/jobs/:id` - Update job

### Services
- `GET /api/v1/admin/services` - List services
- `POST /api/v1/admin/services` - Create service
- `PUT /api/v1/admin/services/:id` - Update service
- `DELETE /api/v1/admin/services/:id` - Delete service

### Payments
- `GET /api/v1/admin/payments` - List payments
- `GET /api/v1/admin/payments/:id` - Get payment details

### Analytics
- `GET /api/v1/admin/analytics?period=7d` - Get analytics data

## Customization

### Theme Colors
Edit `tailwind.config.js` to customize the color scheme:
```js
theme: {
  extend: {
    colors: {
      primary: { /* your colors */ },
    },
  },
}
```

### Adding New Pages
1. Create a new file in `app/dashboard/your-page/page.tsx`
2. Add navigation item in `components/Sidebar.tsx`
3. Implement your page component

## Deployment

### Vercel (Recommended)
```bash
npm run build
vercel deploy
```

### Docker
```bash
docker build -t wirasasa-admin .
docker run -p 3001:3001 wirasasa-admin
```

### Traditional Hosting
```bash
npm run build
npm start
```

## Security Considerations

- JWT tokens are stored in localStorage
- All API requests include Authorization header
- Admin routes are protected with authentication checks
- Input validation on all forms
- XSS protection through React's built-in escaping

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

When adding new features:
1. Follow the existing code structure
2. Use TypeScript for type safety
3. Add proper error handling
4. Test on both light and dark themes
5. Ensure mobile responsiveness

## License

This admin panel is part of the WiraSasa project.

## Support

For issues or questions, contact the development team.
