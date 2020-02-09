import './scss/index.scss';

import * as React from 'react';
import Media from 'react-media';

import { smallScreen } from '../../globalStyles/scss/variables.scss';
import CostRow from './CostRow';
import ProductRow, { EditableProductRowProps, LineI } from './ProductRow';

interface TableProps extends EditableProductRowProps {
  lines: LineI[];
  subtotal: React.ReactNode;
  deliveryCost?: React.ReactNode;
  totalCost?: React.ReactNode;
  discount?: React.ReactNode;
  discountName?: string;
}

const Table: React.FC<TableProps> = ({
  subtotal,
  deliveryCost,
  totalCost,
  discount,
  discountName,
  lines,
  ...rowProps
}) => (
  <Media query={{ minWidth: smallScreen }}>
    {mediumScreen => (
      <table className="cart-table">
        <thead>
          <tr>
            <th>Productos</th>
            {mediumScreen && <th>Precio</th>}
            <th>Talla</th>
            <th className="cart-table__quantity-header">Cantidad</th>
            <th colSpan={2}>{mediumScreen ? "Precio Total" : "Precio"}</th>
          </tr>
        </thead>
        <tbody>
          {lines.map(line => (
            <ProductRow
              key={line.id}
              line={line}
              mediumScreen={mediumScreen}
              {...rowProps}
            />
          ))}
        </tbody>
        <tfoot>
          <CostRow
            mediumScreen={mediumScreen}
            heading="Subtotal"
            cost={subtotal}
          />
          {discount && (
            <CostRow
              mediumScreen={mediumScreen}
              heading={`Discount: ${discountName}`}
              cost={discount}
            />
          )}
          {deliveryCost && (
            <CostRow
              mediumScreen={mediumScreen}
              heading="Delivery Cost"
              cost={deliveryCost}
            />
          )}
          {totalCost && (
            <CostRow
              mediumScreen={mediumScreen}
              heading="Total Cost"
              cost={totalCost}
            />
          )}
        </tfoot>
      </table>
    )}
  </Media>
);

export default Table;
