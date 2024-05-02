import { useState } from 'react';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ModalComponent from '../../components/Modal/index.js';
import TipoProdutosService from '../../services/TipoProdutosService.js';
import Inputs from '../Inputs/TipoProduto/index.js';

function TableComponent ({ serviceData, setServiceData }) {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    id_tipo_produto: 0,
    tipo_produto: '',
    valor_imposto: ''
  });

  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  };

  const handleEdit = (e) => {
    TipoProdutosService.buscarPorId(e.target.id).then((res) => setData({
      id_tipo_produto: res.data.id_tipo_produto,
      tipo_produto: res.data.tipo_produto,
      valor_imposto: res.data.valor_imposto
    })).catch(function (error) {
      console.error(error);
    });
    setShow(true) 
  }

  async function fetchData () {
    try {
      const res = await TipoProdutosService.buscarTodos();
      setServiceData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async () => {
    await TipoProdutosService.atualizar(data).then((res) => {
      if (res.status === 200) {
        fetchData();
      }
    }).catch(function (error) {
      console.error(error);
    });
    setShow(false);
  }

  const handleDelete = async (e) => {
    if (window.confirm("Você tem certeza de que deseja deletar este item?")) {
      await TipoProdutosService.deletar(e.target.id).then((res) => {
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
      <Table striped bordered hover variant="dark" responsive="xl">
        <thead>
          <tr>
            <th>#</th>
            <th>Tipo de Produto</th>
            <th>Imposto</th>
            <th style={{"textAlign": "center"}}>Ações</th>
          </tr>
        </thead>
        <tbody>
        {serviceData.map((dados, index) => (
          <tr key={index}>
            <td>{dados.id_tipo_produto}</td>
            <td>{dados.tipo_produto}</td>
            <td>{dados.valor_imposto}</td>
            <td>
            <ModalComponent 
              id={dados.id_tipo_produto}
              title={"Edição de Tipos de Produto"} 
              handleSave={handleUpdate}
              children={
                <Inputs state={data} handleChange={handleChange}/>
              }
              onClick={handleEdit} 
              show={show} 
              setShow={setShow} 
              variant={"outline-success"} 
              buttonText={"Editar"}
              text={"Salvar"}
            />
            <Button 
              id={dados.id_tipo_produto}
              onClick={handleDelete} 
              variant="outline-danger" 
              style={{'marginLeft': '10px'}}
            >
              Excluir
            </Button>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
  );
}

export default TableComponent;