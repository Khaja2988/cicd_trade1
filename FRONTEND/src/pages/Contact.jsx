import { Box, Container, Typography, Paper, List, ListItem, ListItemIcon } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const Contact = () => (
  <Box sx={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>Contact Sales</Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          We'd love to hear from you! Reach out to our sales team for more information or a personalized demo.
        </Typography>
        <List sx={{ mt: 3 }}>
          <ListItem>
            <ListItemIcon><EmailIcon color="primary" /></ListItemIcon>
            <Typography variant="body1">sales@ems-company.com</Typography>
          </ListItem>
          <ListItem>
            <ListItemIcon><PhoneIcon color="primary" /></ListItemIcon>
            <Typography variant="body1">+1 (555) 123-4567</Typography>
          </ListItem>
          <ListItem>
            <ListItemIcon><LocationOnIcon color="primary" /></ListItemIcon>
            <Typography variant="body1">123 EMS Avenue, Suite 100, New York, NY 10001</Typography>
          </ListItem>
        </List>
      </Paper>
    </Container>
  </Box>
);

export default Contact; 