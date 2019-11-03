import { useUserDetails } from '@sdk/react';
import React from 'react';

import { IconButton } from '../../@next/components/atoms';
import { CheckoutContext } from '../../checkout/context';
import { TypedCreateCheckoutMutation } from '../../checkout/queries';
import { CartLine } from '../CartProvider/context';
import AddToCartButton from './AddToCartButton';

const AddToCart: React.FC<{
  disabled: boolean;
  lines: CartLine[];
  onSubmit: () => void;
  onAddWishlist: () => void;
}> = ({ disabled, lines, onSubmit, onAddWishlist }) => {
  const { data: user } = useUserDetails();
  return (
          <CheckoutContext.Consumer>
          {({ checkout, update, loading: checkoutLoading }) => (
            <TypedCreateCheckoutMutation
              onCompleted={async ({ checkoutCreate: { checkout, errors } }) => {
                if (!errors.length) {
                  await update({ checkout });
                }
                onSubmit();
              }}
            >
              {(createCheckout, { loading: mutationLoading }) => (
                <span>
                  <AddToCartButton
                    className="product-description__action"
                    onClick={() => {
                      if (user && !checkout) {
                        createCheckout({
                          variables: {
                            checkoutInput: { email: user.email, lines },
                          },
                        });
                      } else {
                        onSubmit();
                      }
                    }}
                    disabled={disabled || mutationLoading || checkoutLoading}
                  >
                    Comprar Ahora
                  </AddToCartButton>
                  <IconButton
                    size={40}
                    name="heart"
                    onClick={onAddWishlist}  
                  />
                </span>
              )}
            </TypedCreateCheckoutMutation>
          )}
        </CheckoutContext.Consumer>
  )
};

export default AddToCart;
