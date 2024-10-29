import React from "react";
import axios from "axios";
import { Carousel, Container, Image, Button } from "react-bootstrap";
import bookImg from "./books.jpg";
import BookFormModal from "./BookFormModal";
import ErrorAlert from "./ErrorAlert";

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      showForm: false,
      errorMessage: "",
    };
  }

  componentDidMount = async () => {
    const url = `${VITE_SERVER_URL}/books`.replace(/([^:]\/)\/+/g, "$1");
    try {
      const response = await axios.get(url);
      this.setState({
        books: response.data,
        errorMessage: "",
      });
    } catch (error) {
      console.log("Error in BestBook");
      this.setState({
        errorMessage: `Status code ${error.response.status}:${error.response.data}`,
      });
    }
  };

  createBook = async (newBook) => {
    try {
      const config = {
        method: "post",
        baseURL: import.meta.env.VITE_SERVER_URL,
        url: "/books/",
        data: newBook,
      };
      const response = await axios(config);

      const updateBooks = [...this.state.books, response.data];
      this.setState({ books: updateBooks });
    } catch (error) {
      console.error("Error en bestBooks al crear un book:", error);
      this.setState({
        errorMessage: `codigo de estado ${error.response.status}:${error.response.data}`,
      });
    }
  };

  deleteBook = async (bookToBeDelete) => {
    try {
      const proceed = window.confirm(`Quieres borrar ${bookToBeDelete.title}?`);
      let url;
      if (proceed) {
        url = `${VITE_SERVER_URL}/books/${bookToBeDelete._id}`;
        const response = await axios.delete(url);
        let newBooks = this.state.books.filter(
          (book) => book._id !== bookToBeDelete._id
        );
        this.setState({ books: newBooks });
      }
    } catch (error) {
      console.error("Error al borrar el book:", error);
      this.setState({
        errorMessage: `codigo status ${error.response.status} : ${error.response.data}`,
      });
    }
  };

  closeError = () => {
    this.setState({ errorMessage: "" });
  };

  closeBookFormModal = () => this.setState({ showForm: false });

  render() {
    return (
      <>
        <h2 className="text-center">
          My Essential Lifelong Learning &amp; Formation Shelf
        </h2>
        <div className="d-flex justify-content-center mb-4">
          <Button
            id="addBookButton"
            onClick={() => this.setState({ showForm: true })}
          >
            Agregar libro
          </Button>
        </div>
        {this.state.showForm && (
          <BookFormModal
            show={this.state.showForm}
            handleClose={this.closeBookFormModal}
            createBook={this.createBook}
          />
        )}
        <Container className="d-flex flex-column align-items-center">
          {this.state.books.length ? (
            <Carousel className="w-50">
              {this.state.books.map((book) => (
                <Carousel.Item key={book._id}>
                  <Image
                    className="d-block w-100"
                    id="carousel-image"
                    src={bookImg}
                    alt={book.name}
                  />
                  <Carousel.Caption>
                    <h2>{book.title}</h2>
                    <p>{book.description}</p>
                    <p>{book.status}</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          ) : this.state.errorMessage ? (
            <ErrorAlert
              closeError={this.closeError}
              errorMessage={this.state.errorMessage}
            />
          ) : (
            <h3 className="text-center">No Books Found :( </h3>
          )}
        </Container>
      </>
    );
  }
}

export default BestBooks;
