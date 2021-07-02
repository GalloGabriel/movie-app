import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './favoritos.scss';
import { toast } from 'react-toastify';

export default function Favoritos(){

  const [filmes, setFilmes] = useState([]);

  useEffect(()=>{

    const minhaLista = localStorage.getItem('filmes');
    setFilmes(JSON.parse(minhaLista) || []);

  }, []);

  function handleDelete(id){

    //filtrando nosso array e retornando todos os itens menos o clicado
    let filtroFilmes = filmes.filter((item)=>{
      return (item.id !== id)
    })

    //salvando os filmes na pagina sem o filme deletado
    setFilmes(filtroFilmes);
    localStorage.setItem('filmes', JSON.stringify(filtroFilmes))
    toast.success('Filme excluído com sucesso!');

  }

  return(
    <div id="meus-filmes">
      <h1>Meus Filmes</h1>

      {filmes.length === 0 && 
      <span className="zeroFilmes">Você ainda não possui nenhum filme salvo :(</span> }

      <ul>
        {filmes.map((item)=>{
          return(
            <li key={item.id}>
              <span className="title">{item.nome}</span><br/>
              <img className="poster" src={item.foto} alt={item.nome}/>

              <div className="botoes">
                <Link to={`/filme/${item.id}`}>Ver Detalhes</Link>
                <button onClick={ () => handleDelete(item.id) }>Remover</button>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  );
}