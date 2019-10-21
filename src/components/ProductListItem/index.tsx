import './scss/index.scss';

import { Thumbnail } from '@components/molecules';
import { IconButton } from '@temp/@next/components/atoms';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { generateProductUrl } from '../../core/utils';
import { BasicProductFields } from '../../views/Product/types/BasicProductFields';
import { WishlistContext } from '../WishlistProvider/context';

export interface Product extends BasicProductFields {
  id: string;
  name: string;
  category?: {
    id: string;
    name: string;
  };
  images?: Array<{
    id: string;
    sortOrder: number;
    url: string
  }>
  pricing: {
    priceRange: {
      start: {
        gross: {
          localized: string;
        };
      };
    };
  };
}

interface ProductListItemProps {
  product: Product;
}

const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const {
    id,
    name,
    pricing: {
      priceRange: {
        start: {
          gross: { localized },
        },
      },
    },
    category,
    images,
  } = product;
  const [isHovered, setState] = React.useState(false);
  let secondImage;
  if (images && images.length > 1) {
    secondImage = {
      thumbnail: {
        url: images[1].url,
      },
    }
  }
  function getThumbnail(source, id, name) {
    return(
      <Link
      to={generateProductUrl(id, name)}
      key={id}
      >
        <Thumbnail source={source} />
      </Link>
    )
  }
  return (
    <div className="product-list-item"
      onMouseOver={() => {
        if (!isHovered) {
          setState(!isHovered)
        }
      }} 
      onMouseLeave={() =>  {
        if (isHovered) {
          setState(!isHovered)
        }
      }}
    >
      <div className="product-list-item__image">
        {isHovered && 
        <span className="product-list-item__image__wishlist">
          <WishlistContext.Consumer>
          {
            wishlist => (
              <IconButton 
                onClick={() => {
                  wishlist.add(id);
                }}
                size={25} 
                name="heart"
              />
            )
          }
          </WishlistContext.Consumer>
        </span>}
        {(!isHovered || !secondImage) &&  getThumbnail(product, id, name)}
        {isHovered && secondImage && getThumbnail(secondImage, id, name)}

      </div>
      <h4 className="product-list-item__title">{product.name}</h4>
      <p className="product-list-item__category">{category.name}</p>
      <p className="product-list-item__price">{localized}</p>
    </div>
  );
};

export default ProductListItem;
