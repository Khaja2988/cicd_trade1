import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  TextField,
  Chip,
  IconButton,
  Tooltip,
  Paper,
  Avatar,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  Search,
  Refresh,
  TrendingUp,
  TrendingDown,
  Schedule,
  Bookmark,
  BookmarkBorder,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [bookmarkedNews, setBookmarkedNews] = useState([]);

  const [newsData, setNewsData] = useState([
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
      title: 'Tesla Stock Drops 8% After Production Guidance Cut',
      summary: 'Tesla shares fall sharply after the company reduces its 2024 production guidance due to supply chain challenges.',
      category: 'Earnings',
      source: 'Bloomberg',
      timestamp: '6 hours ago',
      sentiment: 'negative',
      impact: 'medium',
      relatedStocks: ['TSLA'],
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=200&fit=crop&crop=center'
    },
    {
      id: 4,
      title: 'Microsoft Azure Cloud Revenue Surges 35% in Latest Quarter',
      summary: 'Microsoft reports robust cloud growth with Azure revenue increasing significantly, driven by enterprise adoption.',
      category: 'Technology',
      source: 'CNBC',
      timestamp: '8 hours ago',
      sentiment: 'positive',
      impact: 'medium',
      relatedStocks: ['MSFT'],
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=200&fit=crop&crop=center'
    },
    {
      id: 5,
      title: 'Oil Prices Rise 3% on Supply Concerns and Geopolitical Tensions',
      summary: 'Crude oil futures climb as supply disruptions and ongoing geopolitical tensions in the Middle East impact markets.',
      category: 'Commodities',
      source: 'Wall Street Journal',
      timestamp: '10 hours ago',
      sentiment: 'neutral',
      impact: 'medium',
      relatedStocks: ['XOM', 'CVX', 'USO'],
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop&crop=center'
    },
    {
      id: 6,
      title: 'Cryptocurrency Market Shows Signs of Recovery',
      summary: 'Bitcoin and other major cryptocurrencies gain ground as institutional adoption continues to grow.',
      category: 'Crypto',
      source: 'CoinDesk',
      timestamp: '12 hours ago',
      sentiment: 'positive',
      impact: 'low',
      relatedStocks: ['COIN', 'MSTR'],
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=400&h=200&fit=crop&crop=center'
    }
  ]);

  const categories = ['all', 'Economy', 'Earnings', 'Technology', 'Commodities', 'Crypto'];

  const filteredNews = newsData.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getSentimentColor = (sentiment) => {
    switch (sentiment) {
      case 'positive': return 'success';
      case 'negative': return 'error';
      default: return 'default';
    }
  };

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return <TrendingUp />;
      case 'negative': return <TrendingDown />;
      default: return <Schedule />;
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const toggleBookmark = (newsId) => {
    setBookmarkedNews(prev => 
      prev.includes(newsId) 
        ? prev.filter(id => id !== newsId)
        : [...prev, newsId]
    );
  };

  return (
    <Box sx={{ p: 3, bgcolor: 'grey.50', minHeight: '100vh' }}>
      {/* Header Module */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, color: 'text.primary' }}>
          Financial News
        </Typography>
        <Tooltip title="Refresh News">
          <IconButton color="primary">
            <Refresh />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Search Module */}
      <Card sx={{ mb: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
            Search News
          </Typography>
          <TextField
            fullWidth
            placeholder="Search news articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
            }}
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: 2
              }
            }}
          />
        </CardContent>
      </Card>

      {/* Filter Module */}
      <Card sx={{ mb: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
            Filter by Category
          </Typography>
          <ToggleButtonGroup
            value={selectedCategory}
            exclusive
            onChange={(e, newValue) => newValue && setSelectedCategory(newValue)}
            fullWidth
            sx={{ 
              '& .MuiToggleButton-root': {
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 500
              }
            }}
          >
            {categories.map((category) => (
              <ToggleButton key={category} value={category}>
                {category === 'all' ? 'All News' : category}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </CardContent>
      </Card>

      {/* News Articles Module */}
      <Card sx={{ boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
            Latest News ({filteredNews.length} articles)
          </Typography>
          
          {filteredNews.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No news articles found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search terms or category filter
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredNews.map((article) => (
                <Grid item xs={12} key={article.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', md: 'row' },
                      height: 'auto',
                      boxShadow: 1,
                      '&:hover': { boxShadow: 3 }
                    }}>
                      {/* Image Section */}
                      <Box sx={{ 
                        width: { xs: '100%', md: '300px' },
                        height: { xs: '200px', md: 'auto' },
                        minHeight: '200px',
                        position: 'relative',
                        overflow: 'hidden'
                      }}>
                        <Box
                          component="img"
                          src={article.image}
                          alt={article.title}
                          sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                            '&:hover': {
                              transform: 'scale(1.05)'
                            }
                          }}
                        />
                        <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                          <IconButton
                            size="small"
                            onClick={() => toggleBookmark(article.id)}
                            sx={{ 
                              bgcolor: 'background.paper', 
                              opacity: 0.9,
                              '&:hover': { bgcolor: 'background.paper', opacity: 1 }
                            }}
                          >
                            {bookmarkedNews.includes(article.id) ? 
                              <Bookmark color="warning" /> : 
                              <BookmarkBorder />
                            }
                          </IconButton>
                        </Box>
                      </Box>

                      {/* Content Section */}
                      <Box sx={{ flex: 1, p: 3 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
                          <Chip
                            icon={getSentimentIcon(article.sentiment)}
                            label={article.sentiment}
                            color={getSentimentColor(article.sentiment)}
                            size="small"
                          />
                          <Chip
                            label={article.impact}
                            color={getImpactColor(article.impact)}
                            size="small"
                          />
                          <Chip
                            label={article.category}
                            variant="outlined"
                            size="small"
                          />
                        </Box>

                        <Typography variant="h5" sx={{ 
                          fontWeight: 600, 
                          mb: 2, 
                          lineHeight: 1.3,
                          color: 'text.primary'
                        }}>
                          {article.title}
                        </Typography>

                        <Typography variant="body1" color="text.secondary" sx={{ mb: 3, lineHeight: 1.6 }}>
                          {article.summary}
                        </Typography>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                          <Typography variant="body2" color="text.secondary">
                            <strong>{article.source}</strong> • {article.timestamp}
                          </Typography>
                        </Box>

                        {article.relatedStocks.length > 0 && (
                          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                            <Typography variant="body2" color="text.secondary" sx={{ mr: 1, alignSelf: 'center' }}>
                              Related Stocks:
                            </Typography>
                            {article.relatedStocks.map((stock) => (
                              <Chip
                                key={stock}
                                label={stock}
                                size="small"
                                variant="outlined"
                                sx={{ 
                                  fontSize: '0.75rem',
                                  fontWeight: 600,
                                  '&:hover': { bgcolor: 'primary.light', color: 'white' }
                                }}
                              />
                            ))}
                          </Box>
                        )}
                      </Box>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default News;
