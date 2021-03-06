import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './assistidos.scss';
import { FcRating } from "react-icons/fc";
import { toast } from 'react-toastify';

export default function Assistidos(){

  const [filmes, setFilmes] = useState([]);
  const [range, setRange] = useState('0');
  const [streaming, setStreaming] = useState('');

  useEffect( () => {

    const minhaLista = localStorage.getItem('range');
    let minhaListaJson = JSON.parse(minhaLista);    
    setFilmes((minhaListaJson) || []);

  }, [])

  function editaFilme(id){
    
    let ranges = JSON.parse(localStorage.range);
    for(var i = 0; i < ranges.length; i++){
      if(id === ranges[i].id){
        ranges[i].nota = range;
        ranges[i].streaming = streaming;
        ranges[i].editing = false;
        break;
      }
    }
    localStorage.setItem('range', JSON.stringify(ranges));
    document.location.reload();
  }

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

  function toggleModal(id){      

    let ranges = JSON.parse(localStorage.range);
    for(var i = 0; i < ranges.length; i++){
      if(id === ranges[i].id){
        ranges[i].editing = true;
        break;
      }
    }
    localStorage.setItem('range', JSON.stringify(ranges));
    document.location.reload();
    
  }

  function closeModal(id){
    let ranges = JSON.parse(localStorage.range);
    for(var i = 0; i < ranges.length; i++){
      if(id === ranges[i].id){
        ranges[i].editing = false;
        break;
      }
    }
    localStorage.setItem('range', JSON.stringify(ranges));
    document.location.reload();
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
              
              <span className="titulo-assistidos">{item.title}</span><br/>
              <img className="image-assistidos" src={item.imagem} alt={`imagem do filme ${item.title}`}/> <br/>
              <span className="nota-assistidos">{item.nota} <br/> <FcRating /></span>     

              {item.streaming === 'Netflix' && 
              <div className="netflix">{item.streaming}</div>}  

              {item.streaming === 'Telecine Play' &&
              <div className="telecine">{item.streaming}</div>} 

              {item.streaming === 'Amazon Prime Video' &&
              <div className="amazon">{item.streaming}</div>} 
              
              {item.streaming === 'HBO Max' &&
              <div className="hbo">{item.streaming}</div>}  
              
              {item.streaming === 'Disney+' &&
              <div className="disney">{item.streaming}</div>} 
              
              {item.streaming === 'Cinema' &&
              <div className="cinema">{item.streaming}</div>} 

              {item.streaming === 'Globoplay' &&
              <div className="globoplay">globoplay</div>} 
              
              {item.streaming === 'Outros' &&
              <div className="outros">{item.streaming}</div>}}

              {item.streaming === '' &&
              <div className="vazio"></div>}

              <br/>  
              <div className="botoes-assistidos">
              <Link className="details" to={`/filme/${item.id}`}>Ver Detalhes</Link>  
              <button className="edit-button" id="toggleModal" onClick={() => toggleModal(item.id) }>Editar</button>          
              <button className="button-assistidos" onClick={ () => handleDelete(item.id) }>Remover</button>
              </div>

              { item.editing ?
                <div id="myModal" className="modal-assistidos">
                <span onClick={()=>closeModal(item.id)} className="close">&times;</span>
                <h1 id="titulo">Edite sua avaliação</h1>

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

                <button className="btnModal" onClick={() => editaFilme(item.id) }>Salvar Filme</button>
          
              </div>
               :
               null
              }
              
  
            </li>
          )
        })}
      </ul>
    </div>
  );
}