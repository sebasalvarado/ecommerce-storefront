/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserWishlistDetails
// ====================================================

export interface UserWishlistDetails_me_wishlist_user {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
}

export interface UserWishlistDetails_me_wishlist_totalPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Money formatted according to the current locale.
   */
  localized: string;
}

export interface UserWishlistDetails_me_wishlist_totalPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Money formatted according to the current locale.
   */
  localized: string;
}

export interface UserWishlistDetails_me_wishlist_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UserWishlistDetails_me_wishlist_totalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UserWishlistDetails_me_wishlist_totalPrice_net;
}

export interface UserWishlistDetails_me_wishlist_subtotalPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Money formatted according to the current locale.
   */
  localized: string;
}

export interface UserWishlistDetails_me_wishlist_subtotalPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Money formatted according to the current locale.
   */
  localized: string;
}

export interface UserWishlistDetails_me_wishlist_subtotalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UserWishlistDetails_me_wishlist_subtotalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UserWishlistDetails_me_wishlist_subtotalPrice_net;
}

export interface UserWishlistDetails_me_wishlist_lines_totalPrice_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Money formatted according to the current locale.
   */
  localized: string;
}

export interface UserWishlistDetails_me_wishlist_lines_totalPrice_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Money formatted according to the current locale.
   */
  localized: string;
}

export interface UserWishlistDetails_me_wishlist_lines_totalPrice {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UserWishlistDetails_me_wishlist_lines_totalPrice_gross;
  /**
   * Amount of money without taxes.
   */
  net: UserWishlistDetails_me_wishlist_lines_totalPrice_net;
}

export interface UserWishlistDetails_me_wishlist_lines_variant_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Money formatted according to the current locale.
   */
  localized: string;
}

export interface UserWishlistDetails_me_wishlist_lines_variant_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Money formatted according to the current locale.
   */
  localized: string;
}

export interface UserWishlistDetails_me_wishlist_lines_variant_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UserWishlistDetails_me_wishlist_lines_variant_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: UserWishlistDetails_me_wishlist_lines_variant_pricing_priceUndiscounted_net;
}

export interface UserWishlistDetails_me_wishlist_lines_variant_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Money formatted according to the current locale.
   */
  localized: string;
}

export interface UserWishlistDetails_me_wishlist_lines_variant_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
  /**
   * Money formatted according to the current locale.
   */
  localized: string;
}

export interface UserWishlistDetails_me_wishlist_lines_variant_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: UserWishlistDetails_me_wishlist_lines_variant_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: UserWishlistDetails_me_wishlist_lines_variant_pricing_price_net;
}

export interface UserWishlistDetails_me_wishlist_lines_variant_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: UserWishlistDetails_me_wishlist_lines_variant_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: UserWishlistDetails_me_wishlist_lines_variant_pricing_price | null;
}

export interface UserWishlistDetails_me_wishlist_lines_variant_product_thumbnail {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
  /**
   * Alt text for an image.
   */
  alt: string | null;
}

export interface UserWishlistDetails_me_wishlist_lines_variant_product_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface UserWishlistDetails_me_wishlist_lines_variant_product {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: UserWishlistDetails_me_wishlist_lines_variant_product_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: UserWishlistDetails_me_wishlist_lines_variant_product_thumbnail2x | null;
}

export interface UserWishlistDetails_me_wishlist_lines_variant {
  __typename: "ProductVariant";
  /**
   * Quantity of a product available for sale.
   */
  stockQuantity: number;
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: UserWishlistDetails_me_wishlist_lines_variant_pricing | null;
  product: UserWishlistDetails_me_wishlist_lines_variant_product;
}

export interface UserWishlistDetails_me_wishlist_lines {
  __typename: "WishlistLine";
  id: string;
  quantity: number;
  /**
   * The sum of the wishlist line price, taxes and discounts.
   */
  totalPrice: UserWishlistDetails_me_wishlist_lines_totalPrice | null;
  variant: UserWishlistDetails_me_wishlist_lines_variant;
}

export interface UserWishlistDetails_me_wishlist {
  __typename: "Wishlist";
  token: any;
  /**
   * The ID of the object.
   */
  id: string;
  user: UserWishlistDetails_me_wishlist_user | null;
  /**
   * ()
   */
  totalPrice: UserWishlistDetails_me_wishlist_totalPrice | null;
  /**
   * The price of the checkout before shipping, including taxes
   */
  subtotalPrice: UserWishlistDetails_me_wishlist_subtotalPrice | null;
  /**
   * A list of wishlist lines, each containing information about an item in the wishlist.
   */
  lines: (UserWishlistDetails_me_wishlist_lines | null)[] | null;
}

export interface UserWishlistDetails_me {
  __typename: "User";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Returms the last wishlist for this user.
   */
  wishlist: UserWishlistDetails_me_wishlist | null;
}

export interface UserWishlistDetails {
  /**
   * Return the currently authenticated user.
   */
  me: UserWishlistDetails_me | null;
}
