import axios from 'axios';

const ProdutosService = {
  buscarTodos: () => {
    return axios.get('http://localhost:8080/pedidos')
  },

  deletar: (id) => {
    return axios.delete(`http://localhost:8080/pedidos/${id}`)
  },

  salvar: (data) => {
    return axios.post('http://localhost:8080/pedidos', data)
  }
}

export default ProdutosService; 