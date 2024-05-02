import axios from 'axios';

const TipoProdutosService = {

  buscarTodos: () => {
    return axios.get('http://localhost:8080/tipoProduto')
  },

  buscarPorId: (id) => {
    return axios.get(`http://localhost:8080/tipoProduto/${id}`)
  },

  deletar: (id) => {
    return axios.delete(`http://localhost:8080/${id}`)
  },

  atualizar: (data) => {
    return axios.put(`http://localhost:8080/tipoProduto`, data)
  },
  
  salvar: (data) => {
    return axios.post('http://localhost:8080/tipoProduto', data)
  }
}

export default TipoProdutosService; 