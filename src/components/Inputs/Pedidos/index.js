
import Form from 'react-bootstrap/Form';
import CardImg from 'react-bootstrap/CardImg'
import InputGroup from 'react-bootstrap/InputGroup';

function InputPedidos ({ state, handleChange, handleSubmit, item }) {
  return (
    <Form id='my-form' onSubmit={handleSubmit}>
      <InputGroup className="mb-2" style={{ width: "98%", justifyContent: 'center' }}>
        <CardImg variant="top" src={`http://localhost:8080${item.caminho}`} style={{width: '80%', diplay: 'flex', height: '50%', margin: 'auto 0'}}/>
      </InputGroup>
      <InputGroup className="mb-2" style={{ width: "98%", position: 'relative', top: '20px' }}>
        <Form.Control 
          type="number" 
          value={state.qtd_vendida}
          name='qtd_vendida' 
          placeholder='Quantidade' 
          onChange={ handleChange } 
          data-bs-theme="dark"
          min={"1"}
          max={item.qtd_estoque}
        />
      </InputGroup>
    </Form>
  );
}

export default InputPedidos;