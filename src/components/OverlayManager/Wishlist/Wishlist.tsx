import './scss/index.scss';

import { WishlistItem_variants_edges_node } from '@sdk/fragments/types/WishlistItem';
import * as React from 'react';
import ReactSVG from 'react-svg';

import { Button, Offline, OfflinePlaceholder, Online, Overlay, OverlayContextInterface } from '../..';
import { Icon } from '../../../@next/components/atoms';
import { WishlistContext } from '../../../@sdk/react/components/WishlistProvider/context';
import closeImg from '../../../images/x.svg';
import { TypedProductVariantsQuery } from '../../../views/Product/queries';
import { VariantList } from '../../../views/Product/types/VariantList';
import { Error } from '../../Error';
import Loader from '../../Loader';
import ProductList from '../Cart/ProductList';
import Empty from './components/Empty';

const Wishlist: React.FC<{ overlay: OverlayContextInterface }> = ({ overlay }) => {

    function toWishlistLines(
      data: VariantList,
      lines: WishlistItem_variants_edges_node[]
    ) {
     return data.productVariants.edges
      .map(({ node }) => {
        const line = lines.find((thisLine) => thisLine.id === node.id);
        if (!line) {
          return null;
        }
        const quantity = 1;
        return {
          ...node,
          quantity,
          totalPrice: {
            ...node.pricing.price,
            currency: node.pricing.price.gross.currency,
            gross: {
              amount: quantity * node.pricing.price.gross.amount,
              ...node.pricing.price.gross,
            },
            net: {
              amount: quantity * node.pricing.price.net.amount,
              ...node.pricing.price.net,
            },
          },
        };
      })
      .filter(line => line)
      .sort((a, b) => b.id.toLowerCase().localeCompare(a.id.toLowerCase()));
    }

    return(
        <Overlay context={overlay}>
            <Online>
                <WishlistContext.Consumer>
                    {
                        wishlist => (
                            <TypedProductVariantsQuery
                              displayLoader={false}
                              variables={{ ids: (wishlist.wishlist || []) .map(line => line.id) }}
                              skip={!((wishlist.wishlist || []).length)}
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
                                      <Icon size={25} name="heart_menu"/>
                                    <div className="overlay__header-text">
                                      Mis Favoritos, {" "}
                                      <span className="overlay__header-text-items">
                                        { wishlist.wishlist.length || 0} items
                                      </span>
                                    </div>
                                    <ReactSVG
                                      path={closeImg}
                                      onClick={overlay.hide}
                                      className="overlay__header__close-icon"
                                    />
                                    </div>
                                    { wishlist.wishlist.length && data ? (
                                      <>
                                        <ProductList
                                            lines={toWishlistLines(data, wishlist.wishlist)}
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