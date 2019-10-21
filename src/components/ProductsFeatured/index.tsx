import './scss/index.scss';

import * as React from 'react';

import { Carousel, ProductListItem } from '..';
import { maybe } from '../../core/utils';
import { TypedFeaturedProductsQuery } from './queries';

interface ProductsFeaturedProps {
  title?: string;
}

const ProductsFeatured: React.FC<ProductsFeaturedProps> = ({ title }) => {
  return (
    <TypedFeaturedProductsQuery displayError={false}>
      {({ data }) => {
        const products = maybe(
          () => data.shop.homepageCollection.products.edges,
          []
        );
        if (products.length) {
          return (
            <div className="products-featured">
              <div className="container">
                <h3>{title}</h3>
                <Carousel>
                  {products.map(({ node: product }) => (
                    <a>
                      <ProductListItem product={product} />
                    </a>
                  ))}
                </Carousel>
              </div>
            </div>
          );
        }
      }}
    </TypedFeaturedProductsQuery>
  );
};

ProductsFeatured.defaultProps = {
  title: "Featured",
};

export default ProductsFeatured;
