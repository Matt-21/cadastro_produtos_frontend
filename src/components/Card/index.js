import { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";

import Dinero from '../../../node_modules/dinero.js/src/dinero.js'
import Card from 'react-bootstrap/Card';
import ContainerComponent from '../Container/index.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ModalComponent from '../../components/Modal/index.js';
import InputPedidos from '../../components/Inputs/Pedidos/index.js';
import PedidosService from '../../services/PedidosService.js';

function CardComponent({ item }) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    id_produto: '',
    qtd_vendida: '',
    valor_total: ''
  });

  const divRef = useRef(null);
  const navigate = useNavigate();

  const handleSave = async () => {
    data.valor_total = divRef.current.textContent;
    await PedidosService.salvar(data).then((res) => {
      if (res.status === 200) {
        navigate("/pedidos")
      }
    }).catch(function (error) {
      console.log(error);
    });
    setShow(false);
  };

  const handleShow = (e) => {
    data.id_produto = e.target.id;
    setShow(true);
  };

  const handleValores = (valor) => {
    let total = parseInt(valor, 10) * 100;
    return Dinero({ amount: total, currency: 'BRL' }).toFormat('$0,0.00')
  }

  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  }

  return (
    <Card style={{ width: '20rem' }} data-bs-theme="dark">
      <Card.Img variant="top" src={`http://localhost:8080${item.caminho}`} style={{width: 'auto', diplay: 'flex', height: '250px', margin: '0'}}/>
      <Card.Body>
        <Card.Title>{item.nome}</Card.Title>
          <Card.Body>
             <ContainerComponent item={item} handler={handleValores}/>
          </Card.Body>
          <Row>
            <Col md={6} style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>{handleValores(item.valor_total)}</Col>
            <Col md={4}> 
              <ModalComponent 
                  id={item.id_produto}
                  handleSave={handleSave}
                  onClick={handleShow} 
                  title={item.nome}
                  children={
                    <InputPedidos state={data} handleChange={handleChange} item={item}/>
                  }
                  type={'button'} 
                  show={show} 
                  setShow={setShow} 
                  variant={"outline-success"} 
                  buttonText={"Comprar"}
                  text={"Comprar"}
                  price={<Col md={6} ref={divRef} name="valor_total" style={{ fontWeight: 'bold', fontSize: '1.4rem', color: '#fff' }}>{handleValores(data.qtd_vendida > 1 ? item.valor_total *data.qtd_vendida : item.valor_total)}</Col>}
                />
              </Col>
          </Row>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;

//