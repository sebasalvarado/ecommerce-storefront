import { priceToString } from '../../core/utils';
import { VariantList } from '../../views/Product/types/VariantList';
import { LineI } from '../CartTable/ProductRow';
import { WishlistLineInterface } from './context';

export const extractWishlistLines = (
    data: VariantList,
    lines: WishlistLineInterface[]
  ): LineI[] =>
    data.productVariants.edges
      .map(({ node }) => {
        const line = lines.find(({ variantId }) => variantId === node.id);
        if (!line) {
          return;
        }
        const quantity = line.quantity;
        return {
          ...node,
          quantity,
          totalPrice: priceToString(
            {
              amount: quantity * node.pricing.price.gross.amount,
              currency: node.pricing.price.gross.currency,
            }
          ),
        };
      })
      .filter(line => line)
      .sort((a, b) => b.id.toLowerCase().localeCompare(a.id.toLowerCase()));
  