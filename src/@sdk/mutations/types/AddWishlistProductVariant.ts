/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { WishlistErrorCode } from "./../../../../types/globalTypes";

// ====================================================
// GraphQL mutation operation: AddWishlistProductVariant
// ====================================================

export interface AddWishlistProductVariant_wishlistAddVariant_wishlist_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface AddWishlistProductVariant_wishlistAddVariant_wishlist_variants_edges_node {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  sku: string;
}

export interface AddWishlistProductVariant_wishlistAddVariant_wishlist_variants_edges {
  __typename: "ProductVariantCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: AddWishlistProductVariant_wishlistAddVariant_wishlist_variants_edges_node;
}

export interface AddWishlistProductVariant_wishlistAddVariant_wishlist_variants {
  __typename: "ProductVariantCountableConnection";
  /**
   * A total count of items in the collection.
   */
  totalCount: number | null;
  edges: AddWishlistProductVariant_wishlistAddVariant_wishlist_variants_edges[];
}

export interface AddWishlistProductVariant_wishlistAddVariant_wishlist {
  __typename: "WishlistItem";
  /**
   * The ID of the object.
   */
  id: string;
  product: AddWishlistProductVariant_wishlistAddVariant_wishlist_product;
  variants: AddWishlistProductVariant_wishlistAddVariant_wishlist_variants;
}

export interface AddWishlistProductVariant_wishlistAddVariant_errors {
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

export interface AddWishlistProductVariant_wishlistAddVariant_wishlistErrors {
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

export interface AddWishlistProductVariant_wishlistAddVariant {
  __typename: "WishlistAddProductVariantMutation";
  /**
   * The wishlist of the current user.
   */
  wishlist: (AddWishlistProductVariant_wishlistAddVariant_wishlist | null)[] | null;
  /**
   * List of errors that occurred executing the mutation.
   */
  errors: AddWishlistProductVariant_wishlistAddVariant_errors[] | null;
  wishlistErrors: AddWishlistProductVariant_wishlistAddVariant_wishlistErrors[] | null;
}

export interface AddWishlistProductVariant {
  /**
   * Add product variant to the current user's wishlist.
   */
  wishlistAddVariant: AddWishlistProductVariant_wishlistAddVariant | null;
}

export interface AddWishlistProductVariantVariables {
  variantId: string;
}
