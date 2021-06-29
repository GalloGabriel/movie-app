import './erro.scss';
import { Link } from 'react-router-dom';

export default function Erro(){
  return(
    <div className="not-found">
      <h1 className="title-error">404 - Essa página não existe!</h1>
      <Link className="back-home" to="/">Ir para Home</Link>
    </div>
  );
}