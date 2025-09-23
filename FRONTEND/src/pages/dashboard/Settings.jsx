import { Box, Typography, Paper, Divider, TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useState } from 'react';

const Settings = () => {
  const [language, setLanguage] = useState('English');
  const [department, setDepartment] = useState('Human Resources');
  const [role, setRole] = useState('HR Manager');
  const [password, setPassword] = useState('');

  return (
    <Box display="flex" justifyContent="center" alignItems="flex-start" minHeight="60vh">
      <Paper elevation={3} sx={{ p: 4, minWidth: 350, maxWidth: 500 }}>
        <Typography variant="h5" gutterBottom>Settings</Typography>
        <Divider sx={{ my: 2 }} />

        {/* Change Password */}
        <Typography variant="subtitle1" gutterBottom>Change Password</Typography>
        <TextField
          label="New Password"
          type="password"
          fullWidth
          value={password}
          onChange={e => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button variant="contained" color="primary" fullWidth sx={{ mb: 3 }}>
          Update Password
        </Button>

        {/* Language Preference */}
        <Typography variant="subtitle1" gutterBottom>Language Preference</Typography>
        <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel>Language</InputLabel>
          <Select
            value={language}
            label="Language"
            onChange={e => setLanguage(e.target.value)}
          >
            <MenuItem value="English">English</MenuItem>
            <MenuItem value="Hindi">Hindi</MenuItem>
            <MenuItem value="Telugu">Telugu</MenuItem>
            <MenuItem value="Tamil">Tamil</MenuItem>
            <MenuItem value="French">French</MenuItem>
          </Select>
        </FormControl>

        {/* Department and Role */}
        <Typography variant="subtitle1" gutterBottom>Department</Typography>
        <TextField
          label="Department"
          fullWidth
          value={department}
          onChange={e => setDepartment(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Typography variant="subtitle1" gutterBottom>Role</Typography>
        <TextField
          label="Role"
          fullWidth
          value={role}
          onChange={e => setRole(e.target.value)}
          sx={{ mb: 2 }}
        />

        <Divider sx={{ my: 2 }} />

        {/* About */}
        <Typography variant="subtitle1" gutterBottom>About</Typography>
        <Typography variant="body2" color="text.secondary">
          This Trading Platform allows traders to manage their portfolios, track performance, and execute trades.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Settings; 