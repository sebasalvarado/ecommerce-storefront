import gql from 'graphql-tag';

import { wishlistItemFragment } from '../fragments/wishlist';

export const userWishlist = gql`
  ${wishlistItemFragment}
  query UserWishlist($after: String, $first: Int) {
    me {
      id
      wishlist(after: $after, first: $first) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            ...WishlistItem
          }
        }
      }
    }
  }
`;
