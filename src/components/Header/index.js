
import { Link } from 'react-router-dom';
import { FaVoteYea } from 'react-icons/fa';
import './header.scss';

export default function Header(){
    return(
      <header>
        <Link className="logo" to="/">CINE<sub>+</sub></Link>
        <Link className="favoritos" to="/favoritos">Quero Ver!</Link>
        <Link className="myMovies" to="/meusfilmes"><FaVoteYea/></Link>
      </header>
    );
}