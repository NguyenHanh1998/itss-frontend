import React, { Component } from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { Container } from "reactstrap";

import {
  AppAside,
  AppFooter,
  AppHeader,
} from "@coreui/react";

// routes config
import routes from "../../routes";
import DefaultAside from "./DefaultAside";
import DefaultFooter from "./DefaultFooter";
import DefaultHeader from "./DefaultHeader";
import { translate } from "react-i18next";
class DefaultLayout extends Component {
  render() {
    return (
      <div className="app">
        <AppHeader fixed>
          <DefaultHeader />
        </AppHeader>
        <div className="app-body">
          <main className="main">
            <Container fluid>
              <Switch>
                {routes.map((route, idx) => {
                  return route.component ? (
                    <Route key={idx} {...route} />
                  ) : null;
                })}
                <Redirect from="/" to="/dashboard" />
              </Switch>
            </Container>
          </main>
          <AppAside fixed hidden>
            <DefaultAside />
          </AppAside>
        </div>
        <AppFooter>
          <DefaultFooter />
        </AppFooter>
      </div>
    );
  }
}

export default translate("translations")(DefaultLayout);
