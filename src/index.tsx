import * as React from "react";

import { Provider as AlertProvider, positions, useAlert } from "react-alert";
import { GlobalStyle, defaultTheme } from "@styles";
import {
  I18nLoader,
  ServiceWorkerContext,
  ServiceWorkerProvider
} from "@components/containers";
import { InMemoryCache, defaultDataIdFromObject } from "apollo-cache-inmemory";
import { OverlayProvider, UserProvider } from "./components";
import { Route, Router, Switch } from "react-router-dom";
import { SaleorProvider, useAuth, useUserDetails } from "@sdk/react";
import { apiUrl, serviceWorkerTimeout } from "./constants";
import {
  authLink,
  invalidTokenLinkWithTokenHandlerComponent
} from "./core/auth";

import { ApolloClient } from "apollo-client";
import { ApolloLink } from "apollo-link";
import { ApolloProvider } from "react-apollo";
import { App } from "./app";
import { BatchHttpLink } from "apollo-link-batch-http";
import CartProvider from "./components/CartProvider";
import CheckoutApp from "./checkout";
import { CheckoutContext } from "./checkout/context";
import { CheckoutProvider } from "./checkout/CheckoutProvider";
import { NotificationTemplate } from "@components/atoms";
import { RetryLink } from "apollo-link-retry";
import ShopProvider from "./components/ShopProvider";
import { ThemeProvider } from "styled-components";
import { baseUrl as checkoutBaseUrl } from "./checkout/routes";
import { history } from "./history";
import { hot } from "react-hot-loader";
import { languages } from "./languages";
import { persistCache } from "apollo-cache-persist";
import { render } from "react-dom";

const { link: invalidTokenLink } = invalidTokenLinkWithTokenHandlerComponent(
  UserProvider
);

const link = ApolloLink.from([
  invalidTokenLink,
  authLink,
  new RetryLink(),
  new BatchHttpLink({ uri: apiUrl }),
]);

const cache = new InMemoryCache({
  dataIdFromObject: obj => {
    if (obj.__typename === "Shop") {
      return "shop";
    }
    return defaultDataIdFromObject(obj);
  },
});

const startApp = async () => {
  await persistCache({
    cache,
    storage: window.localStorage,
  });

  const apolloClient = new ApolloClient({
    cache,
    link,
  });

  const notificationOptions = {
    position: positions.BOTTOM_RIGHT,
    timeout: 2500,
  };

  const Root = hot(module)(() => {
    const Notifications = () => {
      const alert = useAlert();

      const { updateAvailable } = React.useContext(ServiceWorkerContext);

      React.useEffect(() => {
        if (updateAvailable) {
          alert.show(
            {
              actionText: "Refresh",
              content:
                "To update the application to the latest version, please refresh the page!",
              title: "New version is available!",
            },
            {
              onClose: () => {
                location.reload();
              },
              timeout: 0,
              type: "success",
            }
          );
        }
      }, [updateAvailable]);

      useAuth((authenticated: boolean) => {
        if (authenticated) {
          alert.show(
            {
              title: "Inicio de Sesión con Éxito.",
            },
            { type: "success" }
          );
        } else {
          alert.show(
            {
              title: "Has cerrado sesión con éxito",
            },
            { type: "success" }
          );
        }
      });
      return null;
    };

    const Checkout = ({ children }) => {
      const user = useUserDetails();
      return (
        <>
          <CheckoutProvider user={user}>{children}</CheckoutProvider>
        </>
      );
    };

    return (
      <Router history={history}>
        <ApolloProvider client={apolloClient}>
          <SaleorProvider client={apolloClient}>
            <ShopProvider>
              <OverlayProvider>
                <Checkout>
                  <CheckoutContext.Consumer>
                    {checkout => (
                      <CartProvider
                        checkout={checkout}
                        apolloClient={apolloClient}
                      >
                        <Switch>
                          <Route
                            path={checkoutBaseUrl}
                            component={CheckoutApp}
                          />
                          <Route component={App} />
                        </Switch>
                        <Notifications />
                      </CartProvider>
                    )}
                  </CheckoutContext.Consumer>
                </Checkout>
              </OverlayProvider>
            </ShopProvider>
          </SaleorProvider>
        </ApolloProvider>
      </Router>
    );
  });

  render(
    <ThemeProvider theme={defaultTheme}>
      <I18nLoader languages={languages}>
        <AlertProvider
          template={NotificationTemplate as any}
          {...notificationOptions}
        >
          <ServiceWorkerProvider timeout={serviceWorkerTimeout}>
            <GlobalStyle />
            <Root />
          </ServiceWorkerProvider>
        </AlertProvider>
      </I18nLoader>
    </ThemeProvider>,
    document.getElementById("root")
  );

  // Hot Module Replacement API
  if (module.hot) {
    module.hot.accept();
  }
};

startApp();
