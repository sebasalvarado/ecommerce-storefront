import './scss/index.scss';

import * as React from 'react';
import ReactSVG from 'react-svg';

import { Button, Offline, OfflinePlaceholder, Online, Overlay, OverlayContextInterface } from '../..';
import { Icon } from '../../../@next/components/atoms';
import closeImg from '../../../images/x.svg';
import { TypedProductVariantsQuery } from '../../../views/Product/queries';
import { Error } from '../../Error';
import Loader from '../../Loader';
import { WishlistContext } from '../../WishlistProvider/context';
import { extractWishlistLines } from '../../WishlistProvider/utils';
import ProductList from '../Cart/ProductList';
import Empty from './components/Empty';

const Wishlist: React.FC<{ overlay: OverlayContextInterface }> = ({ overlay }) => {

    return(
        <Overlay context={overlay}>
            <Online>
                <WishlistContext.Consumer>
                    {
                        wishlist => (
                            <TypedProductVariantsQuery
                              displayLoader={false}
                              variables={{ ids: wishlist.lines.map(line => line.variantId) }}
                              skip={!wishlist.lines.length}
                              alwaysRender
                            >
                              {({ data, loading, error }) => {
                                if (loading) {
                                  return (
                                    <div className="wishlist">
                                      <Loader full />
                                    </div>
                                  );
                                }
                                if (error) {
                                  return <Error error={error.message} />;
                                }

                                return (
                                  <div className="wishlist">
                                    <div className="overlay__header">
                                      <Icon size={25} name="heart"/>
                                    <div className="overlay__header-text">
                                      Mi Wishlist, {" "}
                                      <span className="overlay__header-text-items">
                                        { wishlist.getQuantity() || 0} items
                                      </span>
                                    </div>
                                    <ReactSVG
                                      path={closeImg}
                                      onClick={overlay.hide}
                                      className="overlay__header__close-icon"
                                    />
                                    </div>
                                    { wishlist.lines.length && data ? (
                                      <>
                                        <ProductList
                                            lines={extractWishlistLines(data, wishlist.lines)}
                                            remove={wishlist.remove}
                                        />
                                        <div className="wishlist__footer">
                                          <div className="wishlist__footer__button">
                                            <Button
                                              onClick={wishlist.addToCart}
                                              secondary>
                                              Añadir a Mis Compras
                                            </Button>
                                          </div>
                                        </div>
                                      </>
                                    ): (
                                      <Empty overlayHide={overlay.hide} />
                                    )}
                                  </div>
                                )
                              }}
                            </TypedProductVariantsQuery>
                        )
                    }
                </WishlistContext.Consumer>
            </Online>
            <Offline>
              <div className="wishlist">
                <OfflinePlaceholder />
              </div>
            </Offline>
        </Overlay>
    )
};

export default Wishlist;