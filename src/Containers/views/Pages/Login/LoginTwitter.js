import React, { Component } from "react";
import PropTypes from "prop-types";

import { FaTwitter } from "react-icons/fa";

class LoginTwitter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: ""
    };
    this.onButtonClick = this.onButtonClick.bind(this);
  }

  onButtonClick(e) {
    e.preventDefault();
    this.popup = this.openPopup();
    this.setState({ disabled: "disabled" });
    return this.getRequestToken();
  }

  componentDidMount() {
    const { socket, provider } = this.props;

    socket.on(provider, user => {
      this.popup.close();
      this.props.onSuccess(user);
    });
  }

  getRequestToken() {
    // console.log('Socketid', this.props.socket.id)
    return window
      .fetch(`${this.props.requestTokenUrl}?socketId=${this.props.socket.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        credentials: "same-origin"
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        let authenticateUrl = `https://api.twitter.com/oauth/authenticate?oauth_token=${data.oauth_token}&force_login=false`;

        this.popup.location = authenticateUrl;
        this.checkPopup(this.popup);
      })
      .catch(error => {
        this.popup.close();
        // console.log("Error]", error);
      });
  }

  checkPopup(popup) {
    var userReceived
    const polling = setInterval(() => {
      const { socket, provider } = this.props;
      socket.on(provider, user => {
        userReceived = user
        this.popup.close();
        this.props.onSuccess(user);
      });

      if (!userReceived && (!popup || popup.closed || popup.closed === undefined)) {
        clearInterval(polling);
        this.setState({ disabled: "" });
        this.props.onFailure(new Error("Popup has been closed"));
      }
    }, 1000);
  }

  openPopup() {
    const width = this.props.dialogWidth;
    const height = this.props.dialogHeight;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;

    return window.open(
      "",
      "",
      "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=" +
        width +
        ", height=" +
        height +
        ", top=" +
        top +
        ", left=" +
        left
    );
  }

  defaultButton() {
    const defaultIcon = this.props.showIcon ? (
      <FaTwitter color="#00aced" size={25} />
    ) : null;

    return (
      <span>
        {defaultIcon} {this.props.text}
      </span>
    );
  }

  render() {
    const twitterButton = React.createElement(
      this.props.tag,
      {
        onClick: this.onButtonClick,
        style: this.props.style,
        disabled: this.props.disabled,
        className: this.props.className
      },
      this.defaultButton()
    );

    return twitterButton;
  }
}

LoginTwitter.propTypes = {
  tag: PropTypes.string,
  style: PropTypes.object,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  showIcon: PropTypes.bool,
  text: PropTypes.string,
  dialogHeight: PropTypes.number,
  dialogWidth: PropTypes.number,
  requestTokenUrl: PropTypes.string.isRequired,
  provider: PropTypes.string.isRequired,
  socket: PropTypes.object.isRequired
};

LoginTwitter.defaultProps = {
  tag: "button",
  text: "Sign in with Twitter",
  disabled: false,
  showIcon: true,
  dialogWidth: 600,
  dialogHeight: 400
};

export default LoginTwitter;
