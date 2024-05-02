import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function ContainerComponent ({ item, handler }) {
  return (
    <Container>
      <Row>
        <Col md={12}>{`Quantidade: ${item.qtd_estoque}`}</Col>
        <Col sm={12}>{`Imposto: ${handler(item.valor_imposto)}`}</Col>
      </Row>
    </Container>
  );
}

export default ContainerComponent;