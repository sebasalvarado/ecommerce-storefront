import * as React from 'react';
import Media from 'react-media';

import { smallScreen } from '../../globalStyles/scss/variables.scss';

interface TableProps {
    locations: Array<{
        name: string,
        phoneNumber: string;
        address: string;
        email: string;
        operatingHours?: string;
    }>;
}
const LocationsTable: React.FC<TableProps> = ({ 
    locations,
}) => (
    <Media query={{ minWidth: smallScreen}}>
        { mediumScreen => (
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        {mediumScreen && <th>Dirección</th>}
                        <th>Teléfono</th>
                        {mediumScreen && <th>Email</th>}
                    </tr>
                </thead>
                <tbody>
                    {
                        locations.map((location) => (
                            <tr>
                                <td>
                                    {location.name}
                                </td>
                                {mediumScreen &&
                                <td>
                                    {location.address}
                                </td>
                                }
                                <td>
                                    {location.phoneNumber}
                                </td>
                                {mediumScreen && 
                                    <td>
                                        {location.email}
                                    </td>
                                }
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        )}
    </Media>
);

export default LocationsTable;