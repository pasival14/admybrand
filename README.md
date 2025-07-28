# AdMyBrand Analytics Dashboard

A modern, responsive analytics dashboard built with Next.js 14+ and shadcn/ui, designed for digital marketing agencies to track and visualize key performance metrics.

![AdMyBrand Analytics Dashboard](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-0.0.0-000000?style=for-the-badge)

## 🚀 Features

### 📊 Core Analytics

- **Key Metrics Cards** - Revenue, Users, Conversions, and Growth tracking
- **Interactive Charts** - Line, Bar, Pie/Donut charts with real-time data
- **Advanced Data Table** - Sortable, filterable, and paginated data display
- **Real-time Updates** - Simulated live data updates with smooth animations

### 🎨 Modern UI/UX

- **Responsive Design** - Perfect on desktop, tablet, and mobile devices
- **Dark/Light Mode** - Toggle between themes with system preference detection
- **Smooth Animations** - Micro-interactions and hover effects throughout
- **Loading Skeletons** - Beautiful loading states for all components

### 📱 Mobile-First Design

- **Mobile Navigation** - Collapsible sidebar with burger menu
- **Touch-Friendly** - Optimized for mobile interactions
- **Responsive Charts** - Charts that adapt to screen size
- **Mobile-Optimized Layout** - Stacked layouts for smaller screens

### 🔧 Advanced Features

- **Export Functionality** - CSV, PDF, and JSON export options
- **Advanced Filters** - Date ranges, status, category, and amount filters
- **Search & Filter** - Real-time search across all data
- **Notification System** - Toast notifications with auto-dismiss

## 🛠️ Tech Stack

### Frontend

- **Next.js 14+** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library

### Charts & Visualization

- **Recharts** - Interactive chart library
- **Dynamic Imports** - Client-side rendering for charts
- **Responsive Containers** - Charts that adapt to screen size

### State Management

- **React Hooks** - useState, useEffect, useMemo
- **Context API** - Theme and notification management
- **Error Boundaries** - Graceful error handling

### Development Tools

- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/admybrand-analytics.git
   cd admybrand-analytics
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Environment Setup

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_APP_NAME=AdMyBrand Analytics
NEXT_PUBLIC_APP_VERSION=1.0.0
```

## 🏗️ Project Structure

```
admybrand-analytics/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Main dashboard
│   │   ├── analytics/         # Analytics page
│   │   ├── reports/           # Reports page
│   │   ├── documents/         # Documents page
│   │   ├── messages/          # Messages page
│   │   ├── api/               # API documentation page
│   │   └── settings/          # Settings page
│   ├── components/            # Reusable components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── charts/           # Chart components
│   │   ├── dashboard/        # Dashboard-specific components
│   │   └── data-table/       # Data table components
│   ├── data/                 # Mock data and constants
│   └── lib/                  # Utility functions
├── public/                   # Static assets
├── tailwind.config.js        # Tailwind configuration
└── package.json              # Dependencies and scripts
```

## 🎯 Key Components

### Dashboard Components

- `KeyMetricCard` - Displays individual metrics with trends
- `AnimatedChartCard` - Wrapper for interactive charts
- `AdvancedDataTable` - Feature-rich data table
- `RealTimeUpdates` - Live data simulation
- `Filters` - Advanced filtering system
- `ExportButton` - Data export functionality

### Chart Components

- `InteractivePieChart` - Interactive pie/donut chart
- `CampaignBarChart` - Bar chart for campaign performance
- `UserEngagementAreaChart` - Area chart for user engagement
- `DonutChart` - Product sales breakdown

### UI Components

- `MobileNav` - Mobile navigation sidebar
- `ThemeToggle` - Dark/light mode toggle
- `NotificationProvider` - Global notification system
- `LoadingSkeleton` - Loading state components

## 🚀 Deployment

### Vercel (Recommended)

1. **Push to GitHub**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**

   - Connect your GitHub repository to Vercel
   - Vercel will automatically detect Next.js
   - Deploy with zero configuration

3. **Environment Variables**
   Add your environment variables in the Vercel dashboard

### Other Platforms

#### Netlify

```bash
npm run build
# Deploy the 'out' directory
```

#### Railway

```bash
railway login
railway init
railway up
```

## 📊 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## 🎨 Customization

### Theme Configuration

The dashboard supports both light and dark themes. Customize colors in `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      // Your custom color palette
    }
  }
}
```

### Adding New Charts

1. Create a new chart component in `src/components/charts/`
2. Use Recharts library for consistency
3. Implement responsive design
4. Add to the dashboard layout

### Adding New Pages

1. Create a new directory in `src/app/`
2. Add `page.tsx` with your content
3. Update the sidebar navigation
4. Add mobile navigation support

## 🔧 Configuration

### Tailwind CSS

The project uses Tailwind CSS with custom configuration for:

- Dark mode support
- Custom color palette
- Responsive breakpoints
- Animation utilities

### shadcn/ui

Components are built using shadcn/ui for:

- Consistent design system
- Accessibility features
- TypeScript support
- Easy customization

## 📱 Mobile Responsiveness

The dashboard is fully responsive with:

- **Mobile-first design** approach
- **Collapsible sidebar** on mobile
- **Touch-friendly** interactions
- **Optimized charts** for small screens
- **Responsive typography** and spacing

## 🧪 Testing

### Manual Testing Checklist

- [ ] Dashboard loads correctly
- [ ] Charts render without errors
- [ ] Dark/light mode toggle works
- [ ] Mobile navigation functions
- [ ] Data table sorting/filtering
- [ ] Export functionality
- [ ] Responsive design on all screen sizes

## 🐛 Troubleshooting

### Common Issues

**Charts not rendering**

- Ensure Recharts is installed: `npm install recharts`
- Check for hydration errors in console
- Verify dynamic imports are working

**Mobile navigation issues**

- Check if MobileNav component is imported
- Verify sidebar is hidden on mobile: `hidden md:block`
- Ensure proper z-index for mobile menu

**Theme toggle not working**

- Verify ThemeProvider is wrapping the app
- Check if next-themes is installed
- Ensure suppressHydrationWarning is set

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing React framework
- **shadcn/ui** - For the beautiful component library
- **Recharts** - For the interactive chart library
- **Tailwind CSS** - For the utility-first CSS framework

## 📞 Support

If you have any questions or need help:

- Create an issue on GitHub
- Check the documentation
- Review the troubleshooting section

---

**Built with ❤️ for AdMyBrand Analytics Dashboard**
