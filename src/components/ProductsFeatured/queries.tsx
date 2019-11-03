import gql from 'graphql-tag';

import { productVariantFragment } from '../../@sdk/fragments/products';
import { TypedQuery } from '../../core/queries';
import { basicProductFragment, productPricingFragment } from '../../views/Product/queries';
import { FeaturedProducts } from './types/FeaturedProducts';

export const featuredProducts = gql`
  ${basicProductFragment}
  ${productPricingFragment}
  ${productVariantFragment}
  query FeaturedProducts {
    shop {
      homepageCollection {
        id
        products(first: 20) {
          edges {
            node {
              ...BasicProductFields
              ...ProductPricingField
              category {
                id
                name
              }
              images {
                id
                sortOrder
                url
              }
              variants {
                ...ProductVariantFields
              }
            }
          }
        }
      }
    }
  }
`;

export const TypedFeaturedProductsQuery = TypedQuery<FeaturedProducts, {}>(
  featuredProducts
);
