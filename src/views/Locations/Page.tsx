import './scss/index.scss';

import * as React from 'react';
import Media from 'react-media';

import { DropdownSelect } from '../../@next/components/atoms';
import { LocationsMap, LocationsTable, Offline, Online } from '../../components';
import { mediumScreen } from '../../globalStyles/scss/variables.scss';

const CIUDADES_OPTIONS = [
    {
       label: "Quito",
       value: "UIO" ,
       lat: -0.1077392,
       lng: 78.460358,
    }
]
const LOCALES_DATA = [
    {
        name: 'Portal Shopping',
        address: 'Av Simon Bolivar y Panamericana Norte, CC Portal Shopping',
        phoneNumber: '-',
        email: 'portalshopping@ponti.com.ec',
        lat: -0.1077392,
        lng: 78.460358,
    },
];

const Locations: React.FC<{}> = () => {
    const [city, setCity] = React.useState({
        label: 'Quito',
        value: 'UIO',
    });
    return(
        <Media query={{ minWidth: mediumScreen }}>
            { screen => (
                <>
                <Online>
                    <div className="locations">
                        <div className="overlay__header">
                            <div className="overlay__header-text">
                                Nuestros Locales
                            </div>
                        </div>
                        <div className="overlay__header-dropdown">
                            <DropdownSelect
                                onChange={setCity}
                                options={CIUDADES_OPTIONS}
                                value={city}
                                label={"Ciudad"}
                            />
                        </div>
                            <LocationsTable
                                locations={LOCALES_DATA}
                            />
                    </div>
                    <LocationsMap 
                        height={screen ? "400px" : "300px"}
                        width={screen ? "40%" : "100%"}
                        center={{
                            lat: -0.1077392,
                            lng: -78.460358,
                        }}
                        zoom={15}
                    />
                </Online>
                <Offline>
                    <div className="locations">
                        No estamos disponibles.
                    </div>
                </Offline>
                </>
            )
            }
        </Media>
    )
}

export default Locations;