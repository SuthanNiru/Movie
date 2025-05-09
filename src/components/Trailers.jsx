import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Trailers = ({ movieId }) => {
  const [trailers, setTrailers] = useState([]);
  const [error, setError] = useState(null);

  const API_KEY = 'b6f8334d7a06769840ee3a17fdea01f6'; // Replace with your actual TMDb API key

  useEffect(() => {
    const fetchTrailers = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${API_KEY}`
        );
        const youtubeTrailers = response.data.results.filter(
          (video) => video.site === 'YouTube' && video.type === 'Trailer'
        );
        setTrailers(youtubeTrailers);
      } catch (err) {
        console.error(err);
        setError('Failed to load trailers');
      }
    };

    if (movieId) {
      fetchTrailers();
    }
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (trailers.length === 0) return <p>No trailers found.</p>;

  return (
    <div className="trailers-container">
      {trailers.map((trailer) => (
        <div key={trailer.id} className="trailer">
          <h3>{trailer.name}</h3>
          <iframe
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title={trailer.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ))}
    </div>
  );
};

export default Trailers;
