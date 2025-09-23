import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  ToggleButton,
  ToggleButtonGroup,
  Paper,
  InputAdornment,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Search,
  Refresh,
  ShowChart,
  Star,
  StarBorder,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { motion } from 'framer-motion';

const Market = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeframe, setTimeframe] = useState('1D');
  const [watchlist, setWatchlist] = useState(['AAPL', 'GOOGL', 'MSFT']);
  const [selectedStock, setSelectedStock] = useState('AAPL');

  const [marketData, setMarketData] = useState([
    { symbol: 'AAPL', name: 'Apple Inc.', price: 175.50, change: 2.50, changePercent: 1.45, volume: '45.2M', marketCap: '2.7T', pe: 28.5, high52: 199.62, low52: 124.17 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 2950.00, change: -25.00, changePercent: -0.84, volume: '1.2M', marketCap: '1.9T', pe: 25.2, high52: 3079.00, low52: 2200.00 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', price: 320.00, change: 5.25, changePercent: 1.67, volume: '28.5M', marketCap: '2.4T', pe: 32.1, high52: 384.30, low52: 309.45 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 180.00, change: -8.50, changePercent: -4.51, volume: '65.8M', marketCap: '573B', pe: 45.2, high52: 299.29, low52: 138.80 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 145.20, change: 1.80, changePercent: 1.25, volume: '32.1M', marketCap: '1.5T', pe: 52.3, high52: 188.65, low52: 101.15 },
    { symbol: 'META', name: 'Meta Platforms Inc.', price: 485.30, change: -12.70, changePercent: -2.55, volume: '18.9M', marketCap: '1.2T', pe: 24.8, high52: 531.49, low52: 197.16 },
    { symbol: 'NVDA', name: 'NVIDIA Corp.', price: 875.20, change: 15.80, changePercent: 1.84, volume: '42.3M', marketCap: '2.1T', pe: 65.4, high52: 974.00, low52: 385.00 },
    { symbol: 'NFLX', name: 'Netflix Inc.', price: 485.50, change: -8.25, changePercent: -1.67, volume: '3.2M', marketCap: '215B', pe: 28.9, high52: 639.31, low52: 312.00 },
  ]);

  const [chartData, setChartData] = useState([
    { time: '09:30', price: 170.00 },
    { time: '10:00', price: 172.50 },
    { time: '10:30', price: 171.25 },
    { time: '11:00', price: 173.80 },
    { time: '11:30', price: 175.20 },
    { time: '12:00', price: 174.50 },
    { time: '12:30', price: 176.00 },
    { time: '13:00', price: 175.50 },
    { time: '13:30', price: 177.25 },
    { time: '14:00', price: 176.80 },
    { time: '14:30', price: 175.50 },
    { time: '15:00', price: 175.50 },
  ]);

  const [marketIndices, setMarketIndices] = useState([
    { name: 'S&P 500', symbol: 'SPX', value: 5123.45, change: 15.67, changePercent: 0.31 },
    { name: 'Dow Jones', symbol: 'DJI', value: 38904.04, change: -87.45, changePercent: -0.22 },
    { name: 'NASDAQ', symbol: 'IXIC', value: 16248.52, change: 52.37, changePercent: 0.32 },
    { name: 'Russell 2000', symbol: 'RUT', value: 2078.45, change: 8.23, changePercent: 0.40 },
  ]);

  const filteredStocks = marketData.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercent = (percent) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  const formatNumber = (num) => {
    if (num >= 1e12) return (num / 1e12).toFixed(1) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toString();
  };

  const toggleWatchlist = (symbol) => {
    setWatchlist(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  return (
    <Box sx={{ p: 3, bgcolor: 'grey.50', minHeight: '100vh' }}>
      {/* Header Module */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, color: 'text.primary' }}>
          Market Overview
        </Typography>
        <Tooltip title="Refresh Data">
          <IconButton color="primary">
            <Refresh />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Market Indices Module */}
      <Card sx={{ mb: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
            Market Indices
          </Typography>
          <Grid container spacing={2}>
            {marketIndices.map((index) => (
              <Grid item xs={12} sm={6} md={3} key={index.symbol}>
                <Paper sx={{ p: 2, textAlign: 'center' }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    {index.name}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600, my: 1 }}>
                    {index.value.toLocaleString()}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {index.change >= 0 ? <TrendingUp color="success" /> : <TrendingDown color="error" />}
                    <Typography
                      variant="body2"
                      color={index.change >= 0 ? 'success.main' : 'error.main'}
                      sx={{ ml: 0.5 }}
                    >
                      {formatPercent(index.changePercent)}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      {/* Stock Chart Module */}
      <Card sx={{ mb: 3, boxShadow: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
              {selectedStock} - {marketData.find(s => s.symbol === selectedStock)?.name}
            </Typography>
            <ToggleButtonGroup
              value={timeframe}
              exclusive
              onChange={(e, newValue) => newValue && setTimeframe(newValue)}
              size="small"
            >
              <ToggleButton value="1D">1D</ToggleButton>
              <ToggleButton value="1W">1W</ToggleButton>
              <ToggleButton value="1M">1M</ToggleButton>
              <ToggleButton value="3M">3M</ToggleButton>
              <ToggleButton value="1Y">1Y</ToggleButton>
            </ToggleButtonGroup>
          </Box>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis tickFormatter={(value) => `$${value}`} />
              <RechartsTooltip formatter={(value) => [formatCurrency(value), 'Price']} />
              <Area
                type="monotone"
                dataKey="price"
                stroke="#00C853"
                fill="#00C853"
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Watchlist Module */}
      <Card sx={{ mb: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
            Watchlist
          </Typography>
          <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
            {watchlist.map(symbol => {
              const stock = marketData.find(s => s.symbol === symbol);
              if (!stock) return null;
              return (
                <Paper
                  key={symbol}
                  sx={{
                    p: 2,
                    mb: 1,
                    cursor: 'pointer',
                    border: selectedStock === symbol ? 2 : 1,
                    borderColor: selectedStock === symbol ? 'primary.main' : 'divider',
                    '&:hover': { bgcolor: 'action.hover' }
                  }}
                  onClick={() => setSelectedStock(symbol)}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {stock.symbol}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formatCurrency(stock.price)}
                      </Typography>
                    </Box>
                    <Box sx={{ textAlign: 'right' }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        {stock.change >= 0 ? <TrendingUp color="success" /> : <TrendingDown color="error" />}
                        <Typography
                          variant="body2"
                          color={stock.change >= 0 ? 'success.main' : 'error.main'}
                          sx={{ ml: 0.5 }}
                        >
                          {formatPercent(stock.changePercent)}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Paper>
              );
            })}
          </Box>
        </CardContent>
      </Card>

      {/* Stock Market Module */}
      <Card sx={{ boxShadow: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Stock Market
            </Typography>
            <TextField
              placeholder="Search stocks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
              sx={{ 
                width: 300,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />
          </Box>
          
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: 'grey.50' }}>
                  <TableCell sx={{ fontWeight: 600 }}>Symbol</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Company</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Price</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Change</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>% Change</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Volume</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>Market Cap</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>P/E</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>52W High</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600 }}>52W Low</TableCell>
                  <TableCell align="center" sx={{ fontWeight: 600 }}>Watch</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStocks.map((stock) => (
                  <TableRow 
                    key={stock.symbol} 
                    hover
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setSelectedStock(stock.symbol)}
                  >
                    <TableCell>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {stock.symbol}
                      </Typography>
                    </TableCell>
                    <TableCell>{stock.name}</TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                        {formatCurrency(stock.price)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        color={stock.change >= 0 ? 'success.main' : 'error.main'}
                        sx={{ fontWeight: 600 }}
                      >
                        {formatCurrency(stock.change)}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Chip
                        label={formatPercent(stock.changePercent)}
                        color={stock.change >= 0 ? 'success' : 'error'}
                        size="small"
                        sx={{ 
                          bgcolor: stock.change >= 0 ? 'success.light' : 'error.light',
                          color: 'white',
                          fontWeight: 600
                        }}
                      />
                    </TableCell>
                    <TableCell align="right">{stock.volume}</TableCell>
                    <TableCell align="right">{formatNumber(stock.marketCap)}</TableCell>
                    <TableCell align="right">{stock.pe}</TableCell>
                    <TableCell align="right">{formatCurrency(stock.high52)}</TableCell>
                    <TableCell align="right">{formatCurrency(stock.low52)}</TableCell>
                    <TableCell align="center">
                      <IconButton
                        size="small"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleWatchlist(stock.symbol);
                        }}
                      >
                        {watchlist.includes(stock.symbol) ? <Star color="warning" /> : <StarBorder />}
                      </IconButton>
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

export default Market;
