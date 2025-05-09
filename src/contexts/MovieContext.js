// src/context/MovieContext.js
import React, { createContext, useState, useEffect } from 'react';

export const MovieContext = createContext();

const defaultMovies = [
  {
    id: 1,
    title: 'Inception',
    year: 2010,
    rating: 4.5,
    poster: require('../assets/inception.jpeg'),
  },
  {
    id: 2,
    title: 'Interstellar',
    year: 2014,
    rating: 4.8,
    poster: require('../assets/interesteller.jpeg'),
  },
  {
    id: 3,
    title: 'The Batman',
    year: 2022,
    rating: 4.1,
    poster: require('../assets/batman.jpeg'),
  },
  {
    id: 4,
    title: 'Dune',
    year: 2021,
    rating: 4.4,
    poster: require('../assets/Dune.jpg'),
  },
];

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState(defaultMovies);
  const [favorites, setFavorites] = useState(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });

  const [lastSearch, setLastSearch] = useState(() => {
    return localStorage.getItem('lastSearch') || '';
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (lastSearch) {
      localStorage.setItem('lastSearch', lastSearch);
    }
  }, [lastSearch]);

  const toggleFavorite = (movie) => {
    const exists = favorites.find((fav) => fav.id === movie.id);
    if (exists) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        favorites,
        toggleFavorite,
        lastSearch,
        setLastSearch,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
