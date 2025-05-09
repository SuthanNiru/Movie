import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

const TrendingMovies = () => {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = 'b6f8334d7a06769840ee3a17fdea01f6'; // Your TMDb API key

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
        );
        setTrending(res.data.results || []);
      } catch (error) {
        console.error('Failed to fetch trending movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        🔥 Trending Movies
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={4}>
          {trending.slice(0, 8).map((movie) => (
            <Grid item xs={12} sm={6} md={3} key={movie.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="350"
                  image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <CardContent>
                  <Typography variant="h6" noWrap>
                    {movie.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Release: {movie.release_date || 'N/A'}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating: {movie.vote_average || 'N/A'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default TrendingMovies;
