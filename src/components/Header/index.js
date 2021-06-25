
import { Link } from 'react-router-dom';
import './header.scss';

export default function Header(){
    return(
      <header>
        <Link className="logo" to="/">CINE<sub>+</sub></Link>
        <Link className="favoritos" to="/favoritos">Salvos</Link>
      </header>
    );
}