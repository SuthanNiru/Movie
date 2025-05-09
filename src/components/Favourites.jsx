import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  IconButton,
  TextField,
  Button,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_KEY = 'b6f8334d7a06769840ee3a17fdea01f6';

const Favourites = () => {
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Manual input states
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [poster, setPoster] = useState('');

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favoriteMovies');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const searchMovies = async () => {
    if (!searchQuery.trim()) return;
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${searchQuery}`
      );
      setSearchResults(res.data.results || []);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const addToFavorites = (movie) => {
    const alreadyAdded = favorites.find((fav) => fav.id === movie.id);
    if (alreadyAdded) return alert('Movie already in favorites!');
    const newMovie = {
      id: movie.id,
      title: movie.title,
      year: movie.release_date ? movie.release_date.slice(0, 4) : 'Unknown',
      poster: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : 'https://via.placeholder.com/300x400?text=No+Image',
    };
    const updated = [...favorites, newMovie];
    setFavorites(updated);
    localStorage.setItem('favoriteMovies', JSON.stringify(updated));
  };

  const addManualMovie = () => {
    if (!title.trim()) return alert('Please enter a movie title.');
    const newMovie = {
      id: Date.now(),
      title,
      year: year || 'Unknown',
      poster: poster || 'https://via.placeholder.com/300x400?text=No+Image',
    };
    const updated = [...favorites, newMovie];
    setFavorites(updated);
    localStorage.setItem('favoriteMovies', JSON.stringify(updated));
    setTitle('');
    setYear('');
    setPoster('');
  };

  const removeFromFavorites = (movieId) => {
    const updated = favorites.filter((movie) => movie.id !== movieId);
    setFavorites(updated);
    localStorage.setItem('favoriteMovies', JSON.stringify(updated));
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Favourite Movies
      </Typography>

      {/* Search Section */}
      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        <TextField
          label="Search Movies"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={searchMovies}>
          Search
        </Button>
      </Box>

      {/* Manual Add Section */}
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          maxWidth: 400,
          mb: 4,
        }}
        onSubmit={(e) => {
          e.preventDefault();
          addManualMovie();
        }}
      >
        <Typography variant="h6">Add Your Favourite Movie</Typography>
        <TextField
          label="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <TextField
          label="Poster URL"
          value={poster}
          onChange={(e) => setPoster(e.target.value)}
        />
        <Button type="submit" variant="outlined" color="secondary">
          Add Manually
        </Button>
      </Box>

      {/* Search Results Display */}
      {searchResults.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom>
            Search Results
          </Typography>
          <Grid container spacing={4} sx={{ mb: 4 }}>
            {searchResults.map((movie) => (
              <Grid item xs={12} sm={6} md={3} key={movie.id}>
                <Card>
                  <CardMedia
                    component="img"
                    height="400"
                    image={
                      movie.poster_path
                        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                        : 'https://via.placeholder.com/300x400?text=No+Image'
                    }
                    alt={movie.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{movie.title}</Typography>
                    <Typography color="text.secondary">
                      Year: {movie.release_date?.slice(0, 4) || 'Unknown'}
                    </Typography>
                  </CardContent>
                  <Button
                    fullWidth
                    onClick={() => addToFavorites(movie)}
                    variant="outlined"
                    color="primary"
                  >
                    Add to Favourites
                  </Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {/* Favorite Movies List */}
      <Typography variant="h5" gutterBottom>
        Your Favourite List
      </Typography>
      {favorites.length === 0 ? (
        <Typography variant="body1">
          You haven't added any favourite movies yet.
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {favorites.map((movie) => (
            <Grid item xs={12} sm={6} md={3} key={movie.id}>
              <Card sx={{ height: '100%', position: 'relative' }}>
                <Link to={`/details/${movie.id}`} style={{ textDecoration: 'none' }}>
                  <CardMedia
                    component="img"
                    height="400"
                    image={movie.poster}
                    alt={movie.title}
                  />
                </Link>
                <CardContent>
                  <Typography variant="h6">{movie.title}</Typography>
                  <Typography color="text.secondary">Year: {movie.year}</Typography>
                </CardContent>
                <IconButton
                  sx={{ position: 'absolute', top: 8, right: 8, color: 'red' }}
                  onClick={() => removeFromFavorites(movie.id)}
                >
                  <FavoriteIcon />
                </IconButton>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Favourites;
