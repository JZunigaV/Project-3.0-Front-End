import React, { Component } from "react";

// reactstrap components
import {
  Button,
  Modal,
  // Container
} from "reactstrap";

class MovieModal extends Component {
  render() {
    const backgorund = this.props.background;

    console.log(this.props);
    return (
      <>
        {/* Sart movies Modal */}
        <Modal
          isOpen={this.props.isOpen}
          toggle={this.props.toggle}
          modalClassName="modal-movie"
        >
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
            <h4
              className="title title-up"
              style={{
                "text-shadow":
                  "2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff",
                color: "black",
                textAlign: "center",
              }}
            >
              {this.props.title}{" "}
            </h4>
          </div>
          <div className="modal-body">
            <h4>Overview:</h4>
            <p>{this.props.overview}</p>
            <br />
            <h4>Release Date:</h4>
            <p>{this.props.release}</p>
          </div>
          <div className="modal-footer">
            <Button color="danger" type="button" onClick={this.props.toggle}>
              Close
            </Button>
          </div>
        </Modal>
        {/* end modal */}
      </>
    );
  }
}

export default MovieModal;
