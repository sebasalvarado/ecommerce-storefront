import './scss/index.scss';

import { Thumbnail } from '@components/molecules';
import { Icon } from '@temp/@next/components/atoms';
import * as React from 'react';

import { BasicProductFields } from '../../views/Product/types/BasicProductFields';

export interface Product extends BasicProductFields {
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
          <Icon size={25} name="heart"/>
        </span>}
        {(!isHovered || !secondImage) && <Thumbnail source={product} /> }
        {isHovered && secondImage && <Thumbnail source={secondImage} />}

      </div>
      <h4 className="product-list-item__title">{product.name}</h4>
      <p className="product-list-item__category">{category.name}</p>
      <p className="product-list-item__price">{localized}</p>
    </div>
  );
};

export default ProductListItem;
