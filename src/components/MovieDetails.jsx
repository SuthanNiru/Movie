import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
} from '@mui/material';

const API_KEY = 'b6f8334d7a06769840ee3a17fdea01f6';
const BASE_URL = 'https://api.themoviedb.org/3';

const MovieDetails = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState([0, 10]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/genre/movie/list`, {
          params: { api_key: API_KEY },
        });
        setGenres(res.data.genres);
      } catch (err) {
        console.error('Failed to fetch genres');
      }
    };

    fetchGenres();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${BASE_URL}/discover/movie`, {
        params: {
          api_key: API_KEY,
          page,
          with_genres: selectedGenre,
          primary_release_year: year,
          'vote_average.gte': rating[0],
          'vote_average.lte': rating[1],
        },
      });

      setMovies((prev) => [...prev, ...res.data.results]);
      setHasMore(res.data.page < res.data.total_pages);
    } catch (err) {
      setError('Failed to fetch movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
  }, [selectedGenre, year, rating]);

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line
  }, [page, selectedGenre, year, rating]);

  const handleLoadMore = () => {
    if (hasMore && !loading) setPage((prev) => prev + 1);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
         Movie Details
      </Typography>

      <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Genre</InputLabel>
          <Select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
            label="Genre"
          >
            <MenuItem value="">All</MenuItem>
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Year</InputLabel>
          <Select value={year} onChange={(e) => setYear(e.target.value)} label="Year">
            <MenuItem value="">All</MenuItem>
            {Array.from({ length: 25 }, (_, i) => 2024 - i).map((yr) => (
              <MenuItem key={yr} value={yr}>
                {yr}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ width: 200 }}>
          <Typography gutterBottom>Rating</Typography>
          <Slider
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={10}
            step={0.5}
          />
        </Box>
      </Box>

      <Grid container spacing={4}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={3} key={movie.id}>
            <Card sx={{ height: '100%' }}>
              <CardMedia
                component="img"
                height="400"
                image={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/500x750?text=No+Image'
                }
                alt={movie.title}
              />
              <CardContent>
                <Typography variant="h6" color="text.primary">
                  {movie.title}
                </Typography>
                <Typography color="text.secondary">
                  Rating: {movie.vote_average}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {movie.overview.length > 100
                    ? movie.overview.substring(0, 100) + '...'
                    : movie.overview}
                </Typography>
                {movie?.video && (
                  <Box sx={{ mt: 1 }}>
                    <iframe
                      width="100%"
                      height="200"
                      src={`https://www.youtube.com/embed/${movie.video}`}
                      title={movie.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Box sx={{ mt: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Box>
      )}

      {hasMore && !loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button variant="contained" onClick={handleLoadMore}>
            Load More
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default MovieDetails;