import axios from 'axios';

// Base URL = https://sujeitoprogramador.com/   rota que não muda

// r-api/?api=filmes/  > rota que traz todos os filmes

// r-api/?api=filmes/IDdoFilme > rota que traz filme especifico


//Criando BaseUrl

const api = axios.create({
  baseURL: 'https://sujeitoprogramador.com'
})

export default api;