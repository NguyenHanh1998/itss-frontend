import React, { Component } from "react";
import { connect } from "react-redux";
import { translate } from "react-i18next";

// import PostList from "../Custom/Dashboard/PostList";

class Dashboard extends Component {
  render() {
    return (
      <div className="animated fadeIn">
        <div className="row pt-3 pb-1">
          <div className="col-lg-9 pl-md-0">
            {/* <PostList /> */}
          </div>
          <div className="">

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.data,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default translate("translations")(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
