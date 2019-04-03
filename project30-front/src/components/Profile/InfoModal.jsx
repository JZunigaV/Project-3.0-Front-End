import React, { Component } from "react";
//Components

// reactstrap components
import {
  Button,
  Modal,

  // Container
} from "reactstrap";

class InfoModal extends Component {
  state = {
    isLoading: false,
    movieInfo: {},
  };

  componentDidMount = () => {
    let info = { ...this.props.info };
    this.setState({ movieInfo: info });
  };

  providers = () => {
    let providers = this.state.movieInfo.offers;

    if (providers) {
      let iconsUrl = [];
      //Remove duplicate providers
      let uniqueProviders = providers.filter(
        (ele, index, self) =>
          index === self.findIndex(t => t.provider_id === ele.provider_id),
      );

      uniqueProviders.map((ele, index) => {
        switch (ele.provider_id) {
          case 8:
            let netflix = {
              name: "Netflix",
              iconUrl: "https://images.justwatch.com/icon/430997/s100/",
              link: ele.urls.standard_web,
            };
            iconsUrl.push(netflix);
            break;

          case 167:
            let claro = {
              name: "ClaroVideo",
              iconUrl: "https://images.justwatch.com/icon/9899714/s100/",
              link: ele.urls.standard_web,
            };
            iconsUrl.push(claro);
            break;

          case 31:
            let hbo = {
              name: "HBO GO",
              iconUrl: "https://images.justwatch.com/icon/614494/s100/",
              link: ele.urls.standard_web,
            };
            iconsUrl.push(hbo);
            break;

          case 119:
            let amazon = {
              name: "Amazon Prime Video",
              iconUrl: "https://images.justwatch.com/icon/52449861/s100/",
              link: ele.urls.standard_web,
            };
            iconsUrl.push(amazon);
            break;

          case 188:
            let youtube = {
              name: "YouTube Premium",
              iconUrl: "https://images.justwatch.com/icon/70189310/s100/",
              link: ele.urls.standard_web,
            };
            iconsUrl.push(youtube);
            break;

          case 2:
            let apple = {
              name: "Apple iTunes",
              iconUrl: "https://images.justwatch.com/icon/430995/s100/",
              link: ele.urls.standard_web,
            };
            iconsUrl.push(apple);
            break;

          case 3:
            let google = {
              name: "Google Play Movies",
              iconUrl: "https://images.justwatch.com/icon/430996/s100/",
              link: ele.urls.standard_web,
            };
            iconsUrl.push(google);
            break;

          case 68:
            let microsoft = {
              name: "Microsoft Store",
              iconUrl: "https://images.justwatch.com/icon/820542/s100/",
              link: ele.urls.standard_web,
            };
            iconsUrl.push(microsoft);
            break;

          default:
            break;
        }
        return iconsUrl;
      });

      return (
        <>
          {iconsUrl.map(offer => (
            <Button
              key={offer.name}
              className="btn-providers"
              color="default"
              href="#pablo"
              onClick={e => e.preventDefault()}
            >
              <img alt="..." src={offer.iconUrl} />
            </Button>
          ))}
        </>
      );
    }
  };

  render() {
    // const backgorund = this.props.backdrop;

    return (
      <>
        {/* Sart movies Modal */}
        <Modal
          isOpen={this.props.isOpen}
          toggle={this.props.toggle}
          modalClassName="modal-movie"
        >
          <div className="modal-header justify-content-center">
            <button className="close" onClick={this.props.toggle}>
              <i className="tim-icons icon-simple-remove text-white" />
            </button>

            <div className="text-muted text-center ml-auto mr-auto">
              <h5 className="mb-0">
                Puedes ver <strong>{this.props.title}</strong> en :
              </h5>
            </div>
          </div>
          <div className="modal-body">
            <div className="btn-wrapper text-center">
              {/* providers button */}
              {this.state.movieInfo && this.providers()}
              <div role="form">
                <div className="text-center">
                  <Button className="my-4" color="primary" type="button">
                    Sign in
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default InfoModal;
