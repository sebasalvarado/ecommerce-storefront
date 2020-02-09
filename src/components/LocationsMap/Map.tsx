import GoogleMapReact from 'google-map-react';
import * as React from 'react';

import { googleMapsAPIKey } from '../../constants';
import { InfoWindowMarker } from './InfoWindow';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

type MapProps = {
    height: string;
    width: string;
    center: {
        lat: number;
        lng: number;
    },
    markers?: Array<{
        lat: number;
        lng: number;
        name: string;
        text: string;
        hoursOfOperations?: Array<{
            open: string;
            close: string;
        }>; 
    }>,
    zoom?: number;
}
const LocationsMap: React.FC<MapProps> = ({ center, zoom, height, width, markers }) => {
    return (
        // Important! Always set the container height explicitly
        <div style={{ height, width }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: googleMapsAPIKey }}
                defaultCenter={center}
                defaultZoom={zoom}
            >
                {markers && markers.map((marker) => (
                    <InfoWindowMarker
                        name={marker.name}
                        text={marker.text}
                        lat={marker.lat}
                        lng={marker.lng}
                    />
                ))}
            </GoogleMapReact>
        </div>
    );
}
export default LocationsMap;