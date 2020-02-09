import * as React from 'react';

import { Button } from '../..';

const Empty: React.FC<{ overlayHide(): void }> = ({ overlayHide }) => (
  <div className="cart__empty">
    <h4>No hay productos seleccionados</h4>
    <p>
      No has añadido productos a tus compras todavia. Estamos seguros que encontrarás algo que te va encantar.
    </p>
    <div className="cart__empty__action">
      <Button secondary onClick={overlayHide}>
        Seguir Comprando
      </Button>
    </div>
  </div>
);

export default Empty;
