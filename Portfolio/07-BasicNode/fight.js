import {randomSuperhero} from 'superheroes';
import {randomSupervillain} from 'supervillains';

var Hero = randomSuperhero();
var Villain = randomSupervillain();

console.log(Hero + " VS " + Villain);