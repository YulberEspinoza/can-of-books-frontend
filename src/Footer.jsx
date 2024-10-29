import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";

class Footer extends React.Component {
  render() {
    return (
      <Navbar
        collapseOnSelect
        expand="lg"
        bg="dark"
        variant="dark"
        className="mt-auto"
      >
        <Container className="d-flex justify-content-center">
          <Navbar.Brand>Code Fellows</Navbar.Brand>
        </Container>
      </Navbar>
    );
  }
}

export default Footer;
