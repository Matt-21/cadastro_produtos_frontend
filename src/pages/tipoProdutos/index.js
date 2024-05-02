import { useState, useEffect } from 'react';

import InputTipoProduto from '../../components/Inputs/TipoProduto/index.js';
import TipoProdutosService from '../../services/TipoProdutosService.js';
import ModalComponent from '../../components/Modal/index.js';
import TableComponent from '../../components/Tables/index.js';
import Stack from 'react-bootstrap/Stack';

let initialValues = {
  tipo_produto: '',
  valor_imposto: ''
}

function TipoProdutos () {
  const [show, setShow] = useState(false);
  const [data, setData] = useState(initialValues);
  const [serviceData, setServiceData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {}, [serviceData]);

  const handleShow = () => {
    setShow(true)
  };

  async function fetchData () {
    try {
      const res = await TipoProdutosService.buscarTodos();
      setServiceData(res.data);
      setShow(false);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleSave = async () => {
    const isEmpty = Object.values(data).every(x => x === null || x === '');

    if (isEmpty) {
      alert("Preencha os campos vazios!")
      return false;
    }

    await TipoProdutosService.salvar(data).then((res) => {
      if (res.status === 201) {
        fetchData();
        alert(res.data.mensagem)
      }
    }).catch(function (error) {
      console.log(error);
    });
  };

  const handleChange = (e) => {
    setData({...data, [e.target.name]: e.target.value});
  };

  return (
    <>
    <Stack gap={3}>
        <div className="button-position">
          <ModalComponent onClick={handleShow} title={"Resgitro de Tipos de Produto"}
            children={
              <InputTipoProduto state={data} handleChange={handleChange}/>
            }
            handleSave={handleSave} 
            show={show} 
            setShow={setShow} 
            variant={"outline-light"} 
            buttonText={"Registrar Tipo de Produto"}
            text={"Salvar"}
          />
        </div>
      <div className="container-box">
        <div className="content" style={{"justifyContent": "center"}}>
          <TableComponent serviceData={serviceData} setServiceData={setServiceData}/>
        </div>
      </div>
    </Stack>
    </>
  );
}

export default TipoProdutos;