import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalComponent ({
    children,
    handleSave,
    show,
    setShow,
    variant,
    buttonText,
    id,
    onClick,
    title,
    type,
    idForm,
    text,
    price
  })  {
  const handleClose = () => setShow(false);
  
  return (
    <>
      <Button id={id} variant={variant} onClick={onClick}>
        {buttonText}
      </Button>

      <Modal show={show} onHide={handleClose} data-bs-theme="dark">
        <Modal.Header closeButton>
          <Modal.Title style={{color: '#fff'}}>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {children}
        </Modal.Body>
        <Modal.Footer>
          {price}
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
          <Button form={idForm} name={"modal-button"} variant="primary" type={type} onClick={handleSave}>
            {text}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalComponent;