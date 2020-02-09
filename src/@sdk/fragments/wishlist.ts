import gql from 'graphql-tag';

export const wishlistItemFragment = gql`
  fragment WishlistItem on WishlistItem {
    id
    product {
      id
      name
    }
    variants(first: 100) {
      totalCount
      edges {
        node {
          id
          name
          sku
        }
      }
    }
  }
`;
