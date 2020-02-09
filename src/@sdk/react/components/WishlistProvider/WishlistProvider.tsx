import { WishlistItem_variants_edges_node } from '@sdk/fragments/types/WishlistItem';
import { useAddWishlistProductVariant, useRemoveWishlistProductVariant, useUserWishlist } from '@sdk/react';
import React from 'react';

import { WishlistContext } from './context';
import { IProps } from './types';

const WHISHLIST_ITEMS_PER_API_CALL = 100;

export function WishlistProvider({
  children,
  cart
}: IProps): React.ReactElement<IProps> {
  const { data, loading, error, loadMore, refetch } = useUserWishlist({
    first: WHISHLIST_ITEMS_PER_API_CALL,
  });

  React.useEffect(() => {
    console.log('UPDATE ON DATA');
    console.log(data);
    if (data && data.pageInfo.hasNextPage) {
      loadMore({
        after: data!.pageInfo.endCursor,
        first: WHISHLIST_ITEMS_PER_API_CALL,
      });
    }
  }, [data]);

  const [ addVariantWishlist] = useAddWishlistProductVariant({ variantId: ''});
  const [ removeVariantWishlist] = useRemoveWishlistProductVariant({
      variantId: '',
  });

  const update = () => {
    refetch({
      first: WHISHLIST_ITEMS_PER_API_CALL,
    });
  };
  
  const add = (variantId: string) => {
      addVariantWishlist({
          variantId,
      });
      update();
  }

  const addToCart = () => {
      const variants = data ? data.edges.map((d) => d.node.id) : [];

      variants.forEach((variantId) => {
        cart.add(variantId, 1);
      });
  }

  const remove = (variantId: string) => {
    removeVariantWishlist({
        variantId,
    });
    update();
  }

  const getWishlistItems = () => {
    if (!data || !data.edges) {
      return [];
    }
    return data.edges
      .flatMap((value) => {
        const variants = value.node.variants.edges.map((edge) => edge.node);
        return variants;
      }) as WishlistItem_variants_edges_node[];
  }

  const getContext = () => ({
    error,
    loading,
    update,
    wishlist: getWishlistItems(),
    add,
    remove,
    addToCart,
  });

  return (
    <WishlistContext.Provider value={getContext()}>
      {children}
    </WishlistContext.Provider>
  );
}
