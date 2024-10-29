import React from "react";
import { Modal } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

class BookFormModal extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault;
    const newBook = {
      title: event.target.title.value,
      description: event.target.description.value,
      status: event.target.status.value,
    };
    console.log("New Book", newBook);
    this.props.createBook(newBook);
    this.props.handleClose();
  };
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Agrega un nuevo libro </Modal.Title>
        </Modal.Header>

        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group className="mb-3" controlId="title">
              <Form.Label>Titulo del libro</Form.Label>
              <Form.Control type="text" placeholder="Ingresa el book" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="description">
              <Form.Label>Agregar un description</Form.Label>
              <Form.Control type="text" placeholder="Ingresa la descripcion" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Status</Form.Label>
              <Form.Control as="select">
                <option value="CAMBIANDO_VIDAS">CAMBIANDO_VIDAS</option>
                <option value="RECOMENDADO">RECOMENDADO</option>
                <option value="FAVORITOS">FAVORITOS</option>
              </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary">
              Agregar nuevo libro
            </Button>
          </Form>
        </Container>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            {" "}
            Cerrar Formulario
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default BookFormModal;
