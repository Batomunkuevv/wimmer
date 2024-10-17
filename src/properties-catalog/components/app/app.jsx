import { useEffect, useState } from 'react';

import { PropertiesSearch } from "../properties-search/properties-search";
import { Catalog } from '../catalog/catalog';
import { Loader } from '../loader/loader';

const defaultSearchValues = {
    city: '',
    typeOfObjects: '',
    radius: ''
}

export const App = () => {
    const [searchValues, setSearchValues] = useState(defaultSearchValues);
    const [properties, setProperties] = useState(null);
    const [searchedProperties, setSearchedProperties] = useState(null);
    const [sort, setSort] = useState('Neueste zuerst');

    const API_KEY = 'lNWMD-k5YItpkyq07ShtusQv5FX1eppUuMpegu08';

    const getProperties = async () => {
        const properties = sessionStorage.getItem('properties') ? JSON.parse(sessionStorage.getItem('properties')) : null;

        if (properties) {
            setProperties(properties);
        } else {
            try {
                const response = await fetch(`https://api.propstack.de/v1/units?with_meta=1&per=500&expand=1&order=desc&sort_by=created_at&api_key=${API_KEY}`)
                const data = await response.json();

                setProperties(data.data);
                sessionStorage.setItem('properties', JSON.stringify(data.data));
            } catch (error) {
                console.log('Ошибка', error);
            }
        }

    }

    useEffect(() => {
        getProperties();
    }, [])

    return (
        <>
            {properties && (
                <>
                    <PropertiesSearch properties={properties} searchValues={searchValues} setSearchValues={setSearchValues} setSearchedProperties={setSearchedProperties} />
                    <Catalog properties={searchedProperties ? searchedProperties : properties} sort={sort} setSort={setSort} />
                </>
            )}
            {!properties && <Loader></Loader>}
        </>
    );
};