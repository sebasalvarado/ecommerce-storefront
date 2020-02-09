import { NotificationTemplate } from '@components/atoms';
import { I18nLoader, ServiceWorkerProvider } from '@components/containers';
import { SaleorProvider, useUserDetails, WishlistProvider } from '@sdk/react';
import { defaultTheme, GlobalStyle } from '@styles';
import { defaultDataIdFromObject, InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { BatchHttpLink } from 'apollo-link-batch-http';
import { RetryLink } from 'apollo-link-retry';
import * as React from 'react';
import { positions, Provider as AlertProvider } from 'react-alert';
import { ApolloProvider } from 'react-apollo';
import { render } from 'react-dom';
import { hot } from 'react-hot-loader';
import { Route, Router, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { QueryParamProvider } from 'use-query-params';

import { App } from './app';
import CheckoutApp from './checkout';
import { CheckoutProvider } from './checkout/CheckoutProvider';
import { CheckoutContext } from './checkout/context';
import { baseUrl as checkoutBaseUrl } from './checkout/routes';
import { OverlayProvider, UserProvider } from './components';
import CartProvider from './components/CartProvider';
import { CartContext } from './components/CartProvider/context';
import ShopProvider from './components/ShopProvider';
import { apiUrl, serviceWorkerTimeout } from './constants';
import { authLink, invalidTokenLinkWithTokenHandlerComponent } from './core/auth';
import { history } from './history';
import { languages } from './languages';

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
    // const Notifications = () => {
    //   const alert = useAlert();
    //   const { updateAvailable } = React.useContext(ServiceWorkerContext);

    //   React.useEffect(() => {
    //     if (updateAvailable) {
    //       alert.show(
    //         {
    //           actionText: "Refresh",
    //           content:
    //             "To update the application to the latest version, please refresh the page!",
    //           title: "New version is available!",
    //         },
    //         {
    //           onClose: () => {
    //             location.reload();
    //           },
    //           timeout: 0,
    //           type: "success",
    //         }
    //       );
    //     }
    //   }, [updateAvailable]);

    //   useAuth((authenticated: boolean) => {
    //     if (authenticated) {
    //       alert.show(
    //         {
    //           title: "Inicio de Sesión con Éxito.",
    //         },
    //         { type: "success" }
    //       );
    //     } else {
    //       alert.show(
    //         {
    //           title: "Has cerrado sesión con éxito",
    //         },
    //         { type: "success" }
    //       );
    //     }
    //   });
    //   return null;
    // };

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
        <QueryParamProvider ReactRouterRoute={Route}>
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
                          <CartContext.Consumer>
                          {
                            cart => (
                              <WishlistProvider cart={cart}>
                                <Switch>
                                  <Route
                                    path={checkoutBaseUrl}
                                    component={CheckoutApp}
                                  />
                                  <Route component={App} />
                                </Switch>
                                {/* <Notifications /> */}
                              </WishlistProvider>
                            )
                          }
                          </CartContext.Consumer>
                        </CartProvider>
                      )}
                    </CheckoutContext.Consumer>
                  </Checkout>
                </OverlayProvider>
              </ShopProvider>
            </SaleorProvider>
          </ApolloProvider>
        </QueryParamProvider>
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
