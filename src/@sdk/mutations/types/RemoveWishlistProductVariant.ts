/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { WishlistErrorCode } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: RemoveWishlistProductVariant
// ====================================================

export interface RemoveWishlistProductVariant_wishlistRemoveVariant_wishlist_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface RemoveWishlistProductVariant_wishlistRemoveVariant_wishlist_variants_edges_node {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  sku: string;
}

export interface RemoveWishlistProductVariant_wishlistRemoveVariant_wishlist_variants_edges {
  __typename: "ProductVariantCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: RemoveWishlistProductVariant_wishlistRemoveVariant_wishlist_variants_edges_node;
}

export interface RemoveWishlistProductVariant_wishlistRemoveVariant_wishlist_variants {
  __typename: "ProductVariantCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: RemoveWishlistProductVariant_wishlistRemoveVariant_wishlist_variants_edges[];
}

export interface RemoveWishlistProductVariant_wishlistRemoveVariant_wishlist {
  __typename: "WishlistItem";
  /**
   * The ID of the object.
   */
  id: string;
  product: RemoveWishlistProductVariant_wishlistRemoveVariant_wishlist_product;
  variants: RemoveWishlistProductVariant_wishlistRemoveVariant_wishlist_variants;
}

export interface RemoveWishlistProductVariant_wishlistRemoveVariant_errors {
  __typename: "Error";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
}

export interface RemoveWishlistProductVariant_wishlistRemoveVariant_wishlistErrors {
  __typename: "WishlistError";
  /**
   * Name of a field that caused the error. A value of `null` indicates that the
   * error isn't associated with a particular field.
   */
  field: string | null;
  /**
   * The error message.
   */
  message: string | null;
  /**
   * The error code.
   */
  code: WishlistErrorCode | null;
}

export interface RemoveWishlistProductVariant_wishlistRemoveVariant {
  __typename: "WishlistRemoveProductVariantMutation";
  /**
   * The wishlist of the current user.
   */
  wishlist: (RemoveWishlistProductVariant_wishlistRemoveVariant_wishlist | null)[] | null;
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: RemoveWishlistProductVariant_wishlistRemoveVariant_errors[] | null;
  wishlistErrors: RemoveWishlistProductVariant_wishlistRemoveVariant_wishlistErrors[] | null;
}

export interface RemoveWishlistProductVariant {
  /**
   * Remove product variant from the current user's wishlist.
   */
  wishlistRemoveVariant: RemoveWishlistProductVariant_wishlistRemoveVariant | null;
}

export interface RemoveWishlistProductVariantVariables {
  variantId: string;
}
