import "../globalStyles/scss/index.scss";

import { Footer, MainMenu, MetaConsumer, OverlayManager } from "../components";
import { Routes, orderConfirmationUrl } from "../routes";

import React from "react";
import { RouteComponentProps } from "react-router";
import { isPath } from "../core/utils";

const App: React.FC<RouteComponentProps> = ({
  history: {
    location: { pathname },
  },
}) => {
  const orderConfirmationPage = isPath(pathname, orderConfirmationUrl);

  return (
    <>
      <MetaConsumer />
      <header>
        <MainMenu />
      </header>
      <Routes />
      {!orderConfirmationPage && <Footer />}
      <OverlayManager />
    </>
  );
};

export default App;
