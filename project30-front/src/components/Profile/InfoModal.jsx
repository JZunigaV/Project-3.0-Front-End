import React, { Component } from "react";
//Components
// reactstrap components
import { Button, Modal, Tooltip } from "reactstrap";

class InfoModal extends Component {
  state = {
    isLoading: false,
    movieInfo: {}
  };

  componentDidMount = () => {
    let info = { ...this.props.info };
    this.setState({ movieInfo: info });
  };

  linkeado = (e, url) => {
    e.preventDefault();
    window.open(url, "_blank");
  };

  isToolTipOpen = targetName => {
    return this.state[targetName] ? this.state[targetName].tooltipOpen : false;
  };

  toggle = targetName => {
    if (!this.state[targetName]) {
      this.setState({
        ...this.state,
        [targetName]: {
          tooltipOpen: true
        }
      });
    } else {
      this.setState({
        ...this.state,
        [targetName]: {
          tooltipOpen: !this.state[targetName].tooltipOpen
        }
      });
    }
  };

  providers = () => {
    let providers = this.state.movieInfo.offers;
    if (providers) {
      let iconsUrl = [];
      //Remove duplicate providers
      let uniqueProviders = providers.filter(
        (ele, index, self) =>
          index === self.findIndex(t => t.provider_id === ele.provider_id)
      );

      uniqueProviders.map(ele => {
        if (ele.monetization_type === "cinema") {
          let cine = ele.urls.standard_web.substr(8, 7);
          let newObj = { ...ele };
          if (cine === "cinemex") {
            newObj.provider_id = 1200;
            ele = newObj;
          } else {
            newObj.provider_id = 1201;
            ele = newObj;
          }
        }
        //Providers Id
        switch (ele.provider_id) {
          case 8:
            let netflix = {
              name: "Netflix",
              iconUrl: "https://images.justwatch.com/icon/430997/s100/",
              link: ele.urls.standard_web,
              movieUrl: ele.urls.standard_web
            };
            iconsUrl.push(netflix);
            break;

          case 167:
            let claro = {
              name: "ClaroVideo",
              iconUrl: "https://images.justwatch.com/icon/9899714/s100/",
              link: ele.urls.standard_web,
              movieUrl: ele.urls.standard_web
            };
            iconsUrl.push(claro);
            break;

          case 31:
            let hbo = {
              name: "HBO GO",
              iconUrl: "https://images.justwatch.com/icon/614494/s100/",
              link: ele.urls.standard_web,
              movieUrl: ele.urls.standard_web
            };
            iconsUrl.push(hbo);
            break;

          case 119:
            let amazon = {
              name: "Amazon Prime Video",
              iconUrl: "https://images.justwatch.com/icon/52449861/s100/",
              link: ele.urls.standard_web,
              movieUrl: ele.urls.standard_web
            };
            iconsUrl.push(amazon);
            break;

          case 188:
            let youtube = {
              name: "YouTube Premium",
              iconUrl: "https://images.justwatch.com/icon/70189310/s100/",
              link: ele.urls.standard_web,
              movieUrl: ele.urls.standard_web
            };
            iconsUrl.push(youtube);
            break;

          case 2:
            let apple = {
              name: "Apple iTunes",
              iconUrl: "https://images.justwatch.com/icon/430995/s100/",
              link: ele.urls.standard_web,
              movieUrl: ele.urls.standard_web
            };
            iconsUrl.push(apple);
            break;

          case 3:
            let google = {
              name: "Google Play Movies",
              iconUrl: "https://images.justwatch.com/icon/430996/s100/",
              link: ele.urls.standard_web,
              movieUrl: ele.urls.standard_web
            };
            iconsUrl.push(google);
            break;

          case 68:
            let microsoft = {
              name: "Microsoft Store",
              iconUrl: "https://images.justwatch.com/icon/820542/s100/",
              link: ele.urls.standard_web,
              movieUrl: ele.urls.standard_web
            };
            iconsUrl.push(microsoft);
            break;

          case 1200:
            let cinemex = {
              name: "Cinemex",
              iconUrl:
                "https://is1-ssl.mzstatic.com/image/thumb/Purple114/v4/ec/99/ca/ec99ca66-ef8e-e39f-e747-cd0fb3645b5b/AppIcon-1-0-1x_U007emarketing-0-0-GLES2_U002c0-512MB-sRGB-0-0-0-85-220-0-0-0-5.png/246x0w.jpg",
              link: ele.urls.standard_web,
              movieUrl: ele.urls.standard_web
            };

            iconsUrl.push(cinemex);
            break;

          case 1201:
            let cinepolis = {
              name: "Cinepolis",
              iconUrl:
                "https://img2.androidappsapk.co/300/9/6/f/air.Cinepolis.png",
              link: ele.urls.standard_web,
              movieUrl: ele.urls.standard_web
            };
            iconsUrl.push(cinepolis);
            break;

          default:
            break;
        }

        return iconsUrl;
      });

      return (
        <>
          {iconsUrl.map((offer, index) => (
            <React.Fragment key={index}>
              <Button
                className="btn-providers"
                color="default"
                href={offer.movieUrl}
                onClick={e => this.linkeado(e, offer.movieUrl)}
                id={`btn-${index}`}
              >
                <img alt="..." src={offer.iconUrl} />
              </Button>
              <Tooltip
                placement="top"
                isOpen={this.isToolTipOpen(`btn-${index}`)}
                target={`btn-${index}`}
                toggle={() => this.toggle(`btn-${index}`)}
                delay={0}
              >
                {offer.name}
              </Tooltip>
            </React.Fragment>
          ))}
        </>
      );
    }
  };

  render() {
    const backgorund = this.props.backdrop;

    return (
      <>
        {/* Sart movies Modal */}
        <Modal
          isOpen={this.props.isOpen}
          toggle={this.props.toggle}
          modalClassName="modal-black"
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
            <div className="text-muted text-center ml-auto mr-auto">
              <h5 className="mb-0">
                Puedes ver <strong>{this.props.title}</strong> en :
              </h5>
            </div>
            <div className="btn-wrapper text-center" key={this.props.title}>
              {/* providers button */}
              {this.state.movieInfo && this.providers()}
            </div>
          </div>
        </Modal>
      </>
    );
  }
}

export default InfoModal;
