
import { useState, useEffect } from 'react';

import ModalComponent from '../../components/Modal/index.js';
import InputProduto from '../../components/Inputs/Produto/index.js';
import ProdutosService from '../../services/ProdutosService.js';
import CardComponent from '../../components/Card/index.js';
import Stack from 'react-bootstrap/Stack';

function Produtos () {
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    id_tipo_produto: '',
    nome: '',
    valor: '',
    qtd_estoque: '',
    image: '',
  });
  const [serviceData, setServiceData] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {}, [serviceData]);

  async function getAll () {
    try {
      const res = await ProdutosService.buscarTodos();
      setServiceData(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShow = () => {
    setShow(true)
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    const isEmpty = Object.values(data).every(x => x === null || x === '');

    if (isEmpty) {
      alert("Preencha os campos vazios!")
      return false;
    }

    formData.append("id_tipo_produto", data.id_tipo_produto);
    formData.append("nome", data.nome);
    formData.append("valor", data.valor);
    formData.append("qtd_estoque", data.qtd_estoque);
    formData.append("image", data.image[0]);

    await ProdutosService.salvar(formData).then((res) => {
      if (res.status === 201) {
        getAll();
      }
    }).catch(function (error) {
      alert(error.response.data.mensagem)
    }); 
    setShow(false);
  }

  const handleChange = (e) => {
    if(e.target.name === 'image') {
      setData({...data, [e.target.name]: e.target.files});
    } else {
      setData({...data, [e.target.name]: e.target.value});
    }
  }

  return (
    <>
    <Stack gap={3}>
      <div className="button-position">
        <ModalComponent 
          onClick={handleShow} 
          title={"Resgitro de Produtos"}
          children={
            <InputProduto state={data} handleChange={handleChange} handleSubmit={onSubmit}/>
          }
          type={'submit'} 
          show={show} 
          setShow={setShow} 
          variant={"outline-light"} 
          buttonText={"Registrar Produto"}
          idForm={'my-form'}
          text={"Salvar"}
        />
      </div>
      <div className="container-box">
        <div className="content" style={{"justifyContent": "center"}}>
        {
          Object.values(serviceData).length !== 0  ?
            serviceData.map((item, index) => {
              return (
                <CardComponent key={index} item={item}/>
              )
            })
            :
            serviceData
          }
        </div>
      </div>
    </Stack>
    </>
  );
}

export default Produtos;