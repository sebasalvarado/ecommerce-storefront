import { Button, Loader } from '@components/atoms';
import { ProductTile } from '@components/molecules';
import React from 'react';
import { Link } from 'react-router-dom';

import { generateProductUrl } from '../../../../core/utils';
import * as S from './styles';
import { IProps } from './types';

export const ProductList: React.FC<IProps> = ({
  products,
  canLoadMore = false,
  loading,
  onLoadMore,
}: IProps) => {
  return (
    <>
      <S.List>
        {products.map(product => (
          <Link
            to={generateProductUrl(product.id, product.name)}
            key={product.id}
          >
            <ProductTile product={product} />
          </Link>
        ))}
      </S.List>
      <S.Loader>
        {loading ? (
          <Loader />
        ) : (
          canLoadMore && (
            <Button color="secondary" onClick={onLoadMore}>
              Más Opciones +
            </Button>
          )
        )}
      </S.Loader>
    </>
  );
};
