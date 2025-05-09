import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import TrendingMovies from '../components/TrendingMovies'; // Adjust path as needed

const Home = () => {
  return (
    <>
      <Box
        sx={{
          height: '80vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f5f5f5',
          textAlign: 'center',
          padding: 4,
        }}
      >
        <Typography variant="h2" gutterBottom>
          Welcome to Our Platform
        </Typography>
        <Typography variant="h6" gutterBottom>
          Explore the best movies, series, and more!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => console.log('Explore Now!')}
          sx={{ mt: 3 }}
        >
          Explore Now
        </Button>
      </Box>

      {/* Inject trending section */}
      <TrendingMovies />
    </>
  );
};

export default Home;
