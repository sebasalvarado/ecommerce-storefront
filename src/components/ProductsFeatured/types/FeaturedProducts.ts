/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FeaturedProducts
// ====================================================

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_thumbnail {
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

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_thumbnail2x {
  __typename: "Image";
  /**
   * The URL of the image.
   */
  url: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_start_net;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_stop_net;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted_stop | null;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_start_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_start_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_start {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_start_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_start_net;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_stop_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_stop_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_stop {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_stop_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_stop_net;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange {
  __typename: "TaxedMoneyRange";
  /**
   * Lower bound of a price range.
   */
  start: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_start | null;
  /**
   * Upper bound of a price range.
   */
  stop: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange_stop | null;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_pricing {
  __typename: "ProductPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The undiscounted price range of the product variants.
   */
  priceRangeUndiscounted: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRangeUndiscounted | null;
  /**
   * The discounted price range of the product variants.
   */
  priceRange: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing_priceRange | null;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_category {
  __typename: "Category";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  sortOrder: number | null;
  /**
   * The URL of the image.
   */
  url: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_variants_images {
  __typename: "ProductImage";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * The URL of the image.
   */
  url: string;
  alt: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_variants_pricing_priceUndiscounted_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_variants_pricing_priceUndiscounted_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_variants_pricing_priceUndiscounted {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProducts_shop_homepageCollection_products_edges_node_variants_pricing_priceUndiscounted_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProducts_shop_homepageCollection_products_edges_node_variants_pricing_priceUndiscounted_net;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_variants_pricing_price_gross {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_variants_pricing_price_net {
  __typename: "Money";
  /**
   * Amount of money.
   */
  amount: number;
  /**
   * Currency code.
   */
  currency: string;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_variants_pricing_price {
  __typename: "TaxedMoney";
  /**
   * Amount of money including taxes.
   */
  gross: FeaturedProducts_shop_homepageCollection_products_edges_node_variants_pricing_price_gross;
  /**
   * Amount of money without taxes.
   */
  net: FeaturedProducts_shop_homepageCollection_products_edges_node_variants_pricing_price_net;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_variants_pricing {
  __typename: "VariantPricingInfo";
  /**
   * Whether it is in sale or not.
   */
  onSale: boolean | null;
  /**
   * The price without any discount.
   */
  priceUndiscounted: FeaturedProducts_shop_homepageCollection_products_edges_node_variants_pricing_priceUndiscounted | null;
  /**
   * The price, with any discount subtracted.
   */
  price: FeaturedProducts_shop_homepageCollection_products_edges_node_variants_pricing_price | null;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_variants_attributes_attribute {
  __typename: "Attribute";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of an attribute displayed in the interface.
   */
  name: string | null;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_variants_attributes_values {
  __typename: "AttributeValue";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * Name of a value displayed in the interface.
   */
  name: string | null;
  /**
   * Name of a value displayed in the interface.
   */
  value: string | null;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_variants_attributes {
  __typename: "SelectedAttribute";
  /**
   * Name of an attribute displayed in the interface.
   */
  attribute: FeaturedProducts_shop_homepageCollection_products_edges_node_variants_attributes_attribute;
  /**
   * Values of an attribute.
   */
  values: (FeaturedProducts_shop_homepageCollection_products_edges_node_variants_attributes_values | null)[];
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node_variants {
  __typename: "ProductVariant";
  /**
   * The ID of the object.
   */
  id: string;
  sku: string;
  name: string;
  /**
   * Quantity of a product available for sale.
   */
  stockQuantity: number;
  /**
   * Whether the variant is in stock and visible or not.
   */
  isAvailable: boolean | null;
  /**
   * List of images for the product variant.
   */
  images: (FeaturedProducts_shop_homepageCollection_products_edges_node_variants_images | null)[] | null;
  /**
   * Lists the storefront variant's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: FeaturedProducts_shop_homepageCollection_products_edges_node_variants_pricing | null;
  /**
   * List of attributes assigned to this variant.
   */
  attributes: FeaturedProducts_shop_homepageCollection_products_edges_node_variants_attributes[];
}

export interface FeaturedProducts_shop_homepageCollection_products_edges_node {
  __typename: "Product";
  /**
   * The ID of the object.
   */
  id: string;
  name: string;
  /**
   * The main thumbnail for a product.
   */
  thumbnail: FeaturedProducts_shop_homepageCollection_products_edges_node_thumbnail | null;
  /**
   * The main thumbnail for a product.
   */
  thumbnail2x: FeaturedProducts_shop_homepageCollection_products_edges_node_thumbnail2x | null;
  /**
   * Lists the storefront product's pricing, the current price and discounts, only meant for displaying.
   */
  pricing: FeaturedProducts_shop_homepageCollection_products_edges_node_pricing | null;
  category: FeaturedProducts_shop_homepageCollection_products_edges_node_category | null;
  /**
   * List of images for the product.
   */
  images: (FeaturedProducts_shop_homepageCollection_products_edges_node_images | null)[] | null;
  /**
   * List of variants for the product.
   */
  variants: (FeaturedProducts_shop_homepageCollection_products_edges_node_variants | null)[] | null;
}

export interface FeaturedProducts_shop_homepageCollection_products_edges {
  __typename: "ProductCountableEdge";
  /**
   * The item at the end of the edge.
   */
  node: FeaturedProducts_shop_homepageCollection_products_edges_node;
}

export interface FeaturedProducts_shop_homepageCollection_products {
  __typename: "ProductCountableConnection";
  edges: FeaturedProducts_shop_homepageCollection_products_edges[];
}

export interface FeaturedProducts_shop_homepageCollection {
  __typename: "Collection";
  /**
   * The ID of the object.
   */
  id: string;
  /**
   * List of products in this collection.
   */
  products: FeaturedProducts_shop_homepageCollection_products | null;
}

export interface FeaturedProducts_shop {
  __typename: "Shop";
  /**
   * Collection displayed on homepage.
   */
  homepageCollection: FeaturedProducts_shop_homepageCollection | null;
}

export interface FeaturedProducts {
  /**
   * Return information about the shop.
   */
  shop: FeaturedProducts_shop | null;
}
