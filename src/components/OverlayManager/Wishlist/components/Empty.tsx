import * as React from 'react';

import { Button } from '../../..';

const Empty: React.FC<{ overlayHide(): void }> = ({ overlayHide }) => (
  <div className="wishlist__empty">
    <h4>Tu Wishlist está vacía</h4>
    <p>

      No has agregado nada a tu Wishlist todavía. Para agregar productos a esta lista, haz click en
      el ícono de corazón a un lado de cada producto.

      Sabemos que encontrarás cosas que te encantarán en nuestra tienda.
    </p>
    <div className="wishlist__empty__action">
      <Button secondary onClick={overlayHide}>
        Continúa Comprando
      </Button>
    </div>
  </div>
);

export default Empty;
