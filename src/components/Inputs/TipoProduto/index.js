import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';


function InputTipoProduto ({ state, handleChange }) {

  return (
    <>
    <InputGroup className="mb-2" style={{ width: "98%" }}>
      <Form.Control value={ state.tipo_produto } name='tipo_produto' placeholder='Tipo de Produto' onChange={ handleChange } />
    </InputGroup>
    <InputGroup style={{ width: "98%" }}>
        <Form.Control value={ state.valor_imposto } name='valor_imposto' placeholder='Valor do Imposto' onChange={ handleChange } />
    </InputGroup>
    </>
  );
}

export default InputTipoProduto;