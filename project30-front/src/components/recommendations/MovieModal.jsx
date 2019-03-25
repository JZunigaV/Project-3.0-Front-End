import React, { Component } from "react";

// reactstrap components
import {
  Button,
  Modal
  // Container
} from "reactstrap";

class MovieModal extends Component {


  addFavorite = () => {
    debugger;
    let movie = {

      background: this.props.background,
      overview: this.props.overview,
      title: this.props.title,
      release: this.props.release,
    
    }

    this.props.favorite(movie);
  }


  render() {
    const backgorund = this.props.background;

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
              border: "2px solid black"
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

            <Button color="primary" type="button" onClick={this.addFavorite}>
              Add to favorites
            </Button>
          </div>
        </Modal>
        {/* end modal */}
      </>
    );
  }
}

export default MovieModal;
