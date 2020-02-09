import './scss/index.scss';

import { Thumbnail } from '@components/molecules';
import { ProductVariantPicker } from '@components/organisms';
import { ProductDetails_product_variants } from '@sdk/queries/types/ProductDetails';
import { useAuth } from '@sdk/react';
import { IconButton } from '@temp/@next/components/atoms';
import { IProductVariantsAttributesSelectedValues } from '@types';
import isEqual from 'lodash/isEqual';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { TaxedMoney } from '../../@next/components/containers';
import { IWishlistContext, WishlistContext } from '../../@sdk/react/components/WishlistProvider/context';
import { generateProductUrl } from '../../core/utils';
import { BasicProductFields } from '../../views/Product/types/BasicProductFields';
import { ProductVariantFields } from '../../views/Product/types/ProductVariantFields';
import Modal from '../Modal';


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
          amount: number;
          currency: string;
        };
        net: {
          amount: number;
          currency: string;
        };
      };
    };
    priceRangeUndiscounted: {
      start: {
        gross: {
          amount: number;
          currency: string;
        };
        net: {
          amount: number;
          currency: string;
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


const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const {
    id,
    name,
    category,
    images,
    variants,
  } = product;

  const [isHovered, setState] = React.useState(false);
  const [ isAuthenticated, setAuthenticatedState ] = React.useState(false);
  const [ isModalOpen, setModalState ] = React.useState(false);
  const [ productVariant, setProductVariant ] = React.useState({
    variantId: '',
    quantity: 0,
  });

  const price = product.pricing.priceRange.start;
  const priceUndiscounted = product.pricing.priceRangeUndiscounted.start;

  const getProductPrice = () => {
    if (isEqual(price, priceUndiscounted)) {
      return <TaxedMoney taxedMoney={price} />;
    } else {
      return (
        <>
          <span className="product-list-item__undiscounted_price">
            <TaxedMoney taxedMoney={priceUndiscounted} />
          </span>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <TaxedMoney taxedMoney={price} />
        </>
      );
    }
  };

  const onVariantPickerChange = (
    _selectedAttributesValues?: IProductVariantsAttributesSelectedValues,
    selectedVariant?: ProductDetails_product_variants
  ) => {
    if (selectedVariant) {
      setProductVariant({
        variantId: selectedVariant.id,
        quantity: 1
      });
    } else {
      setProductVariant({
        variantId: '',
        quantity: 0
      });
    }
  };

  // Check authentication
  useAuth((authenticated) => {
    setAuthenticatedState(authenticated);
  });

  let secondImage;
  if (images && images.length > 1) {
    secondImage = {
      thumbnail: {
        url: images[1].url,
      },
    }
  }

  function saveVariantToWishlist(wishlist: IWishlistContext) {
    if (productVariant && productVariant.variantId && productVariant.quantity) {
      wishlist.add(productVariant.variantId);
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
            {isHovered && isAuthenticated &&
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
                    name="heart_menu"
                  />
            </span>}
            {(!isHovered || !secondImage) &&  getThumbnail(product, id, name)}
            {isHovered && secondImage && getThumbnail(secondImage, id, name)}
    
          </div>
          <h4 className="product-list-item__title">{product.name}</h4>
          <p className="product-list-item__category">{category.name}</p>
          <p className="product-list-item__price">{getProductPrice()}</p>
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
              productVariants={variants}
              onChange={onVariantPickerChange}
            />
          </Modal>
        </div>
        )
      }
    </WishlistContext.Consumer>
  );
};

export default ProductListItem;
