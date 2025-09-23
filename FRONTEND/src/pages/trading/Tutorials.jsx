import React, { useState } from 'react';
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
  Accordion,
  AccordionSummary,
  AccordionDetails,
  LinearProgress,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  Search,
  ExpandMore,
  PlayArrow,
  CheckCircle,
  RadioButtonUnchecked,
  School,
  TrendingUp,
  AccountBalance,
  Assessment,
  Psychology,
} from '@mui/icons-material';
import { motion } from 'framer-motion';

const Tutorials = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [completedTutorials, setCompletedTutorials] = useState([1, 3, 5]);
  const [expandedTutorial, setExpandedTutorial] = useState(null);

  const [tutorials, setTutorials] = useState([
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
      ],
      icon: <School color="primary" />
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
      ],
      icon: <TrendingUp color="primary" />
    },
    {
      id: 3,
      title: 'Portfolio Management Strategies',
      description: 'Learn how to build and manage a diversified investment portfolio for long-term success.',
      category: 'Portfolio',
      difficulty: 'Beginner',
      duration: '30 min',
      progress: 100,
      completed: true,
      lessons: [
        'Diversification principles',
        'Asset allocation strategies',
        'Risk management basics',
        'Rebalancing your portfolio',
        'Long-term vs short-term investing'
      ],
      icon: <AccountBalance color="primary" />
    },
    {
      id: 4,
      title: 'Fundamental Analysis',
      description: 'Understand how to analyze companies and their financial statements to make informed investment decisions.',
      category: 'Analysis',
      difficulty: 'Advanced',
      duration: '60 min',
      progress: 25,
      completed: false,
      lessons: [
        'Reading financial statements',
        'Key financial ratios (P/E, P/B, ROE, etc.)',
        'Industry analysis',
        'Company valuation methods',
        'Economic indicators and their impact',
        'Earnings analysis and projections'
      ],
      icon: <Assessment color="primary" />
    },
    {
      id: 5,
      title: 'Trading Psychology',
      description: 'Develop the mental discipline and emotional control needed for successful trading.',
      category: 'Psychology',
      difficulty: 'Intermediate',
      duration: '25 min',
      progress: 100,
      completed: true,
      lessons: [
        'Common psychological traps in trading',
        'Managing fear and greed',
        'Developing a trading plan',
        'Risk tolerance assessment',
        'Building discipline and patience'
      ],
      icon: <Psychology color="primary" />
    },
    {
      id: 6,
      title: 'Options Trading Basics',
      description: 'Introduction to options trading, including calls, puts, and basic strategies.',
      category: 'Advanced',
      difficulty: 'Advanced',
      duration: '90 min',
      progress: 0,
      completed: false,
      lessons: [
        'What are options and how do they work?',
        'Calls vs Puts explained',
        'Option pricing and Greeks',
        'Basic option strategies',
        'Risk management in options trading',
        'Advanced option strategies'
      ],
      icon: <TrendingUp color="primary" />
    }
  ]);

  const categories = ['all', 'Basics', 'Analysis', 'Portfolio', 'Psychology', 'Advanced'];

  const filteredTutorials = tutorials.filter(tutorial => {
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || tutorial.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'success';
      case 'Intermediate': return 'warning';
      case 'Advanced': return 'error';
      default: return 'default';
    }
  };

  const handleTutorialToggle = (tutorialId) => {
    setExpandedTutorial(expandedTutorial === tutorialId ? null : tutorialId);
  };

  const handleLessonComplete = (tutorialId, lessonIndex) => {
    // In a real app, this would update the backend
    console.log(`Completed lesson ${lessonIndex} in tutorial ${tutorialId}`);
  };

  const totalTutorials = tutorials.length;
  const completedCount = completedTutorials.length;
  const completionPercentage = (completedCount / totalTutorials) * 100;

  return (
    <Box sx={{ p: 3, bgcolor: 'grey.50', minHeight: '100vh' }}>
      {/* Header Module */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, color: 'text.primary' }}>
          Trading Tutorials
        </Typography>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="body2" color="text.secondary">
            Progress: {completedCount}/{totalTutorials} completed
          </Typography>
          <LinearProgress 
            variant="determinate" 
            value={completionPercentage} 
            sx={{ width: 200, mt: 1 }}
          />
        </Box>
      </Box>

      {/* Search and Filter Module */}
      <Card sx={{ mb: 3, boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.primary' }}>
            Search and Filter
          </Typography>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search tutorials..."
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
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {categories.map((category) => (
                  <Chip
                    key={category}
                    label={category === 'all' ? 'All Categories' : category}
                    onClick={() => setSelectedCategory(category)}
                    color={selectedCategory === category ? 'primary' : 'default'}
                    variant={selectedCategory === category ? 'filled' : 'outlined'}
                    sx={{ 
                      fontWeight: 500,
                      '&:hover': { 
                        bgcolor: selectedCategory === category ? 'primary.dark' : 'action.hover' 
                      }
                    }}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Tutorials List Module */}
      <Card sx={{ boxShadow: 2 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
            Available Tutorials ({filteredTutorials.length})
          </Typography>
          
          {filteredTutorials.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="h6" color="text.secondary">
                No tutorials found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Try adjusting your search terms or category filter
              </Typography>
            </Box>
          ) : (
            <Box>
              {filteredTutorials.map((tutorial) => (
                <motion.div
                  key={tutorial.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Paper sx={{ mb: 2, border: 1, borderColor: 'divider' }}>
                    <Accordion 
                      expanded={expandedTutorial === tutorial.id}
                      onChange={() => handleTutorialToggle(tutorial.id)}
                      sx={{ boxShadow: 'none' }}
                    >
                      <AccordionSummary expandIcon={<ExpandMore />}>
                        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                            {tutorial.icon}
                            <Box sx={{ ml: 2 }}>
                              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                {tutorial.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {tutorial.description}
                              </Typography>
                            </Box>
                          </Box>
                          
                          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto', gap: 2 }}>
                            <Chip
                              label={tutorial.difficulty}
                              color={getDifficultyColor(tutorial.difficulty)}
                              size="small"
                              sx={{ fontWeight: 600 }}
                            />
                            <Typography variant="body2" color="text.secondary">
                              {tutorial.duration}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              {tutorial.completed ? (
                                <CheckCircle color="success" />
                              ) : (
                                <RadioButtonUnchecked color="action" />
                              )}
                            </Box>
                          </Box>
                        </Box>
                      </AccordionSummary>
                      
                      <AccordionDetails>
                        <Box sx={{ width: '100%' }}>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Typography variant="subtitle2" color="text.secondary">
                              Progress: {tutorial.progress}%
                            </Typography>
                            <Button
                              variant="contained"
                              startIcon={<PlayArrow />}
                              size="small"
                              sx={{ 
                                fontWeight: 600,
                                '&:hover': { bgcolor: 'primary.dark' }
                              }}
                            >
                              {tutorial.completed ? 'Review' : 'Continue'}
                            </Button>
                          </Box>
                          
                          <LinearProgress 
                            variant="determinate" 
                            value={tutorial.progress} 
                            sx={{ mb: 2 }}
                          />
                          
                          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
                            Lessons:
                          </Typography>
                          
                          <List dense>
                            {tutorial.lessons.map((lesson, index) => (
                              <ListItem key={index} sx={{ py: 0.5 }}>
                                <ListItemIcon sx={{ minWidth: 32 }}>
                                  {tutorial.progress > (index / tutorial.lessons.length) * 100 ? (
                                    <CheckCircle color="success" fontSize="small" />
                                  ) : (
                                    <RadioButtonUnchecked color="action" fontSize="small" />
                                  )}
                                </ListItemIcon>
                                <ListItemText 
                                  primary={lesson}
                                  primaryTypographyProps={{ variant: 'body2' }}
                                />
                              </ListItem>
                            ))}
                          </List>
                        </Box>
                      </AccordionDetails>
                    </Accordion>
                  </Paper>
                </motion.div>
              ))}
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Tutorials;
