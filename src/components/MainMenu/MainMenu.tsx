import "./scss/index.scss";

import * as React from "react";

import {
  InfoTopBar,
  MenuDropdown,
  Offline,
  Online,
  OverlayContext,
  OverlayTheme,
  OverlayType
} from "..";
import {
  accountUrl,
  addressBookUrl,
  baseUrl,
  orderHistoryUrl,
  paymentOptionsUrl
} from "../../routes";
import {
  mediumScreen,
  smallScreen
} from "../../globalStyles/scss/variables.scss";
import { useSignOut, useUserDetails } from "@sdk/react";

import { CartContext } from "../CartProvider/context";
import { Icon } from '../../@next/components/atoms';
import { Link } from "react-router-dom";
import Media from "react-media";
import NavDropdown from "./NavDropdown";
import ReactSVG from "react-svg";
import { Trans } from "@lingui/react";
import { TypedMainMenuQuery } from "./queries";
import cartImg from "../../images/cart.svg";
import hamburgerHoverImg from "../../images/hamburger-hover.svg";
import hamburgerImg from "../../images/hamburger.svg";
import logoImg from "../../images/logo.svg";
import { maybe } from "../../core/utils";
import searchImg from "../../images/search.svg";
import userImg from "../../images/user.svg";

const MainMenu: React.FC = () => {
  const { data: user } = useUserDetails();
  const [signOut] = useSignOut();

  function returnMobileView(overlayContext) {
    return(
      <>
        <div className="main-menu__left">
          <TypedMainMenuQuery renderOnError displayLoader={false}>
            {({ data }) => {
              const items = maybe(() => data.shop.navigation.main.items, []);
              return (
                <ul>
                  <li
                    className="main-menu__hamburger"
                    onClick={() =>
                      overlayContext.show(
                        OverlayType.sideNav,
                        OverlayTheme.left,
                        { data: items }
                      )
                    }
                  >
                    <ReactSVG
                      path={hamburgerImg}
                      className={"main-menu__hamburger--icon"}
                    />
                    <ReactSVG
                      path={hamburgerHoverImg}
                      className={"main-menu__hamburger--hover"}
                    />
                  </li>
                </ul>
              );
            }}
          </TypedMainMenuQuery>
        </div>
        <div className="main-menu__center">
          <Link to={baseUrl}>
            <ReactSVG path={logoImg} />
          </Link>
        </div>
        <div className="main-menu__right">
        <ul>
          <Online>
                <Media
                  query={{ minWidth: smallScreen }}
                  render={() => (
                    <>
                      {user ? (
                        <MenuDropdown
                          head={
                            <li className="main-menu__icon main-menu__user--active">
                              <ReactSVG path={userImg} />
                            </li>
                          }
                          content={
                            <ul className="main-menu__dropdown">
                              <li>
                                <Link to={accountUrl}>
                                  <Trans id="Mi Cuenta" />
                                </Link>
                              </li>
                              <li>
                                <Link to={orderHistoryUrl}>
                                  <Trans id="Mis Órdenes" />
                                </Link>
                              </li>
                              <li>
                                <Link to={addressBookUrl}>
                                  <Trans id="Información" />
                                </Link>
                              </li>
                              <li>
                                <Link to={paymentOptionsUrl}>
                                  Formas de Pago
                                </Link>
                              </li>
                              <li onClick={signOut} data-testid="logout-link">
                                Cerrar Sesión
                              </li>
                            </ul>
                          }
                        />
                      ) : (
                        <li
                          data-testid="login-btn"
                          className="main-menu__icon"
                          onClick={() =>
                            overlayContext.show(
                              OverlayType.login,
                              OverlayTheme.right
                            )
                          }
                        >
                          <ReactSVG path={userImg} />
                        </li>
                      )}
                    </>
                  )}
                />
                <li className="main-menu__icon">
                  <Icon size={24} name="heart"/>
                </li>
                <CartContext.Consumer>
                  {cart => (
                    <li
                      className="main-menu__icon main-menu__cart"
                      onClick={() => {
                        overlayContext.show(
                          OverlayType.cart,
                          OverlayTheme.right
                        );
                      }}
                    >
                      <ReactSVG path={cartImg} />
                      {cart.getQuantity() > 0 ? (
                        <span className="main-menu__cart__quantity">
                          {cart.getQuantity()}
                        </span>
                      ) : null}
                    </li>
                  )}
                </CartContext.Consumer>
              </Online>
              <Offline>
                <li className="main-menu__offline">
                  <Media
                    query={{ minWidth: mediumScreen }}
                    render={() => <span>Offline</span>}
                  />
                </li>
              </Offline>
              {/* Search Overlay */}
              <li
                className="main-menu__search"
                onClick={() =>
                  overlayContext.show(OverlayType.search, OverlayTheme.right)
                }
              >
                <Media
                  query={{ minWidth: mediumScreen }}
                  render={() => <span>Buscar</span>}
                />
                <ReactSVG path={searchImg} />
              </li>
            </ul>
        </div>
      </>
    )
  }
  function returnDesktopView(overlayContext) {
    return (
      <>
        <div className="main-menu__left">
          <Link to={baseUrl}>
            <ReactSVG path={logoImg} />
          </Link>
        </div>
        <div className="main-menu__center">
            <TypedMainMenuQuery renderOnError displayLoader={false}>
              {({ data }) => {
                const items = maybe(() => data.shop.navigation.main.items, []);
                return (
                  <ul>
                    {                        
                      items.map(item => (
                        <MenuDropdown 
                          head={
                            <li className="main-menu__item" key={item.id}>
                              <NavDropdown overlay={overlayContext} {...item} />
                            </li>
                          }
                          content={
                            <ul className="main-menu__dropdown">
                              <li>
                                <Link to={accountUrl}>
                                  <Trans id="Mi Cuenta" />
                                </Link>
                              </li>
                              <li>
                                <Link to={orderHistoryUrl}>
                                  <Trans id="Order history" />
                                </Link>
                              </li>
                              <li>
                                <Link to={addressBookUrl}>
                                  <Trans id="Address book" />
                                </Link>
                              </li>
                              <li>
                                <Link to={paymentOptionsUrl}>
                                  Payment options
                                </Link>
                              </li>
                              <li onClick={signOut} data-testid="logout-link">
                                Log Out
                              </li>
                          </ul>
                          }
                        />
                      ))
                    }
                  </ul>
                );
              }}
            </TypedMainMenuQuery>
          </div>
        <div className="main-menu__right">
            <ul>
              <Online>
                <Media
                  query={{ minWidth: smallScreen }}
                  render={() => (
                    <>
                      {user ? (
                        <MenuDropdown
                          head={
                            <li className="main-menu__icon main-menu__user--active">
                              <ReactSVG path={userImg} />
                              <p className="main-menu__icon__text">Perfil</p>
                            </li>
                          }
                          content={
                            <ul className="main-menu__dropdown">
                              <li>
                                <Link to={accountUrl}>
                                  <Trans id="Mi Cuenta" />
                                </Link>
                              </li>
                              <li>
                                <Link to={orderHistoryUrl}>
                                  <Trans id="Mis Órdenes" />
                                </Link>
                              </li>
                              <li>
                                <Link to={addressBookUrl}>
                                  <Trans id="Información de Contacto" />
                                </Link>
                              </li>
                              <li>
                                <Link to={paymentOptionsUrl}>
                                  Mís Formas de Pago
                                </Link>
                              </li>
                              <li onClick={signOut} data-testid="logout-link">
                                Cerrar Sesión
                              </li>
                            </ul>
                          }
                        />
                      ) : (
                        <li
                          data-testid="login-btn"
                          className="main-menu__icon"
                          onClick={() =>
                            overlayContext.show(
                              OverlayType.login,
                              OverlayTheme.right
                            )
                          }
                        >
                          <ReactSVG path={userImg} />
                          <p className="main-menu__icon__text">Perfil</p>
                        </li>
                      )}
                    </>
                  )}
                />
                <li className="main-menu__icon">
                  <Icon size={24} name="heart"/>
                  <p className="main-menu__icon__text">Wishlist</p>
                </li>
                <li className="main-menu__icon">
                  <Icon size={24} name="tick"/>
                  <p className="main-menu__icon__text">Locales</p>
                </li>
                <CartContext.Consumer>
                  {cart => (
                    <li
                      className="main-menu__icon main-menu__cart"
                      onClick={() => {
                        overlayContext.show(
                          OverlayType.cart,
                          OverlayTheme.right
                        );
                      }}
                    >
                      <ReactSVG path={cartImg} />
                      {cart.getQuantity() > 0 ? (
                        <span className="main-menu__cart__quantity">
                          {cart.getQuantity()}
                        </span>
                      ) : null}
                    </li>
                  )}
                </CartContext.Consumer>
              </Online>
              <Offline>
                <li className="main-menu__offline">
                  <Media
                    query={{ minWidth: mediumScreen }}
                    render={() => <span>Offline</span>}
                  />
                </li>
              </Offline>
              {/* Search Overlay */}
              <li
                className="main-menu__search"
                onClick={() =>
                  overlayContext.show(OverlayType.search, OverlayTheme.right)
                }
              >
                <Media
                  query={{ minWidth: mediumScreen }}
                  render={() => <span>Buscar</span>}
                />
                <ReactSVG path={searchImg} />
              </li>
            </ul>
          </div>
      </>
    )
  }
  return (
    <>
    <InfoTopBar/>
      <OverlayContext.Consumer>
        {overlayContext => (
          <>
            <div className="main-menu" id="header">
            <Media 
              query={{ minWidth: mediumScreen }}>
              {
                  matches => 
                    matches ? returnDesktopView(overlayContext) : returnMobileView(overlayContext)
              }
            </Media>
            </div>
          </>
        )}
      </OverlayContext.Consumer>
    </>
  );
};

export default MainMenu;
