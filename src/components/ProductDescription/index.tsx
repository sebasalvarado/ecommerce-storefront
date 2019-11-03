import './scss/index.scss';

import { ProductDetails_product_variants, ProductDetails_product_variants_pricing } from '@sdk/queries/types/ProductDetails';
import * as React from 'react';

import { CartContext, CartLine } from '../CartProvider/context';
import { WishlistContext, WishlistInterface } from '../WishlistProvider/context';
import AddToCart from './AddToCart';
import VariantPicker from './VariantPickers';

interface ProductDescriptionProps {
  productVariants: ProductDetails_product_variants[];
  name: string;
  children: React.ReactNode;
  addToCart(varinatId: string, quantity?: number): void;
}

interface ProductDescriptionState {
  pricing: ProductDetails_product_variants_pricing;
}

class ProductDescription extends React.Component<
  ProductDescriptionProps,
  ProductDescriptionState
> {
  constructor(props: ProductDescriptionProps) {
    super(props);
    this.state = {
      pricing: this.props.productVariants[0].pricing,
    };
  }
  handleSubmit = (variant: string, quantity: number) => {
    this.props.addToCart(variant, quantity);
  };

  handleAddToWishlist = (wishlist: WishlistInterface, variant: string, quantity: number) => {
    wishlist.add(variant, quantity);
  }

  canAddToCart = (lines: CartLine[], variant: string, quantity: number, variantStock: number) => {
    const cartLine = lines.find(({ variantId }) => variantId === variant);
    const syncedQuantityWithCart = cartLine
      ? quantity + cartLine.quantity
      : quantity;
    return (
      quantity !== 0 && (variant && variantStock >= syncedQuantityWithCart)
    );
  };

  render() {
    const { children, name } = this.props;
    const {
      pricing,
    } = this.state;

    return (
      <div className="product-description">
        <h3>{name}</h3>
        <h4>{pricing.price.gross.localized}</h4>
        <VariantPicker 
          productVariants={this.props.productVariants}
        >
        {( variant, quantity, variantStock) => (
          <>
          <div className="product-description__about">
            <h4>Description</h4>
              {children}
          </div>
          <WishlistContext.Consumer>
            {wishlist => (
              <CartContext.Consumer>
                {({ lines }) => (
                  <AddToCart
                    onSubmit={this.handleSubmit.bind(this, variant, quantity)}
                    lines={lines}
                    disabled={!this.canAddToCart(lines, variant, quantity,variantStock)}
                    onAddWishlist={this.handleAddToWishlist.bind(this, wishlist, variant, quantity)}
                  />
                )}
              </CartContext.Consumer>
            )}
          </WishlistContext.Consumer>
          </>
        )}
        </VariantPicker>
      </div>
    );
  }
}

export default ProductDescription;
