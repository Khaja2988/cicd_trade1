import { Box, Container, Typography, Grid, Paper, List, ListItem } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PaymentIcon from '@mui/icons-material/Payment';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SecurityIcon from '@mui/icons-material/Security';

const features = [
  {
    icon: <PeopleIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />, title: 'User Profiles',
    details: ['Personal Information Management', 'Account Settings', 'Document Management']
  },
  {
    icon: <EventNoteIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />, title: 'Leave Management',
    details: ['Leave Request System', 'Attendance Tracking', 'Holiday Calendar']
  },
  {
    icon: <PaymentIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />, title: 'Payroll Management',
    details: ['Salary Processing', 'Payslip Generation', 'Tax Management', 'Payroll Reports']
  },
  {
    icon: <AssessmentIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />, title: 'Performance Management',
    details: ['Performance Reviews', 'Goal Setting & Tracking', 'Trading Feedback System']
  },
  {
    icon: <SecurityIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />, title: 'Security & Access Control',
    details: ['Role-based Access Control', 'Data Encryption', 'Audit Trails']
  },
];

const Features = () => (
  <Box>
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h1" align="center" gutterBottom>
        EMS Features
      </Typography>
      <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 6 }}>
        Discover the powerful features that make our Trading Platform the best choice for modern traders.
      </Typography>
      <Grid container spacing={4}>
        {features.map((feature, idx) => (
          <Grid item xs={12} md={4} key={idx}>
            <Paper elevation={3} sx={{ p: 4, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                {feature.icon}
                <Typography variant="h5">{feature.title}</Typography>
              </Box>
              <List>
                {feature.details.map((detail, i) => (
                  <ListItem key={i} sx={{ pl: 0 }}>{detail}</ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

export default Features;