import React, { useState } from 'react';

import phantomMenace from '../images/SW1-The_phantom_menace.jpg';
import attackOfTheClones from '../images/SW2-Attack_of_the_Clones.jpg';
import revengeOfTheSith from '../images/SW3-Revenge_of_the_sith.jpg';
import quiGonJinn from '../images/Qui-Gon_Jinn.png';
import obiWanKenobi from '../images/Obi-wan_Kenobi.jpg';
import anakinSkywalker from '../images/Anakin_Skywalker.png';
import leiaOrgana from '../images/Leia_Organa.jpeg';
import darthVader from '../images/Darth_Vader.jpeg';
import lukeSkywalker from '../images/Luke_Skywalker.jpeg';


const imageMap = {
  'The phantom menace': phantomMenace,
  'Attack of the clones': attackOfTheClones,
  'Revenge of the Sith': revengeOfTheSith,
  'A new hope': leiaOrgana, 
  'The empire strikes back': darthVader,
  'The return of the Jedi': lukeSkywalker,
};

const MovieCard = ({ movie, onMoreClick }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="card" 
         onMouseEnter={() => setIsHovered(true)} 
         onMouseLeave={() => setIsHovered(false)}>
      <img 
        src={imageMap[movie.title]}
        className="card-img-top" 
        alt={movie.title} 
      />
      <div className="card-body">
        <h5 className="card-title">{movie.title}</h5>
        <h6 className="card-subtitle mb-2 text-body-secondary">{movie.year}</h6>
        <a href="#" className="card-link" onClick={() => onMoreClick(movie)}>More...</a>
      </div>
      {isHovered && (
        <div className={`affiliation-logo ${movie.best_character.affiliation.toLowerCase()}`}></div>
      )}
    </div>
  );
};

export default MovieCard;