import { useEffect, useState } from 'react';
import './assistidos.scss';
import { FcRating } from "react-icons/fc";

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
              <span className="titulo-assistidos">{item.title}</span><br/>
              <img className="image-assistidos" src={item.imagem} alt={`imagem do filme ${item.title}`}/> <br/>
              <span className="nota-assistidos">{item.nota} <br/> <FcRating /></span> 
              <details>
                <summary>Mais Detalhes</summary>
                <br/>
                <div className="comentario-assistidos">Comentário: <br/> 
                <p>{item.comentario}</p>
                </div> <br/>
                <span>Assistiu em: {item.streaming}</span>
              </details>
            </li>
          )
        })}
      </ul>
    </div>
  );
}