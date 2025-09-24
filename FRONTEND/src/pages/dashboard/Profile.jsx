import { Box, Typography, Paper, Avatar, Grid, Card, CardContent, Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { TrendingUp, AccountBalanceWallet, ShowChart } from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const traderProfile = {
  name: 'KHAJA VALI',
  tradingLevel: 'Intermediate Trader',
  yearsOfExperience: 3,
  totalTrades: 156,
  winRate: 68.5,
  totalProfit: 12500.00,
  totalValue: 10000,
  totalGain: 1250,
  totalGainPercent: 12.5,
  cash: 2500,
  positions: [
    { symbol: 'AAPL', name: 'Apple Inc.', shares: 10, avgPrice: 150.00, currentPrice: 175.50, value: 1755, gain: 255, gainPercent: 17.0 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', shares: 5, avgPrice: 2800.00, currentPrice: 2950.00, value: 14750, gain: 750, gainPercent: 5.36 },
    { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 8, avgPrice: 300.00, currentPrice: 320.00, value: 2560, gain: 160, gainPercent: 6.67 },
    { symbol: 'TSLA', name: 'Tesla Inc.', shares: 3, avgPrice: 200.00, currentPrice: 180.00, value: 540, gain: -60, gainPercent: -10.0 },
  ]
};

const performanceData = [
  { date: '2024-01-01', value: 10000 },
  { date: '2024-01-15', value: 10250 },
  { date: '2024-02-01', value: 9800 },
  { date: '2024-02-15', value: 10500 },
  { date: '2024-03-01', value: 10800 },
  { date: '2024-03-15', value: 11250 },
];

const pieData = traderProfile.positions.map(position => ({
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

const Profile = () => (
  <Box sx={{ p: 3 }}>
    <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
      Trader Profile & Portfolio
    </Typography>
    
    {/* Profile Section */}
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} md={4}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Avatar sx={{ width: 80, height: 80, mx: 'auto', mb: 2, bgcolor: 'primary.main' }}>
            {traderProfile.name[0]}
          </Avatar>
          <Typography variant="h5" gutterBottom>{traderProfile.name}</Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {traderProfile.tradingLevel}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Trading Experience: {traderProfile.yearsOfExperience} years
          </Typography>
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={8}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TrendingUp color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Total Trades</Typography>
                </Box>
                <Typography variant="h4" color="primary">
                  {traderProfile.totalTrades}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <ShowChart color="success" sx={{ mr: 1 }} />
                  <Typography variant="h6">Win Rate</Typography>
                </Box>
                <Typography variant="h4" color="success.main">
                  {traderProfile.winRate}%
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AccountBalanceWallet color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6">Total Profit</Typography>
                </Box>
                <Typography variant="h4" color="success.main">
                  ₹{traderProfile.totalProfit.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>

    {/* Portfolio Section */}
    <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
      Portfolio Overview
    </Typography>
    
    <Grid container spacing={3}>
      {/* Portfolio Summary Cards */}
      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box sx={{ width: 8, height: 8, bgcolor: 'success.main', borderRadius: '2px', mr: 1 }} />
              <Typography variant="h6">Total Value</Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
              {formatCurrency(traderProfile.totalValue)}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Chip
                label={`${formatCurrency(traderProfile.totalGain)} (${formatPercent(traderProfile.totalGainPercent)})`}
                color="success"
                size="small"
                sx={{ bgcolor: 'success.light', color: 'white' }}
              />
            </Box>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrendingUp color="success" sx={{ mr: 1 }} />
              <Typography variant="h6">Cash Available</Typography>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {formatCurrency(traderProfile.cash)}
            </Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
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
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <Card sx={{ height: '100%' }}>
          <CardContent>
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
          </CardContent>
        </Card>
      </Grid>

      {/* Holdings Table */}
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>Current Holdings</Typography>
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
                  {traderProfile.positions.map((position) => (
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
      </Grid>
    </Grid>
  </Box>
);

export default Profile; 