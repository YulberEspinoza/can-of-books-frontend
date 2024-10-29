import React from "react";
import Alert from "react-bootstrap/Alert";

class ErrorAlert extends React.Component {
  render() {
    return (
      <Alert variant="danger" onClose={this.props.closeError}>
        <Alert.Heading>
          {" "}
          Oh, hemos tenido un error al momento de llamar al servidor
        </Alert.Heading>
        <p>{this.props.errorMessage}</p>
      </Alert>
    );
  }
}
export default ErrorAlert;
