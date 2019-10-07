import "./styles/index.scss";

import { Icon } from '../../@next/components/atoms';
import React from 'react';

export const InfoTopBar: React.FC = () => {
    return (
        <div className="info">
            <div className="info__item">
                <div className="info__item__icon">
                    <Icon size={15} name="heart"/>
                </div>
                <p className="info__item__text"> 
                    Compra Seguro
                </p>
            </div>
            <div className="info__item">
                <div className="info__item__icon">
                    <Icon size={15} name="heart"/>
                </div>
                <p className="info__item__text">Devoluciones Gratis</p>
            </div>
            <div className="info__item">
                <div className="info__item__icon">
                    <Icon size={15} name="heart"/>
                </div>
                <p className="info__item__text">Recibe a Tiempo</p>
            </div>
        </div>
    )
}