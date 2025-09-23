import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

const About = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: '#1976d2',
          color: 'white',
          py: 8,
          textAlign: 'center',
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" gutterBottom>
            About EMS
          </Typography>
          <Typography variant="h5" component="h2" gutterBottom>
            Transforming HR Management for Modern Organizations
          </Typography>
        </Container>
      </Box>

      {/* Mission Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom align="center">
          Our Mission
        </Typography>
        <Typography variant="body1" paragraph align="center" sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}>
          At VirtualStock, we're dedicated to revolutionizing how traders learn and practice trading. 
          Our mission is to provide comprehensive, user-friendly solutions that streamline trading processes, 
          enhance trader engagement, and drive trading success.
        </Typography>

        {/* Values Section */}
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
              <PeopleIcon sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                People First
              </Typography>
              <Typography>
                We believe in putting traders at the center of everything we do, 
                creating solutions that empower both beginners and experienced traders.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
              <SecurityIcon sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Trust & Security
              </Typography>
              <Typography>
                Your data security is our top priority. We implement the highest 
                standards of data protection and privacy.
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3, height: '100%', textAlign: 'center' }}>
              <SpeedIcon sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
              <Typography variant="h5" gutterBottom>
                Innovation
              </Typography>
              <Typography>
                We continuously innovate to provide cutting-edge solutions that 
                meet the evolving needs of modern workplaces.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Team Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" gutterBottom align="center">
            Our Team
          </Typography>
          <Typography variant="body1" paragraph align="center" sx={{ maxWidth: '800px', mx: 'auto', mb: 6 }}>
            We are a team of passionate professionals dedicated to transforming HR management. 
            Our diverse team brings together expertise in technology, human resources, and business operations 
            to create solutions that make a real difference.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default About; 