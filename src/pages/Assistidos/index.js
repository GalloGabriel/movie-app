import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './assistidos.scss';
import { FcRating } from "react-icons/fc";
import { toast } from 'react-toastify';

export default function Assistidos(){

  const [filmes, setFilmes] = useState([]);

  useEffect( () => {

    const minhaLista = localStorage.getItem('range');
    setFilmes(JSON.parse(minhaLista) || []);

  }, [])

  function handleDelete(id){

    //filtrando nosso array e retornando todos os itens menos o clicado
    let filtroFilmes = filmes.filter((item)=>{
      return (item.id !== id)
    })

    //salvando os filmes na pagina sem o filme deletado
    setFilmes(filtroFilmes);
    localStorage.setItem('range', JSON.stringify(filtroFilmes))
    toast.success('Filme excluído com sucesso!');

  }


  return(
    <div className="container">
      <h1>Meus Filmes</h1>

      {filmes.length === 0 && 
      <span className="zeroFilmes">Você ainda não possui nenhum filme salvo :(</span> }

      <ul>
        {filmes.map((item)=>{
          return(
            <li key={item.id}>
              <span>{item.streaming}</span>
              <span className="titulo-assistidos">{item.title}</span><br/>
              <img className="image-assistidos" src={item.imagem} alt={`imagem do filme ${item.title}`}/> <br/>
              <span className="nota-assistidos">{item.nota} <br/> <FcRating /></span> 
              <br/>  
              <Link className="details" to={`/filme/${item.id}`}>Ver Detalhes</Link>            
              <button className="button-assistidos" onClick={ () => handleDelete(item.id) }>Remover</button>
            </li>
          )
        })}
      </ul>
    </div>
  );
}