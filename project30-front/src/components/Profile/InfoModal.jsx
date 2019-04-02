import React, { Component } from "react";

// reactstrap components
import {
  Button,
  Modal,
  // Container
} from "reactstrap";

class InfoModal extends Component {
  state = {
    isLoading: false,
  };

  render() {
    const backgorund = this.props.backdrop;

    return (
      <>
        {/* Sart movies Modal */}
        <Modal
          isOpen={this.props.isOpen}
          toggle={this.props.toggle}
          modalClassName="modal-movie"
        >
          {!this.state.isLoading ? (
            <>
              <div
                className="modal-header justify-content-center"
                style={{
                  background: `url(${backgorund})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  padding: "100px",
                  border: "2px solid black",
                }}
              >
                <button className="close" onClick={this.props.toggle}>
                  <i className="tim-icons icon-simple-remove" />
                </button>
                <h3 className="title title-up" id="modal-title">
                  {this.props.title}{" "}
                </h3>
              </div>
              <div className="modal-body">
                <h4>Sinopsis:</h4>
                <p>{this.props.overview}</p>
                <br />

                <h5>Provider:</h5>
                <p>{this.state.provider}</p>
                <h4>Fecha de estreno:</h4>
                <p>{this.props.release}</p>
              </div>
              <div className="modal-footer">
                <Button
                  color="danger"
                  type="button"
                  onClick={this.props.toggle}
                >
                  Cerrar
                </Button>
              </div>
            </>
          ) : (
            ""
          )}
        </Modal>
        {/* end modal */}
      </>
    );
  }
}

export default InfoModal;
