import React, { Component } from "react";
import LoadingIcon from "../assets/img/loading.gif";

class Loading extends Component {
  render() {
    return (
      <div className="icon-loading-wrapper">
        <div className="icon-loading-status" alt="Loading..." src={LoadingIcon}>
          <img alt="Espere un momento..." src={LoadingIcon} />
          <div className="icon-loading-msg">{this.props.loadingmsg}</div>
        </div>
      </div>
    );
  }
}

export default Loading;
