import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import api from '../../services/api';
import './filme-info.scss';

export default function Filme(){

  const {id} = useParams();

  const history = useHistory();

  const [infoMovie, setInfoMovie] = useState([]);

  const [load, setLoad] = useState(true);

  useEffect(() => {

    async function loadFilmDetails(){

        const response = await api.get(`r-api/?api=filmes/${id}`);
        
        if(response.data.length === 0){
          //Tentou acessar com um id que não existe, navego usuário para a home
          history.replace('/');
          return;
        }
        

        setInfoMovie(response.data);

        setLoad(false);

    }

    loadFilmDetails();

    return () => {
      console.log('Componente desmontado');
    } 

  }, [history, id]);

  if(load){
    return(
      <div className="filmeInfo">
        <h1>Carregando filme...</h1>
    </div>
    );
  }

  return(
    <div className="filmeInfo">
        <h1 className="nomeFilme"> {infoMovie.nome} </h1>
        <img src={infoMovie.foto} alt={infoMovie.nome}/>
        <h3>Sinopse:</h3>
        <p>{infoMovie.sinopse}</p>

        <div className="buttons">
          <button onClick={()=>{}}>Salvar</button>
          <button>
            <a target="_blank" rel="noreferrer" href={`https://youtube.com/results?search_query=${infoMovie.nome} Trailer`}> 
              Trailer 
            </a>
          </button>
        </div>
    </div>
  );
}