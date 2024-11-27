import React, { useState } from 'react';
import sw from './data';
import './App.css';
import MovieCard from './Components/MovieCard'; // Assuming MovieCard is in a separate file
import MovieDetails from './Components/MovieDetails'; // Assuming MovieDetails is in a separate file

function App() {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [comments, setComments] = useState({});

  const handleMoreClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCommentSubmit = (movieId, name, comment) => {
    setComments({
      ...comments,
      [movieId]: [...(comments[movieId] || []), { name, comment }],
    });
  };

  const handleClose = () => {
    setSelectedMovie(null); // Reset selected movie to close details
  };

  return (
    <div className="container">
      <div className="row">
        {sw.map((movie) => (
          <div className="col-6 col-md-4" key={movie.episode}>
            <MovieCard movie={movie} onMoreClick={handleMoreClick} />
          </div>
        ))}
      </div>
      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          comments={comments[selectedMovie.episode] || []}
          onCommentSubmit={handleCommentSubmit}
          onClose={handleClose} // Pass the close function
        />
      )}
    </div>
  );
}

export default App;