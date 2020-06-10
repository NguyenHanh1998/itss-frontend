import React, { Component } from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  UncontrolledDropdown,
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import EllipsisText from "react-ellipsis-text";
import { translate } from "react-i18next";
import {MDBFormInline, MDBIcon } from "mdbreact";
import LoginActions from "../../../Redux/LoginRedux";
import UserRedux from "../../../Redux/UserRedux";

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  logout() {
    this.props.logout();
  }
  login() {
    
  }
  componentDidMount() {
    if (this.props.user && this.props.user.locale) {
      this.props.i18n.changeLanguage(this.props.user.locale);
    } else {
      this.props.userRequest();
    }
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      !nextProps.fetchingUpate &&
      nextProps.user.username &&
      this.props.fetchingUpate
    ) {
      window.location.reload();
    }
    if (!nextProps.fetching && nextProps.user.locale && this.props.fetching) {
      this.props.i18n.changeLanguage(nextProps.user.locale);
    }
  }
  render() {
    // eslint-disable-next-line
    const { children, ...attributes } = this.props;
    let langs = {
      en: {
        code: "en",
        icon: "us",
        name: "English",
      },
      ja: {
        code: "ja",
        icon: "jp",
        name: "Japanese",
      },
    };
    let language = this.props.i18n.language;
    return (
      <Route
        render={({ history }) => (
          <React.Fragment>
            {/* <AppSidebarToggler className='d-lg-none' display='md' mobile /> 
          <AppNavbarBrand
            full={{ src: logo, width: 155, height: 'auto', alt: 'Logo' }}
            minimized={{ src: sygnet, width: 30, height: 30, alt: 'Logo' }}
          />  */}
            <Nav className="ml-auto mr-5" navbar>
              <div className="navbar-left">
                <ul className="navbar-menu">
                  <li className="navbar-menu-item">Posts</li>
                </ul>
              </div>
              <MDBFormInline className="md-form mr-5">
                <div className="nav_input md-form form-sm form-1 pl-0">
                  <input
                    className="form-control my-0 py-1"
                    type="text"
                    placeholder="Search"
                    aria-label="Search"
                  />
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text purple lighten-3"
                      id="basic-text1"
                    >
                      <MDBIcon className="text-white" icon="search" />
                    </span>
                  </div>
                </div>
                <UncontrolledDropdown direction="down">
                  {this.props.user && this.props.user.username ? (
                    <DropdownToggle nav>
                      <strong>
                        {" "}
                        <EllipsisText
                          text={this.props.user.username}
                          length={50}
                        />{" "}
                      </strong>
                    </DropdownToggle>
                  ) : (
                    <DropdownToggle nav>
                      {" "}
                      <i className="fa fa-sign-in"></i>
                      {this.props.t("  Options")}{" "}
                    </DropdownToggle>
                  )}
                  <DropdownMenu right style={{ right: 4 }}>
                    <DropdownItem onClick={() => this.login()}>
                      <i className="fa fa-lock" /> {this.props.t("login")}
                    </DropdownItem>
                    <DropdownItem onClick={() => this.logout()}>
                      <i className="fa fa-lock" />{" "}
                      {this.props.t("logout_title")}
                    </DropdownItem>
                    {Object.values(langs).map((lang) => (
                      <DropdownItem
                        key={lang.code}
                        onClick={() => {
                          if (lang.code !== language) {
                            this.props.i18n.changeLanguage(lang.code);
                            this.props.userUpdateRequest({
                              locale: lang.code,
                            });
                          }
                        }}
                      >
                        <div>
                          <i
                            className={`flag-icon flag-icon-${lang.icon}`}
                            style={{ marginRight: 17 }}
                          />
                          {lang.name}
                        </div>
                      </DropdownItem>
                    ))}
                  </DropdownMenu>
                </UncontrolledDropdown>
              </MDBFormInline>
            </Nav>
          </React.Fragment>
        )}
      />
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

const mapStateToProps = (state) => {
  return {
    user: state.user.data,
    fetchingUpate: state.user.fetchingUpdate,
    fetching: state.user.fetching,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (username, password) => dispatch(LoginActions.logoutRequest()),
    userUpdateRequest: (params) => dispatch(UserRedux.userUpdate(params)),
    userRequest: (params) => dispatch(UserRedux.userRequest(params)),
  };
};

export default translate("translations")(
  connect(mapStateToProps, mapDispatchToProps)(DefaultHeader)
);
