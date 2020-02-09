import * as React from 'react';
import { Link } from 'react-router-dom';

import { baseUrl } from '../routes';
import Button from './Button';

const EmptyCart: React.FC<{}> = () => (
  <div className="cart-page__empty">
    <h4>No hay productos seleccionados</h4>
    <p>
      No has añadido productos a tus compras todavia. Estamos seguros que encontrarás algo que te va encantar.
    </p>
    <div className="cart-page__empty__action">
      <Link to={baseUrl}>
        <Button secondary>Sigue Comprando</Button>
      </Link>
    </div>
  </div>
);

export default EmptyCart;
