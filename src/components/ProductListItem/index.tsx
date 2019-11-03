import './scss/index.scss';

import { Thumbnail } from '@components/molecules';
import { IconButton } from '@temp/@next/components/atoms';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { generateProductUrl } from '../../core/utils';
import { BasicProductFields } from '../../views/Product/types/BasicProductFields';
import { ProductVariantFields } from '../../views/Product/types/ProductVariantFields';
import Modal from '../Modal';
import VariantPicker from '../ProductDescription/VariantPickers';
import { WishlistContext, WishlistInterface } from '../WishlistProvider/context';

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
  variants?: ProductVariantFields[],
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

export type ProductVariantProps = {
  variants: ProductVariantFields[];
  onSelectVariant: React.Dispatch<React.SetStateAction<{
    variantId: string;
    quantity: number;
  }>>
};

interface ProductListItemProps {
  product: Product;
}

const ProductVariantPicker: React.FC<ProductVariantProps> = (props) => {
  return (
    <VariantPicker
      productVariants={props.variants}
      onSelectVariant={props.onSelectVariant}
    >
      {(variant, quantity, variantStock) => (
        <>
        </>
      )}
    </VariantPicker>
  )
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
    variants,
  } = product;
  const [isHovered, setState] = React.useState(false);
  const [ isModalOpen, setModalState ] = React.useState(false);
  const [ productVariant, setProductVariant ] = React.useState({
    variantId: '',
    quantity: 0,
  });
  let secondImage;
  if (images && images.length > 1) {
    secondImage = {
      thumbnail: {
        url: images[1].url,
      },
    }
  }
  function saveVariantToWishlist(wishlist: WishlistInterface) {
    if (productVariant && productVariant.variantId && productVariant.quantity) {
      wishlist.add(productVariant.variantId, productVariant.quantity);
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
    <WishlistContext.Consumer>
      {
        wishlist => (
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
                  <IconButton 
                    onClick={() => {
                      if (variants && variants.length === 1) {
                        wishlist.add(variants[0].id);
                        return;
                      } 
                      setModalState(!isModalOpen);
                    }}
                    size={25} 
                    name="heart"
                  />
            </span>}
            {(!isHovered || !secondImage) &&  getThumbnail(product, id, name)}
            {isHovered && secondImage && getThumbnail(secondImage, id, name)}
    
          </div>
          <h4 className="product-list-item__title">{product.name}</h4>
          <p className="product-list-item__category">{category.name}</p>
          <p className="product-list-item__price">{localized}</p>
          <Modal
            title="Selecciona un Modelo"
            show={isModalOpen}
            submitBtnText="Seleccionar"
            loading={false}
            hide={() => {
              setModalState(false)
            }}
            className="modal-overlay"
            onSelect={saveVariantToWishlist.bind(saveVariantToWishlist, wishlist)}
          >
            <ProductVariantPicker 
              variants={variants}
              onSelectVariant={setProductVariant}
            />
          </Modal>
        </div>
        )
      }
    </WishlistContext.Consumer>
  );
};

export default ProductListItem;
