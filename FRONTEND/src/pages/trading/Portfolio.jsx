import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  AccountBalanceWallet,
  ShowChart,
  Refresh,
  AttachMoney,
  PieChart as PieChartIcon,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { motion } from 'framer-motion';
import { tradingAPI } from '../../api/client';

const Portfolio = () => {
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 0,
    totalGain: 0,
    totalGainPercent: 0,
    cash: 0,
    positions: []
  });
  const [loading, setLoading] = useState(false);

  const [performanceData, setPerformanceData] = useState([]);

  // Load portfolio data from API
  useEffect(() => {
    const loadPortfolioData = async () => {
      setLoading(true);
      try {
        const [portfolioResponse, portfolioValueResponse] = await Promise.all([
          tradingAPI.getPortfolio(),
          tradingAPI.getPortfolioValue()
        ]);
        
        setPortfolioData(portfolioResponse.data);
        
        // Generate performance data based on portfolio value
        const baseValue = portfolioValueResponse.data.portfolioValue;
        const performance = [
          { date: '2024-01-01', value: baseValue * 0.8 },
          { date: '2024-01-15', value: baseValue * 0.85 },
          { date: '2024-02-01', value: baseValue * 0.9 },
          { date: '2024-02-15', value: baseValue * 0.95 },
          { date: '2024-03-01', value: baseValue * 1.0 },
          { date: '2024-03-15', value: baseValue },
        ];
        setPerformanceData(performance);
      } catch (error) {
        console.error('Error loading portfolio data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadPortfolioData();
  }, []);

  const pieData = portfolioData.positions.map(position => ({
    name: position.symbol,
    value: position.value,
    color: position.gain >= 0 ? '#00C853' : '#FF1744'
  }));

  const COLORS = ['#00C853', '#1976d2', '#FF9800', '#FF1744'];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatPercent = (percent) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  return (
    <Box sx={{ p: 3, bgcolor: 'grey.50', minHeight: '100vh' }}>
      {/* Header Module */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, color: 'text.primary' }}>
          Portfolio Overview
        </Typography>
        <Tooltip title="Refresh Data">
          <IconButton color="primary">
            <Refresh />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Portfolio Summary Module */}
      <Card sx={{ mb: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
            Portfolio Summary
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <Box sx={{ width: 8, height: 8, bgcolor: 'success.main', borderRadius: '2px', mr: 1 }} />
                  <Typography variant="h6">Total Value</Typography>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
                  {formatCurrency(portfolioData.totalValue)}
                </Typography>
                <Chip
                  label={`${formatCurrency(portfolioData.totalGain)} (${formatPercent(portfolioData.totalGainPercent)})`}
                  color="success"
                  size="small"
                  sx={{ bgcolor: 'success.light', color: 'white' }}
                />
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                  <TrendingUp color="success" sx={{ mr: 1 }} />
                  <Typography variant="h6">Cash Available</Typography>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 600 }}>
                  {formatCurrency(portfolioData.cash)}
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Portfolio Allocation</Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value) => formatCurrency(value)} />
                  </PieChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, textAlign: 'center' }}>
                <Typography variant="h6" sx={{ mb: 2 }}>Portfolio Performance</Typography>
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" hide />
                    <YAxis hide />
                    <RechartsTooltip formatter={(value) => [formatCurrency(value), 'Portfolio Value']} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#00C853"
                      strokeWidth={3}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Current Holdings Module */}
      <Card sx={{ boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
            Current Holdings
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Symbol</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Company</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Shares</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Avg Price</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Current Price</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Value</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Gain/Loss</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>% Change</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {portfolioData.positions.map((position) => (
                  <TableRow key={position.symbol} hover>
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {position.symbol}
                      </Typography>
                    </TableCell>
                    <TableCell>{position.name}</TableCell>
                    <TableCell align="right">{position.shares}</TableCell>
                    <TableCell align="right">{formatCurrency(position.avgPrice)}</TableCell>
                    <TableCell align="right">{formatCurrency(position.currentPrice)}</TableCell>
                    <TableCell align="right">{formatCurrency(position.value)}</TableCell>
                    <TableCell align="right">
                      <Typography
                        color={position.gain >= 0 ? 'success.main' : 'error.main'}
                        sx={{ fontWeight: 600 }}
                      >
                        {formatCurrency(position.gain)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        label={formatPercent(position.gainPercent)}
                        color={position.gain >= 0 ? 'success' : 'error'}
                        size="small"
                        sx={{ 
                          bgcolor: position.gain >= 0 ? 'success.light' : 'error.light',
                          color: 'white',
                          fontWeight: 600
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Portfolio;
