import React, { useState } from 'react';

const MovieDetails = ({ movie, comments, onCommentSubmit, onClose }) => {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onCommentSubmit(movie.episode, name, comment); // Use the passed function
    setName('');
    setComment('');
  };

  return (
    <div className="movie-details">
      <button onClick={onClose}>Close</button>
      <h2>{movie.title} ({movie.year})</h2>
      <img src={`images/${movie.poster}`} alt={movie.title} />
      <h3>Main Character: {movie.best_character.name}</h3>
      <img src={`images/${movie.best_character.image}`} alt={movie.best_character.name} />
      <p>{movie.best_character.bio}</p>
      <div className={`affiliation-logo ${movie.best_character.affiliation.toLowerCase()}`}></div>

      <h3>Comments</h3>
      <ul>
        {comments.map((c, index) => (
          <li key={index}><strong>{c.name}</strong>: {c.comment}</li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Your name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <textarea 
          placeholder="Your comment" 
          value={comment} 
          onChange={(e) => setComment (e.target.value)} 
          required 
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default MovieDetails;