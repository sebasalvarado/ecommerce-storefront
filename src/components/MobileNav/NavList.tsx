import './scss/index.scss';

import { useSignOut, useUserDetails } from '@sdk/react';
import classNames from 'classnames';
import * as React from 'react';
import { Link } from 'react-router-dom';
import ReactSVG from 'react-svg';

import { Icon } from '../../@next/components/atoms';
import { getAuthToken } from '../../core/auth';
import backImg from '../../images/arrow-back.svg';
import Logo from '../../images/favicon_mobile_ponti.png';
import locationIcon from '../../images/ponti-logos/032-location.svg';
import userImg from '../../images/user.svg';
import { accountUrl, baseUrl, locationsUrl } from '../../routes';
import { OverlayContext, OverlayContextInterface, OverlayTheme, OverlayType } from '../Overlay';
import NavItem, { INavItem } from './NavItem';

interface NavListProps {
  items: INavItem[];
  hideOverlay(): void;
}

interface NavListState {
  parent: INavItem | null;
  displayedItems: INavItem[];
}
interface UserProfileProps {
  overlayContext: OverlayContextInterface
}

const UserProfile: React.FC<UserProfileProps> = (props) => {
  const { data: user } = useUserDetails();
  const [signOut] = useSignOut();
  const { overlayContext } = props;
  if (!user) {
    return (
      <li className={classNames("side-nav__menu-options__item")}
        onClick={() => {
          overlayContext.show(OverlayType.login, OverlayTheme.right);
        }}
      >
        <p className={"side-nav__menu-options__item__text"}>MI PERFIL</p>
        <ReactSVG path={userImg} />
      </li>
    )
  }
  return (
    <>
      <Link to={accountUrl}>
        <li className={classNames("side-nav__menu-options__item")}
        >
          <p className={"side-nav__menu-options__item__text"}>MI PERFIL</p>
          <ReactSVG path={userImg} />
        </li>
      </Link>
      <li className={classNames("side-nav__menu-options__item")}
        onClick={() => {
          signOut();
        }}
      >
        <p className={"side-nav__menu-options__item__text"}>CERRAR SESIÓN</p> 
      </li>
    </>
  );

}
class NavList extends React.PureComponent<NavListProps, NavListState> {
  state: NavListState = {
    displayedItems: this.props.items,
    parent: null,
  };

  handleShowSubItems = (item: INavItem) => {
    this.setState({ parent: item, displayedItems: item.children });
  };

  handleGoBack = () => {
    const grandparent = this.state.parent.parent;

    if (!grandparent) {
      this.setState({ parent: null, displayedItems: this.props.items });
    } else {
      const newParent = this.findItemById(grandparent.id);
      this.setState({
        displayedItems: newParent.children,
        parent: newParent,
      });
    }
  };

  findItemById(id: string): INavItem {
    let match = null;
    function find(item) {
      if (item.id === id) {
        match = item;
        return true;
      }
      return item.children && item.children.some(find);
    }
    this.props.items.some(find);
    return match;
  }

  render() {
    const { hideOverlay } = this.props;
    const { displayedItems, parent } = this.state;
    const isAuthenticated = !!getAuthToken();

    return (
      <OverlayContext.Consumer>
        { overlayContext => (
          <div className={"side-nav__container"}>
          <ul>
            {parent ? (
              <li className="side-nav__menu-item side-nav__menu-item-back">
                <span onClick={this.handleGoBack}>
                  <ReactSVG path={backImg} /> {parent.name}
                </span>
              </li>
            ) : (
              <>
                <li className="side-nav__menu-item side-nav__menu-item--parent">
                  <Link
                    to={baseUrl}
                    className="side-nav__menu-item-logo"
                    onClick={hideOverlay}
                  >
                    <img src={Logo} />
                  </Link>
                  <span className="side-nav__menu-item-close" onClick={hideOverlay}>
                    <span />
                  </span>
                </li>
                <li className="side-nav__menu-item">
                  <Link
                    to={baseUrl}
                    className="side-nav__menu-item-link"
                    onClick={hideOverlay}
                  >
                    Home
                  </Link>
                </li>
              </>
            )}

            {displayedItems.map(item => (
              <NavItem
                key={item.id}
                hideOverlay={hideOverlay}
                showSubItems={this.handleShowSubItems}
                {...item}
              />
            ))}
          </ul>
          <ul className={"side-nav__menu-options__container"}>
            { isAuthenticated &&
              <li className={classNames("side-nav__menu-options__item")}
                onClick={() => {
                  overlayContext.show(OverlayType.wishlist, OverlayTheme.right);                
                }}
              >
              <p className={"side-nav__menu-options__item__text"}>FAVORITOS</p>
              <Icon size={24} name="heart"/>
              </li> 
            }
            <Link to={locationsUrl}>
              <li className={"side-nav__menu-options__item"}>
                <p className={"side-nav__menu-options__item__text"}>LOCALES</p>
                <ReactSVG path={locationIcon} />
              </li>
            </Link>
            <UserProfile 
              overlayContext={overlayContext}
            />
          </ul>
        </div>
        )}
      </OverlayContext.Consumer>
    );
  }
}

export default NavList;
