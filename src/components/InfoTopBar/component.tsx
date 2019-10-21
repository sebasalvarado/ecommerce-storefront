import './styles/index.scss';

import React from 'react';
import ReactSVG from 'react-svg';

import creditCard from '../../images/ponti-logos/005-credit-card.svg';
import deliveryTruck from '../../images/ponti-logos/040-delivery-truck.svg';
import stopWatch from '../../images/ponti-logos/044-stopwatch.svg';

export const InfoTopBar: React.FC = () => {
    return (
        <div className="info">
            <div className="info__item">
                <div className="info__item__icon">
                    <ReactSVG path={creditCard}/>                    
                </div>
                <p className="info__item__text"> 
                    Compra Seguro
                </p>
            </div>
            <div className="info__item">
                <div className="info__item__icon">
                    <ReactSVG path={deliveryTruck}/>
                </div>
                <p className="info__item__text">Devoluciones Gratis</p>
            </div>
            <div className="info__item">
                <div className="info__item__icon">
                    <ReactSVG path={stopWatch}/>
                </div>
                <p className="info__item__text">Recibe a Tiempo</p>
            </div>
        </div>
    )
}