import { useEffect, useState } from 'react';
import './assistidos.scss';

export default function Assistidos(){

  const [filmes, setFilmes] = useState([]);

  useEffect( () => {

    const minhaLista = localStorage.getItem('range');
    setFilmes(JSON.parse(minhaLista) || []);

  }, [])


  return(
    <div className="container">
      <h1>Meus Filmes</h1>

      {filmes.length === 0 && 
      <span className="zeroFilmes">Você ainda não possui nenhum filme salvo :(</span> }

      <ul>
        {filmes.map((item)=>{
          return(
            <li key={item.id}>
              <span>{item.title}</span><br/>
              <img src={item.imagem} alt={`imagem do filme ${item.title}`}/> <br/>
              <span>{item.nota}</span> <br/>
              <span>Comentário: <br/> {item.comentario}</span> <br/>
              <span>Assistiu em: {item.streaming}</span>

            </li>
          )
        })}
      </ul>
    </div>
  );
}