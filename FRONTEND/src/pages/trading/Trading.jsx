import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Alert,
  Divider,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Search,
  Refresh,
  AccountBalanceWallet,
  ShowChart,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { tradingAPI } from '../../api/client';

const Trading = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStock, setSelectedStock] = useState(null);
  const [orderType, setOrderType] = useState('buy');
  const [quantity, setQuantity] = useState('');
  const [orderPrice, setOrderPrice] = useState('');
  const [cashAvailable, setCashAvailable] = useState(2500);

  const [stocks, setStocks] = useState([]);
  const [recentTrades, setRecentTrades] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load data from API
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [stocksResponse, tradesResponse, portfolioResponse] = await Promise.all([
          tradingAPI.getStocks(),
          tradingAPI.getTransactionHistory(),
          tradingAPI.getPortfolioValue()
        ]);
        
        setStocks(stocksResponse.data);
        setRecentTrades(tradesResponse.data);
        setCashAvailable(portfolioResponse.data.balance);
      } catch (error) {
        toast.error('Failed to load data');
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, []);

  const filteredStocks = stocks.filter(stock =>
    stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stock.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const formatPercent = (percent) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
    setOrderPrice((stock.currentPrice ?? stock.price)?.toString() || '');
  };

  const handleOrderSubmit = async () => {
    if (!selectedStock || !quantity || !orderPrice) {
      toast.error('Please fill in all fields');
      return;
    }

    const totalCost = parseFloat(quantity) * parseFloat(orderPrice);
    
    if (orderType === 'buy' && totalCost > cashAvailable) {
      toast.error('Insufficient cash available');
      return;
    }

    if (parseFloat(quantity) <= 0) {
      toast.error('Quantity must be greater than 0');
      return;
    }

    setLoading(true);
    try {
      let response;
      if (orderType === 'buy') {
        response = await tradingAPI.buyStock(selectedStock.symbol, parseInt(quantity));
      } else {
        response = await tradingAPI.sellStock(selectedStock.symbol, parseInt(quantity));
      }

      // Update local state
      const newTrade = {
        id: Date.now(),
        symbol: selectedStock.symbol,
        type: orderType.toUpperCase(),
        quantity: parseInt(quantity),
        price: parseFloat(orderPrice),
        total: totalCost,
        timestamp: new Date().toLocaleString()
      };

      setRecentTrades(prev => [newTrade, ...prev]);
      
      if (orderType === 'buy') {
        setCashAvailable(prev => prev - totalCost);
        toast.success(`Successfully bought ${quantity} shares of ${selectedStock.symbol}`);
      } else {
        setCashAvailable(prev => prev + totalCost);
        toast.success(`Successfully sold ${quantity} shares of ${selectedStock.symbol}`);
      }

      // Reset form
      setQuantity('');
      setOrderPrice((selectedStock.currentPrice ?? selectedStock.price)?.toString() || '');
    } catch (error) {
      toast.error(error.message || 'Order execution failed');
      console.error('Order error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 3, bgcolor: 'grey.50', minHeight: '100vh' }}>
      {/* Header Module */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, color: 'text.primary' }}>
          Trading Platform
        </Typography>
        <Tooltip title="Refresh Data">
          <IconButton color="primary">
            <Refresh />
          </IconButton>
        </Tooltip>
      </Box>

      <Grid container spacing={3}>
        {/* Search Stocks Module */}
        <Grid item xs={12}>
          <Card sx={{ mb: 3, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                Search Stocks
              </Typography>
              <TextField
                fullWidth
                placeholder="Search by symbol or comp:"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                }}
                sx={{ 
                  mb: 2,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2
                  }
                }}
              />
              
              <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                {filteredStocks.map((stock) => (
                  <Box
                    key={stock.symbol}
                    sx={{
                      p: 2,
                      mb: 1,
                      cursor: 'pointer',
                      borderRadius: 1,
                      border: selectedStock?.symbol === stock.symbol ? 2 : 1,
                      borderColor: selectedStock?.symbol === stock.symbol ? 'primary.main' : 'divider',
                      bgcolor: selectedStock?.symbol === stock.symbol ? 'primary.light' : 'white',
                      '&:hover': { bgcolor: 'action.hover' }
                    }}
                    onClick={() => handleStockSelect(stock)}
                  >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          {stock.symbol}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {stock.name}
                        </Typography>
                      </Box>
                      <Box sx={{ textAlign: 'right' }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                          {formatCurrency(stock.currentPrice ?? stock.price)}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                          {(stock.priceChange ?? stock.change) >= 0 ? <TrendingUp color="success" /> : <TrendingDown color="error" />}
                          <Typography
                            variant="body2"
                            color={(stock.priceChange ?? stock.change) >= 0 ? 'success.main' : 'error.main'}
                            sx={{ ml: 0.5 }}
                          >
                            {formatPercent((stock.priceChangePercent ?? stock.changePercent) || 0)}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Place Order Module */}
        <Grid item xs={12}>
          <Card sx={{ mb: 3, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
                Place Order
              </Typography>
              
              <FormControl fullWidth sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Order Type
                </Typography>
                <Select
                  value={orderType}
                  onChange={(e) => setOrderType(e.target.value)}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="buy">Buy</MenuItem>
                  <MenuItem value="sell">Sell</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Quantity
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                  Price per Share
                </Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={orderPrice}
                  onChange={(e) => setOrderPrice(e.target.value)}
                  sx={{ 
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2
                    }
                  }}
                />
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                onClick={handleOrderSubmit}
                disabled={!selectedStock || !quantity || !orderPrice}
                sx={{ 
                  mb: 2, 
                  bgcolor: 'grey.300',
                  color: 'text.primary',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: 'grey.400'
                  }
                }}
              >
                BUY STOCK
              </Button>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <AccountBalanceWallet sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                  Cash Available
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  {formatCurrency(cashAvailable)}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Trades Module */}
        <Grid item xs={12}>
          <Card sx={{ boxShadow: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                  Recent Trades
                </Typography>
                <Tooltip title="Refresh">
                  <IconButton size="small">
                    <Refresh />
                  </IconButton>
                </Tooltip>
              </Box>
              
              <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
                {recentTrades.map((trade) => (
                  <Box key={trade.id} sx={{ p: 2, mb: 1, bgcolor: 'white', borderRadius: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
                        {trade.symbol}
                      </Typography>
                      <Chip
                        label={trade.type}
                        color={trade.type === 'BUY' ? 'success' : 'error'}
                        size="small"
                        sx={{ 
                          bgcolor: trade.type === 'BUY' ? 'success.main' : 'error.main',
                          color: 'white',
                          fontWeight: 600
                        }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {trade.quantity} shares @ {formatCurrency(trade.price)}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary' }}>
                      Total: {formatCurrency(trade.total)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {trade.timestamp}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Trading;
