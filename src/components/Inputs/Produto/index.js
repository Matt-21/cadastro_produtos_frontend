import { useState, useEffect } from 'react';

import Form from 'react-bootstrap/Form';
import TipoProdutosService from '../../../services/TipoProdutosService.js';
import InputGroup from 'react-bootstrap/InputGroup';
import SelectComponent from '../../Select';

function InputProduto ({ state, handleChange, handleSubmit }) {
  const [serviceData, setServiceData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData () {
    try {
      const res = await TipoProdutosService.buscarTodos();
      setServiceData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form id='my-form' onSubmit={handleSubmit}>
      <InputGroup className="mb-2" style={{ width: "98%" }}>
        <Form.Control value={ state.nome } name='nome' placeholder='Nome' onChange={ handleChange } data-bs-theme="dark"/>
      </InputGroup>
      <InputGroup style={{ width: "98%" }}>
        <SelectComponent 
          value={ state.id_tipo_produto } 
          name='id_tipo_produto' 
          placeholder='Tipo de Produto' 
          data={serviceData} 
          handleChange={ handleChange }
        />
      </InputGroup>
      <InputGroup className="mb-2" style={{ width: "98%" }} >
        <Form.Control value={ state.valor } name='valor' placeholder='Valor' onChange={ handleChange } data-bs-theme="dark" />
      </InputGroup>
      <InputGroup className="mb-2" style={{ width: "98%" }}>
        <Form.Control value={ state.qtd_estoque } name='qtd_estoque' placeholder='Quantidade em Estoque' onChange={ handleChange } data-bs-theme="dark"/>
      </InputGroup>
      <InputGroup className="mb-2" style={{ width: "98%" }}>
        <Form.Control type="file" value={ state.caminho } name='image' onChange={ handleChange } data-bs-theme="dark"/>
      </InputGroup>
    </Form>
  );
}

export default InputProduto;