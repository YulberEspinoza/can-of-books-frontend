import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container className="d-flex justify-content-between">
          <Navbar.Brand className="mx-auto">My Favorite Books</Navbar.Brand>
          <Nav className="ml-auto">
            <Nav.Item>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </Nav.Item>
            {/* PLACEHOLDER: render a navigation link to the about page */}
          </Nav>
        </Container>
      </Navbar>
    );
  }
}

export default Header;
