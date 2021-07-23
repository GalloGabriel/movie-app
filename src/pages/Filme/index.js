import { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import api from '../../services/api';
import $ from "jquery";
import './filme-info.scss';
import { FcRating } from "react-icons/fc";
import { toast } from 'react-toastify';

export default function Filme(){

  const {id} = useParams();

  const history = useHistory();

  const [infoMovie, setInfoMovie] = useState([]);
  const [load, setLoad] = useState(true);
  const [range, setRange] = useState('0');
  const [streaming, setStreaming] = useState('');


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


  function salvaFilme(){
    
    const minhaLista = localStorage.getItem('filmes');

    //transforma o resultado de minhaLista em JSON
    //Caso o resultado de getItem venha vazio, usamos: || []
    let filmesSalvos = JSON.parse(minhaLista) || [];

    //Se já tiver o filme salvo com o mesmo id, precisa ignorar
    const hasFilme = filmesSalvos.some( (filmesalvo) => filmesalvo.id === infoMovie.id );

    if(hasFilme){
      toast.error('Você já possui esse filme salvo.');
      return;
    }

    
    filmesSalvos.push(infoMovie);
    localStorage.setItem('filmes', JSON.stringify(filmesSalvos));
    toast.success('Filme salvo com sucesso!');

  }

  function addFilme(){    

    let finalRange = {
      id: infoMovie.id,
      imagem: infoMovie.foto,
      title: infoMovie.nome,
      nota: range,
      streaming: streaming
    }

    const allRange = localStorage.getItem('range');

    let filmesSalvos = JSON.parse(allRange) || [];

    //Se já tiver o filme salvo com o mesmo id, precisa ignorar
    const hasFilme = filmesSalvos.some( (filmesalvo) => filmesalvo.id === infoMovie.id );

    if(hasFilme){
      toast.error('Você já possui esse filme salvo.');
      return;
    }


    filmesSalvos.push(finalRange);
    localStorage.setItem('range', JSON.stringify(filmesSalvos));
    toast.success('Filme salvo com sucesso!');

  }


  
  if(load){
    return(
      <div className="filmeInfo">
        <h1>Carregando filme...</h1>
    </div>
    );
  }

  function toggleModal(){
    let modal = document.getElementById('myModal');
    let span = document.getElementsByClassName('close')[0];
    let body = document.getElementsByClassName('app')[0];
    let range = document.getElementById('range');
    let titulo = document.getElementById('titulo');
    let label01 = document.getElementById('label01');
    let selectModal = document.getElementById('selectModal');
    let rangeNumber = document.getElementById('rangeNumber');
    let label03 = document.getElementById('label03');

    modal.style.display = "block";
    $("#myModal").animate({top: "125px", opacity: "1"},1000);

    span.onclick = function(){
      modal.style.display = "none";
    }
    
    body.onclick = function(event){
      if(event.target === modal || event.target === range || 
         event.target === titulo || event.target === label01 || 
         event.target === selectModal || event.target === rangeNumber || 
         event.target === label03){
            modal.style.display = "block";
      }else{
            modal.style.display = "none";
      } 
    }  
  }

  return(
    <div className="filmeInfo">

        <div id="myModal" className="modal">
          <span className="close">&times;</span>
          <h1 id="titulo">Avalie este filme!</h1>

          <label id="label01">Nota do Filme:</label><br/>
          <input id="range" type="range" min="0" max="10" step="0.5" value={range}
                  onChange={(e)=> setRange(e.target.value)} /> 
          <span id="rangeNumber" className="valueRange">{range} <FcRating/></span>
          <br/><br/><br/>

          <label id="label03">Onde você assistiu esse filme?</label><br/>
          <select id="selectModal" value={streaming} 
            onChange={(e) => setStreaming(e.target.value)}>
            <option hidden>--Selecione--</option>
            <option>Cinema</option>
            <option>Netflix</option>
            <option>Amazon Prime Video</option>
            <option>Disney+</option>
            <option>HBO Max</option>
            <option>Globoplay</option>
            <option>Telecine Play</option>
            <option>Outros</option>
          </select><br/><br/>

          <br/>

          <button className="btnModal" onClick={addFilme}>Salvar Filme</button>
          
        </div>

        <h1 className="nomeFilme"> {infoMovie.nome} </h1>
        <img src={infoMovie.foto} alt={infoMovie.nome}/>
        <h3>Sinopse:</h3>
        <p>{infoMovie.sinopse}</p>

        <div className="buttons">
          <button onClick={ salvaFilme }>Quero Ver!</button>
          <button id="toggleModal" onClick={ toggleModal }>+</button>
          <button>
            <a target="_blank" rel="noreferrer" href={`https://youtube.com/results?search_query=${infoMovie.nome} Trailer`}> 
              Trailer 
            </a>
          </button>
        </div>
    </div>
  );
}