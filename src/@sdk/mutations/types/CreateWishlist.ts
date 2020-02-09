// /* tslint:disable */
// /* eslint-disable */
// // This file was automatically generated and should not be edited.

// import { WishlistCreateInput } from "./../../../../types/globalTypes";

// // ====================================================
// // GraphQL mutation operation: CreateWishlist
// // ====================================================

// export interface CreateWishlist_wishlistCreate_errors {
//   __typename: "Error";
//   /**
//    * Name of a field that caused the error. A value of `null` indicates that the
//    * error isn't associated with a particular field.
//    */
//   field: string | null;
//   /**
//    * The error message.
//    */
//   message: string | null;
// }

// export interface CreateWishlist_wishlistCreate_wishlist_lines_totalPrice_gross {
//   __typename: "Money";
//   /**
//    * Amount of money.
//    */
//   amount: number;
//   /**
//    * Currency code.
//    */
//   currency: string;
//   /**
//    * Money formatted according to the current locale.
//    */
//   localized: string;
// }

// export interface CreateWishlist_wishlistCreate_wishlist_lines_totalPrice_net {
//   __typename: "Money";
//   /**
//    * Amount of money.
//    */
//   amount: number;
//   /**
//    * Currency code.
//    */
//   currency: string;
//   /**
//    * Money formatted according to the current locale.
//    */
//   localized: string;
// }

// export interface CreateWishlist_wishlistCreate_wishlist_lines_totalPrice {
//   __typename: "TaxedMoney";
//   /**
//    * Amount of money including taxes.
//    */
//   gross: CreateWishlist_wishlistCreate_wishlist_lines_totalPrice_gross;
//   /**
//    * Amount of money without taxes.
//    */
//   net: CreateWishlist_wishlistCreate_wishlist_lines_totalPrice_net;
// }

// export interface CreateWishlist_wishlistCreate_wishlist_lines_variant_pricing_priceUndiscounted_gross {
//   __typename: "Money";
//   /**
//    * Amount of money.
//    */
//   amount: number;
//   /**
//    * Currency code.
//    */
//   currency: string;
//   /**
//    * Money formatted according to the current locale.
//    */
//   localized: string;
// }

// export interface CreateWishlist_wishlistCreate_wishlist_lines_variant_pricing_priceUndiscounted_net {
//   __typename: "Money";
//   /**
//    * Amount of money.
//    */
//   amount: number;
//   /**
//    * Currency code.
//    */
//   currency: string;
//   /**
//    * Money formatted according to the current locale.
//    */
//   localized: string;
// }

// export interface CreateWishlist_wishlistCreate_wishlist_lines_variant_pricing_priceUndiscounted {
//   __typename: "TaxedMoney";
//   /**
//    * Amount of money including taxes.
//    */
//   gross: CreateWishlist_wishlistCreate_wishlist_lines_variant_pricing_priceUndiscounted_gross;
//   /**
//    * Amount of money without taxes.
//    */
//   net: CreateWishlist_wishlistCreate_wishlist_lines_variant_pricing_priceUndiscounted_net;
// }

// export interface CreateWishlist_wishlistCreate_wishlist_lines_variant_pricing_price_gross {
//   __typename: "Money";
//   /**
//    * Amount of money.
//    */
//   amount: number;
//   /**
//    * Currency code.
//    */
//   currency: string;
//   /**
//    * Money formatted according to the current locale.
//    */
//   localized: string;
// }

// export interface CreateWishlist_wishlistCreate_wishlist_lines_variant_pricing_price_net {
//   __typename: "Money";
//   /**
//    * Amount of money.
//    */
//   amount: number;
//   /**
//    * Currency code.
//    */
//   currency: string;
//   /**
//    * Money formatted according to the current locale.
//    */
//   localized: string;
// }

// export interface CreateWishlist_wishlistCreate_wishlist_lines_variant_pricing_price {
//   __typename: "TaxedMoney";
//   /**
//    * Amount of money including taxes.
//    */
//   gross: CreateWishlist_wishlistCreate_wishlist_lines_variant_pricing_price_gross;
//   /**
//    * Amount of money without taxes.
//    */
//   net: CreateWishlist_wishlistCreate_wishlist_lines_variant_pricing_price_net;
// }

// export interface CreateWishlist_wishlistCreate_wishlist_lines_variant_pricing {
//   __typename: "VariantPricingInfo";
//   /**
//    * Whether it is in sale or not.
//    */
//   onSale: boolean | null;
//   /**
//    * The price without any discount.
//    */
//   priceUndiscounted: CreateWishlist_wishlistCreate_wishlist_lines_variant_pricing_priceUndiscounted | null;
//   /**
//    * The price, with any discount subtracted.
//    */
//   price: CreateWishlist_wishlistCreate_wishlist_lines_variant_pricing_price | null;
// }

// export interface CreateWishlist_wishlistCreate_wishlist_lines_variant_product_thumbnail {
//   __typename: "Image";
//   /**
//    * The URL of the image.
//    */
//   url: string;
//   /**
//    * Alt text for an image.
//    */
//   alt: string | null;
// }

// export interface CreateWishlist_wishlistCreate_wishlist_lines_variant_product_thumbnail2x {
//   __typename: "Image";
//   /**
//    * The URL of the image.
//    */
//   url: string;
// }

// export interface CreateWishlist_wishlistCreate_wishlist_lines_variant_product {
//   __typename: "Product";
//   /**
//    * The ID of the object.
//    */
//   id: string;
//   name: string;
//   /**
//    * The main thumbnail for a product.
//    */
//   thumbnail: CreateWishlist_wishlistCreate_wishlist_lines_variant_product_thumbnail | null;
//   /**
//    * The main thumbnail for a product.
//    */
//   thumbnail2x: CreateWishlist_wishlistCreate_wishlist_lines_variant_product_thumbnail2x | null;
// }

// export interface CreateWishlist_wishlistCreate_wishlist_lines_variant {
//   __typename: "ProductVariant";
//   /**
//    * Quantity of a product available for sale.
//    */
//   stockQuantity: number;
//   /**
//    * The ID of the object.
//    */
//   id: string;
//   name: string;
//   /**
//    * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
//    */
//   pricing: CreateWishlist_wishlistCreate_wishlist_lines_variant_pricing | null;
//   product: CreateWishlist_wishlistCreate_wishlist_lines_variant_product;
// }

// export interface CreateWishlist_wishlistCreate_wishlist_lines {
//   __typename: "WishlistLine";
//   id: string;
//   quantity: number;
//   /**
//    * The sum of the wishlist line price, taxes and discounts.
//    */
//   totalPrice: CreateWishlist_wishlistCreate_wishlist_lines_totalPrice | null;
//   variant: CreateWishlist_wishlistCreate_wishlist_lines_variant;
// }

// export interface CreateWishlist_wishlistCreate_wishlist {
//   __typename: "Wishlist";
//   /**
//    * The ID of the object.
//    */
//   id: string;
//   /**
//    * A list of wishlist lines, each containing information about an item in the wishlist.
//    */
//   lines: (CreateWishlist_wishlistCreate_wishlist_lines | null)[] | null;
// }

// export interface CreateWishlist_wishlistCreate {
//   __typename: "WishlistCreate";
//   /**
//    * List of errors that occurred executing the mutation.
//    */
//   errors: CreateWishlist_wishlistCreate_errors[] | null;
//   wishlist: CreateWishlist_wishlistCreate_wishlist | null;
// }

// export interface CreateWishlist {
//   /**
//    * Create a new wishlist
//    */
//   wishlistCreate: CreateWishlist_wishlistCreate | null;
// }

// export interface CreateWishlistVariables {
//   wishlistInput: WishlistCreateInput;
// }
