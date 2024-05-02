import Form from 'react-bootstrap/Form';

function SelectComponent({ data, value, name, handleChange }) {
  return (
    <Form.Select aria-label="Default select example" data-bs-theme="dark" value={value} name={name} onChange={handleChange}>
      <option>Open this select menu</option>
      {
        data.map((item) => {
          return (
            <option key={item.id_tipo_produto} value={item.id_tipo_produto}>{item.tipo_produto}</option>
          )
        })
      }
    </Form.Select>

  );
}

export default SelectComponent;