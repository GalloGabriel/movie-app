import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './favoritos.scss';

export default function Favoritos(){

  const [filmes, setFilmes] = useState([]);

  useEffect(()=>{

    const minhaLista = localStorage.getItem('filmes');
    setFilmes(JSON.parse(minhaLista) || []);

  }, []);

  return(
    <div id="meus-filmes">
      <h1>Meus Filmes</h1>

      <ul>
        {filmes.map((item)=>{
          return(
            <li key={item.id}>
              <span className="title">{item.nome}</span><br/>
              <img className="poster" src={item.foto} alt={item.nome}/>

              <div>
                <Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
                <button onClick={()=>{}}>Remover</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
}