import { WishlistItem_variants_edges_node } from '@sdk/fragments/types/WishlistItem';
import * as React from 'react';

import { ApolloErrorWithUserInput } from '../../types';

export interface IWishlistContext {
  wishlist: WishlistItem_variants_edges_node[];
  loading: boolean;
  error: ApolloErrorWithUserInput | null;
  update(): void;
  add: (variantId: string) => void;
  remove: (variantId: string) => void;
  addToCart: () => void;
}

export const WishlistContext = React.createContext<IWishlistContext>({
  error: null,
  loading: false,
  update: () => null,
  wishlist: [],
  add: (variantId: string) => null,
  remove: (variantId: string) => null,
  addToCart: () => null
});

WishlistContext.displayName = "WishlistContext";