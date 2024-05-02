import { useState, useEffect } from 'react';

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import PedidosService from '../../services/PedidosService.js';
import Stack from 'react-bootstrap/Stack';

function Pedidos () {
  const [serviceData, setServiceData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
  }, [serviceData]);

  async function fetchData () {
    try {
      const res = await PedidosService.buscarTodos();
      setServiceData(res.data);
    } catch (error) {
      console.error(error);
    }
  }

  const handleDelete = async (e) => {
    if (window.confirm("Você tem certeza de que deseja deletar este item?")) {
      await PedidosService.deletar(e.target.id).then((res) => {
        if (res.status === 200 && res.data.hasOwnProperty('mensagem')) {
          fetchData();
        } else {
          alert('Esse tipo de produto está relacionado a algum produto cadastrado e não pode ser excluído no momento. Remova o produto relacionado primeiro!')
        }
      }).catch(function (error) {
        console.error(error);
      });
    }
  }

  return (
    <>
    <Stack style={{gap: '3rem'}}>
      <div className="button-position" style={{marginBottom: '20px'}}>
      </div>
      <div className="container-box">
        <div className="content" style={{"justifyContent": "center"}}>
         {
          Object.values(serviceData).length !== 0  ?
          serviceData.map((item) => {
            return (
              <Card key={item.id_pedidos} style={{ width: '20rem' }} data-bs-theme="dark">
                <Card.Img variant="top" src={`http://localhost:8080${item.caminho}`} style={{width: 'auto', diplay: 'flex', height: '250px', margin: '0'}}/>
                <Card.Body>
                  <Card.Title>{item.nome}</Card.Title>
                  <Card.Body>
                    <Container>
                      <Row>
                        <Col md={12}>{`Adquirido: ${item.qtd_vendida}`}</Col>
                      </Row>
                    </Container>
                  </Card.Body>
                  <Row>
                    <Col md={6} style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>{item.valor_total}</Col>
                    <Col md={4}> 
                     <Button id={item.id_pedidos} variant="outline-danger" onClick={handleDelete}>Cancelar</Button>
                    </Col>
                    </Row>
                </Card.Body>
              </Card>
            )
          }) :
          serviceData
         }
        </div>
      </div>
    </Stack>
    </>
  );
}

export default Pedidos;