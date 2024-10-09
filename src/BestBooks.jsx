import React from "react";
import axios from "axios";
import { Carousel, Container, Image, Button } from "react-bootstrap";
import bookImg from "./book.jpeg";
import BookFormModal from "./BookFormModal";
import ErrorAlert from "./ErrorAlert";

const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;

class BestBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
  }

  /* TODO: Make a GET request to your API to fetch all the books from the database  */
  componentDidMount = async () => {
    const url = `${VITE_SERVER_URL}/books`;
    try {
      const response = await axios.get(url);
      console.log(response);
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
    } catch (erro) {
      console.error("Error en bestBooks al crear un book:", error);
      this.setState({
        errorMessage: `codigo de estado ${error.response.status}:${error.response.data}`,
      });
    }
  };

  deleteBook = async (bookToBeDelete) => {
    try {
      const proceed = windows.confirm(
        `Quieres borrar ${bookToBeDelete.title}?`
      );

      if (proceed) {
        const url = `${VITE_SERVER_URL}/books/${bookToBeDelete._id}`;
      }
      const response = await axios.delete(url);
      let newBooks = this.state.books.filter(
        (book) => book._id !== bookToBeDelete._id
      );
      this.setState({ books: newBooks });
    } catch (error) {
      console.error("Error al borrar el book:", error);
      this.setState({
        errorMessage: `codigo status ${error.response.status} : ${error.response.data}`,
      });
    }
  };

  closeError = () => {
    this.setState({ errorMessag: "" });
  };

  closeBookFormModal = () => this.setState({ showForm: false });

  render() {
    /* TODO: render all the books in a Carousel */

    return (
      <>
        <h2>My Essential Lifelong Learning &amp; Formation Shelf</h2>
        <Button
          id="addBookButton"
          onClick={() => this.setState({ showForm: true })}
        >
          Agregar libro
        </Button>
        {this.state.showForm && (
          <BookFormModal
            show={this.state.showForm}
            handleClose={this.closeBookFormModal}
            createBook={this.createBook}
          />
        )}
        <Container>
          {this.state.books.length ? (
            <Carousel>
              {this.state.books.map((book) => (
                <Carousel.Item key={book._id}>
                  <Image
                    className="w-100"
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
            <h3>No Books Found :( </h3>
          )}
        </Container>
      </>
    );
  }
}

export default BestBooks;
