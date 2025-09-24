// Enhanced Mock data and local storage for standalone frontend
import axios from 'axios';
const MOCK_STOCKS = [
  { id: 1, symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology', currentPrice: 175.50, priceChange: 2.50, priceChangePercent: 1.45, volume: 45200000, marketCap: '2.7T', pe: 28.5, high52: 199.62, low52: 124.17 },
  { id: 2, symbol: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology', currentPrice: 2950.00, priceChange: -25.00, priceChangePercent: -0.84, volume: 1200000, marketCap: '1.9T', pe: 25.2, high52: 3079.00, low52: 2200.00 },
  { id: 3, symbol: 'MSFT', name: 'Microsoft Corporation', sector: 'Technology', currentPrice: 320.00, priceChange: 5.25, priceChangePercent: 1.67, volume: 28500000, marketCap: '2.4T', pe: 32.1, high52: 384.30, low52: 309.45 },
  { id: 4, symbol: 'TSLA', name: 'Tesla Inc.', sector: 'Technology', currentPrice: 180.00, priceChange: -8.50, priceChangePercent: -4.51, volume: 65800000, marketCap: '573B', pe: 45.2, high52: 299.29, low52: 138.80 },
  { id: 5, symbol: 'AMZN', name: 'Amazon.com Inc.', sector: 'Technology', currentPrice: 145.20, priceChange: 1.80, priceChangePercent: 1.25, volume: 32100000, marketCap: '1.5T', pe: 52.3, high52: 188.65, low52: 101.15 },
  { id: 6, symbol: 'META', name: 'Meta Platforms Inc.', sector: 'Technology', currentPrice: 485.30, priceChange: -12.70, priceChangePercent: -2.55, volume: 18900000, marketCap: '1.2T', pe: 24.8, high52: 531.49, low52: 197.16 },
  { id: 7, symbol: 'NVDA', name: 'NVIDIA Corp.', sector: 'Technology', currentPrice: 875.20, priceChange: 15.80, priceChangePercent: 1.84, volume: 42300000, marketCap: '2.1T', pe: 65.4, high52: 974.00, low52: 385.00 },
  { id: 8, symbol: 'NFLX', name: 'Netflix Inc.', sector: 'Technology', currentPrice: 485.50, priceChange: -8.25, priceChangePercent: -1.67, volume: 3200000, marketCap: '215B', pe: 28.9, high52: 639.31, low52: 312.00 },
  { id: 9, symbol: 'JPM', name: 'JPMorgan Chase & Co.', sector: 'Finance', currentPrice: 140.00, priceChange: 1.50, priceChangePercent: 1.08, volume: 20000000, marketCap: '420B', pe: 12.5, high52: 150.00, low52: 120.00 },
  { id: 10, symbol: 'JNJ', name: 'Johnson & Johnson', sector: 'Healthcare', currentPrice: 160.00, priceChange: 0.80, priceChangePercent: 0.50, volume: 15000000, marketCap: '420B', pe: 15.2, high52: 175.00, low52: 145.00 }
];

// Mock Market Indices
const MOCK_INDICES = [
  { name: 'S&P 500', symbol: 'SPX', value: 5123.45, change: 15.67, changePercent: 0.31 },
  { name: 'Dow Jones', symbol: 'DJI', value: 38904.04, change: -87.45, changePercent: -0.22 },
  { name: 'NASDAQ', symbol: 'IXIC', value: 16248.52, change: 52.37, changePercent: 0.32 },
  { name: 'Russell 2000', symbol: 'RUT', value: 2078.45, change: 8.23, changePercent: 0.40 }
];

// Mock News Data
const MOCK_NEWS = [
  {
    id: 1,
    title: 'Federal Reserve Signals Potential Rate Cuts Amid Economic Uncertainty',
    summary: 'The Federal Reserve hints at possible interest rate reductions as inflation shows signs of cooling and economic growth moderates.',
    category: 'Economy',
    source: 'Financial Times',
    timestamp: '2 hours ago',
    sentiment: 'neutral',
    impact: 'high',
    relatedStocks: ['SPY', 'QQQ', 'IWM'],
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=200&fit=crop&crop=center'
  },
  {
    id: 2,
    title: 'Apple Reports Strong Q4 Earnings, Beats Revenue Expectations',
    summary: 'Apple Inc. reports better-than-expected quarterly earnings with strong iPhone sales and services revenue growth.',
    category: 'Earnings',
    source: 'Reuters',
    timestamp: '4 hours ago',
    sentiment: 'positive',
    impact: 'high',
    relatedStocks: ['AAPL'],
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=200&fit=crop&crop=center'
  },
  {
    id: 3,
    title: 'Tech Stocks Rally as AI Investments Show Promise',
    summary: 'Major technology companies see significant gains as artificial intelligence investments begin to show measurable returns.',
    category: 'Technology',
    source: 'Bloomberg',
    timestamp: '6 hours ago',
    sentiment: 'positive',
    impact: 'medium',
    relatedStocks: ['NVDA', 'MSFT', 'GOOGL'],
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&h=200&fit=crop&crop=center'
  }
];

// Mock Competitions Data
const MOCK_COMPETITIONS = [
  {
    id: 1,
    name: 'March Madness Trading Challenge',
    description: 'Compete with traders worldwide in this month-long trading competition. Highest returns win!',
    status: 'active',
    participants: 1247,
    maxParticipants: 2000,
    duration: '1M',
    timeRemaining: '15 days',
    startingBalance: 10000,
    entryFee: 0,
    prize: 'Top 10 winners share ₹5,00,000 prize pool',
    leaderboard: [
      { rank: 1, username: 'TradingPro2024', portfolioValue: 15680, return: 56.8, avatar: '/api/placeholder/40/40' },
      { rank: 2, username: 'StockMaster', portfolioValue: 14230, return: 42.3, avatar: '/api/placeholder/40/40' },
      { rank: 3, username: 'MarketWizard', portfolioValue: 13890, return: 38.9, avatar: '/api/placeholder/40/40' }
    ],
    myRank: 47,
    myPortfolioValue: 11250,
    myReturn: 12.5
  }
];

// Mock Portfolio Data
const MOCK_PORTFOLIO = {
  totalValue: 10000,
  totalGain: 1250,
  totalGainPercent: 12.5,
  cash: 2500,
  positions: [
    { symbol: 'AAPL', name: 'Apple Inc.', shares: 10, avgPrice: 150.00, currentPrice: 175.50, value: 1755, gain: 255, gainPercent: 17.0 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 5, avgPrice: 2800.00, currentPrice: 2950.00, value: 14750, gain: 750, gainPercent: 5.36 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 8, avgPrice: 300.00, currentPrice: 320.00, value: 2560, gain: 160, gainPercent: 6.67 },
    { symbol: 'TSLA', name: 'Tesla Inc.', shares: 3, avgPrice: 200.00, currentPrice: 180.00, value: 540, gain: -60, gainPercent: -10.0 }
  ]
};

// Mock Recent Trades
const MOCK_TRADES = [
  { id: 1, symbol: 'AAPL', type: 'BUY', quantity: 5, price: 175.50, total: 877.50, timestamp: '2024-03-15 10:30:00' },
  { id: 2, symbol: 'MSFT', type: 'SELL', quantity: 3, price: 320.00, total: 960.00, timestamp: '2024-03-15 09:15:00' },
  { id: 3, symbol: 'GOOGL', type: 'BUY', quantity: 2, price: 2950.00, total: 5900.00, timestamp: '2024-03-14 14:45:00' }
];

// Mock API for standalone frontend
// Try real backend first via Axios; fall back to mocks if unavailable
const DEFAULT_BASE_URL = 'http://ec2-52-66-202-36.ap-south-1.compute.amazonaws.com';
const API_BASE_URL =
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE_URL) ||
  DEFAULT_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Attach token if present
axiosInstance.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (_) {}
  return config;
});

export const tradingAPI = {
  // Auth - Mock implementation
  login: async (credentials) => {
    const mockUser = {
      id: 1,
      username: credentials.username,
      email: credentials.username + '@example.com',
      balance: 10000.00,
      portfolioValue: 0.00
    };
    
    const mockToken = 'mock-jwt-token-' + Date.now();
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    return { data: { token: mockToken, user: mockUser } };
  },
  
  register: async (userData) => {
    const mockUser = {
      id: Date.now(),
      username: userData.username,
      email: userData.email,
      balance: 10000.00,
      portfolioValue: 0.00
    };
    
    const mockToken = 'mock-jwt-token-' + Date.now();
    localStorage.setItem('token', mockToken);
    localStorage.setItem('user', JSON.stringify(mockUser));
    
    return { data: { token: mockToken, user: mockUser } };
  },
  
  // Stocks - Enhanced Mock implementation
  getStocks: async () => ({ data: MOCK_STOCKS }),
  getStockBySymbol: async (symbol) => ({ data: MOCK_STOCKS.find(s => s.symbol === symbol) }),
  searchStocks: async (query) => ({ 
    data: MOCK_STOCKS.filter(s => 
      s.symbol.toLowerCase().includes(query.toLowerCase()) || 
      s.name.toLowerCase().includes(query.toLowerCase())
    ) 
  }),
  getStocksBySector: async (sector) => ({ data: MOCK_STOCKS.filter(s => s.sector === sector) }),
  initializeStocks: async () => ({ data: { message: 'Stocks initialized' } }),
  
  // Market Data - New endpoints
  getMarketIndices: async () => ({ data: MOCK_INDICES }),
  getStockChart: async (symbol, timeframe = '1D') => {
    // Generate mock chart data
    const basePrice = MOCK_STOCKS.find(s => s.symbol === symbol)?.currentPrice || 100;
    const chartData = [];
    const intervals = timeframe === '1D' ? 24 : timeframe === '1W' ? 7 : timeframe === '1M' ? 30 : 12;
    
    for (let i = 0; i < intervals; i++) {
      const variation = (Math.random() - 0.5) * 0.1; // ±5% variation
      const price = basePrice * (1 + variation);
      chartData.push({
        time: `${i}:00`,
        price: Math.round(price * 100) / 100
      });
    }
    return { data: chartData };
  },
  
  // Trading - Mock implementation
  buyStock: async (symbol, quantity) => {
    const stock = MOCK_STOCKS.find(s => s.symbol === symbol);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const totalCost = stock.currentPrice * quantity;
    
    if (user.balance >= totalCost) {
      user.balance -= totalCost;
      localStorage.setItem('user', JSON.stringify(user));
      
      return { 
        data: { 
          message: 'Buy order executed successfully',
          transaction: {
            id: Date.now(),
            symbol,
            quantity,
            price: stock.currentPrice,
            totalAmount: totalCost,
            type: 'BUY'
          }
        } 
      };
    } else {
      throw new Error('Insufficient balance');
    }
  },
  
  sellStock: async (symbol, quantity) => {
    const stock = MOCK_STOCKS.find(s => s.symbol === symbol);
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const totalValue = stock.currentPrice * quantity;
    
    user.balance += totalValue;
    localStorage.setItem('user', JSON.stringify(user));
    
    return { 
      data: { 
        message: 'Sell order executed successfully',
        transaction: {
          id: Date.now(),
          symbol,
          quantity,
          price: stock.currentPrice,
          totalAmount: totalValue,
          type: 'SELL'
        }
      } 
    };
  },
  
  getTransactionHistory: async () => ({ data: MOCK_TRADES }),
  getStockTransactionHistory: async (symbol) => ({ 
    data: MOCK_TRADES.filter(trade => trade.symbol === symbol) 
  }),
  getTradingStats: async () => ({ 
    data: { 
      totalInvested: 15000, 
      totalSold: 5000, 
      netTrading: 2500,
      totalTrades: 25,
      winRate: 68.5
    } 
  }),
  
  // Portfolio - Enhanced Mock implementation
  getPortfolio: async () => ({ data: MOCK_PORTFOLIO }),
  getPortfolioValue: async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return { 
      data: { 
        portfolioValue: MOCK_PORTFOLIO.totalValue, 
        balance: user.balance || MOCK_PORTFOLIO.cash, 
        totalWorth: MOCK_PORTFOLIO.totalValue + (user.balance || MOCK_PORTFOLIO.cash),
        totalGain: MOCK_PORTFOLIO.totalGain,
        totalGainPercent: MOCK_PORTFOLIO.totalGainPercent
      } 
    };
  },
  updatePortfolioValues: async () => ({ data: { message: 'Portfolio values updated' } }),
  
  // News - New endpoints
  getNews: async (category = 'all') => {
    if (axiosInstance) {
      try {
        const { data } = await axiosInstance.get('/api/news');
        return { data };
      } catch (_) {
        // Fallback to mocks on error
      }
    }
    if (category === 'all') {
      return { data: MOCK_NEWS };
    }
    return { data: MOCK_NEWS.filter(news => news.category === category) };
  },
  searchNews: async (query) => ({
    data: MOCK_NEWS.filter(news => 
      news.title.toLowerCase().includes(query.toLowerCase()) ||
      news.summary.toLowerCase().includes(query.toLowerCase())
    )
  }),
  
  // Competitions - New endpoints
  getCompetitions: async (status = 'all') => {
    if (status === 'all') {
      return { data: MOCK_COMPETITIONS };
    }
    return { data: MOCK_COMPETITIONS.filter(comp => comp.status === status) };
  },
  joinCompetition: async (competitionId) => {
    return { 
      data: { 
        message: 'Successfully joined competition',
        competitionId,
        startingBalance: 10000
      } 
    };
  },
  createCompetition: async (competitionData) => {
    const newCompetition = {
      id: Date.now(),
      ...competitionData,
      status: 'upcoming',
      participants: 0,
      leaderboard: []
    };
    MOCK_COMPETITIONS.push(newCompetition);
    return { data: newCompetition };
  },
  
  // Tutorials - New endpoints
  getTutorials: async (category = 'all') => {
    const tutorials = [
      {
        id: 1,
        title: 'Introduction to Stock Trading',
        description: 'Learn the basics of stock trading, including what stocks are, how markets work, and key terminology.',
        category: 'Basics',
        difficulty: 'Beginner',
        duration: '15 min',
        progress: 100,
        completed: true,
        lessons: [
          'What are stocks and how do they work?',
          'Understanding stock exchanges',
          'Key trading terminology',
          'Types of orders (market, limit, stop)',
          'Reading stock quotes and charts'
        ]
      },
      {
        id: 2,
        title: 'Technical Analysis Fundamentals',
        description: 'Master the art of reading charts and using technical indicators to make trading decisions.',
        category: 'Analysis',
        difficulty: 'Intermediate',
        duration: '45 min',
        progress: 60,
        completed: false,
        lessons: [
          'Understanding candlestick patterns',
          'Support and resistance levels',
          'Moving averages and trends',
          'Volume analysis',
          'Common technical indicators (RSI, MACD, Bollinger Bands)',
          'Chart patterns and their significance'
        ]
      }
    ];
    
    if (category === 'all') {
      return { data: tutorials };
    }
    return { data: tutorials.filter(tutorial => tutorial.category === category) };
  },
  updateTutorialProgress: async (tutorialId, progress) => {
    return { 
      data: { 
        message: 'Tutorial progress updated',
        tutorialId,
        progress
      } 
    };
  }
};

export default tradingAPI;


