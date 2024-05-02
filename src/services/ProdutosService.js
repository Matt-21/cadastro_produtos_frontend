import axios from 'axios';

const headers = {
  'Content-Type': 'multipart/form-data'
}

const ProdutosService = {
  buscarTodos: () => {
    return axios.get('http://localhost:8080/produtos')
  },

  salvar: (data) => {
    return axios.post('http://localhost:8080/produtos', data, { headers: headers })
  }
}

export default ProdutosService; 