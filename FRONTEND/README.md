# Virtual Stock Trading App

A comprehensive virtual stock trading platform that allows users to practice trading with real market data without financial risk. Perfect for learning, practicing strategies, and competing with other traders.

## 🚀 Features

### 📊 Portfolio Management
- Real-time portfolio tracking and analytics
- Performance charts and metrics
- Asset allocation visualization
- Risk assessment tools

### 💹 Live Trading
- Paper trading simulation with virtual money
- Real-time market data integration
- Advanced order types (market, limit, stop)
- Trade history and analytics

### 📈 Market Analysis
- Interactive charts with technical indicators
- Market screener and stock search
- Watchlist management
- Real-time price updates

### 📰 Financial News
- Real-time financial news feed
- Market sentiment analysis
- Categorized news by sector
- Custom news preferences

### 🎓 Learning Center
- Comprehensive trading tutorials
- Beginner to advanced courses
- Interactive learning modules
- Progress tracking

### 🏆 Trading Competitions
- Weekly and monthly trading contests
- Leaderboards and rankings
- Prize pools and rewards
- Community challenges

## 🛠️ Technology Stack

- **Frontend**: React 19, Material-UI 7
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Routing**: React Router DOM 7
- **Notifications**: React Hot Toast
- **Build Tool**: Vite 6

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd virtual-stock-trading-app
```

2. Install dependencies
```bash
npm install --legacy-peer-deps
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📱 Pages & Features

### Public Pages
- **Landing Page** - Hero section with feature overview
- **Tutorials** - Learning center (publicly accessible)
- **Login/Register** - Authentication pages
- **About** - Platform information
- **Contact** - Support and contact information

### Protected Pages (Requires Authentication)
- **Dashboard** - Portfolio overview and trading metrics
- **Portfolio** - Detailed portfolio management
- **Trading** - Buy/sell interface
- **Market** - Market data and analysis
- **News** - Financial news feed
- **Competitions** - Trading contests and leaderboards
- **Profile** - User account management

## 🎨 Design System

### Color Scheme
- **Primary Green**: #00C853 (gains, success)
- **Error Red**: #FF1744 (losses, errors)
- **Background**: #f5f5f5
- **Text**: Material-UI default palette

### Components
- Material-UI components with custom theming
- Responsive design for all screen sizes
- Smooth animations and transitions
- Professional financial industry styling

## 🔧 Configuration

The app uses Vite for development and building. Key configuration files:

- `vite.config.js` - Vite configuration
- `package.json` - Dependencies and scripts
- `eslint.config.js` - ESLint configuration

### Data Source

This app now runs fully standalone with mock data. No backend is required. Any previous `VITE_API_BASE_URL` is ignored.

## 📊 Data Sources

Currently uses mock data for demonstration. In a production environment, you would integrate with:

- Real-time market data APIs (Alpha Vantage, IEX Cloud, etc.)
- Financial news APIs (NewsAPI, Financial Modeling Prep, etc.)
- User authentication services
- Database for portfolio and trade data

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deploy to Vercel/Netlify
The app is ready for deployment to static hosting platforms like Vercel or Netlify.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Happy Trading! 📈**