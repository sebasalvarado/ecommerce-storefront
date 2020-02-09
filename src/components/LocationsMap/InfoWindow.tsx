import * as React from 'react';

type InfoWindowProps = {
    name: string;
    text: string;
    hoursOfOperations?: Array<{
        open: string;
        close: string;
    }>;
    lat: number;
    lng: number;
}


export const InfoWindowMarker: React.FC<InfoWindowProps> = ({ 
    name,
    text,
}) => {
    return (
        <React.Fragment>
            <div>
                <div>
                    {name}
                </div>
                <div>
                    {text}
                </div>
            </div>
        </React.Fragment>
    )
};