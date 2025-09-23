import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/trading/Portfolio';
import Trading from './pages/trading/Trading';
import Market from './pages/trading/Market';
import News from './pages/trading/News';
import Tutorials from './pages/trading/Tutorials';
import Competitions from './pages/trading/Competitions';
import Profile from './pages/dashboard/Profile';
import Contact from './pages/Contact';
import Features from './pages/Features';

const theme = createTheme({
  palette: {
    primary: {
      main: '#00C853', // Green for gains
    },
    secondary: {
      main: '#FF1744', // Red for losses
    },
    success: {
      main: '#00C853',
    },
    error: {
      main: '#FF1744',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
    },
  },
});

// Simple auth check - replace with actual auth logic
const isAuthenticated = () => {
  return localStorage.getItem('token') !== null;
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-right" />
      <Router basename={import.meta.env.BASE_URL}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<><Navbar /><Landing /></>} />
          <Route path="/login" element={<><Navbar /><Login /></>} />
          <Route path="/register" element={<><Navbar /><Register /></>} />
          <Route path="/about" element={<><Navbar /><About /></>} />
          <Route path="/contact" element={<><Navbar /><Contact /></>} />
          <Route path="/features" element={<><Navbar /><Features /></>} />
          <Route path="/tutorials" element={<><Navbar /><Tutorials /></>} />
          
          {/* Protected Trading Routes */}
          <Route 
            path="/dashboard/*" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route path="portfolio" element={<Portfolio />} />
            <Route path="trading" element={<Trading />} />
            <Route path="market" element={<Market />} />
            <Route path="news" element={<News />} />
            <Route path="competitions" element={<Competitions />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
