import { useEffect, useState } from "react";

import { Selector } from "../selector/selector";

const propertiesTypesOptions = ['Alle', 'Wohnung', 'Einfamilienhaus', 'Mehrfamilienhaus'];
const radiusOptions = ['Alle', '50 kilometer', '100 kilometer', '200 kilometer', '500 kilometer']

export const PropertiesSearch = ({ searchValues, setSearchValues, properties, setSearchedProperties }) => {
    const [isDesktop, setIsDesktop] = useState(window.matchMedia('(min-width: 767px)').matches)
    const [cities, setCities] = useState(null);

    const getCities = () => {
        const cities = ['Alle'];

        properties.forEach(property => {
            const { city } = property;

            if (!cities.includes(city)) {
                cities.push(city);
            }

            setCities(cities);
        })
    }
    console.log(properties);
    const handleEvaluationClick = () => window.setIsVisibleQuiz(true)

    const handleResizeWindow = () => {
        setIsDesktop(window.matchMedia('(min-width: 767px)').matches);
    }

    const handleSearchClick = () => getSearchedProperties();

    const getSearchedProperties = () => {
        const searchedProperties = properties
            .filter(property => searchValues.city === '' || searchValues.city === 'Alle' || property.city === searchValues.city)
            .filter(property => searchValues.typeOfObjects === '' || searchValues.typeOfObjects === 'Alle' || property.building_type.value === searchValues.typeOfObjects)

        setSearchedProperties(searchedProperties);
    }

    window.addEventListener('resize', handleResizeWindow);

    useEffect(() => {
        getCities();
    }, [])

    return (
        <section className="properties-search">
            <div className="container">
                <div className="properties-search__image">
                    <picture>
                        <source srcSet="../images/properties-catalog/properties-search/image@2x.webp" type="image/webp" media="(min-resilution: 2dppx)" />
                        <source srcSet="../images/properties-catalog/properties-search/image.webp" type="image/webp" />
                        <source srcSet="../images/properties-catalog/properties-search/image@2x.png" media="(min-resilution: 2dppx)" />
                        <img src="../images/properties-catalog/properties-search/image.png" alt="Image" title="Image" />
                    </picture>
                </div>
                <div className="properties-search__body">
                    <h2 className="properties-search__title">Immobiliensuche</h2>
                    <form action="#" className="properties-search__form">
                        <Selector className='properties-search__selector' name="city" options={cities} placeholder='Stadt' value={searchValues.city} setValues={setSearchValues} />
                        <Selector className='properties-search__selector' name="typeOfObjects" options={propertiesTypesOptions} placeholder='Art des Objektes' value={searchValues.typeOfObjects} setValues={setSearchValues} />
                        <Selector className='properties-search__selector' name="radius" options={radiusOptions} placeholder='Radius' value={searchValues.radius} setValues={setSearchValues} />
                        <button type="button" onClick={handleSearchClick} className="properties-search__button button">
                            {isDesktop && (
                                <img src="../images/icons/search.svg" alt="Search" title="Search" />
                            )}
                            {!isDesktop && 'Search'}
                        </button>
                    </form>
                    <div className="properties-search__evaluation">
                        <p className="properties-search__evaluation-text">
                            Für verkäufer: kostenfreie bewertung ihrer immobilie
                        </p>
                        <button type="button" onClick={handleEvaluationClick} className="properties-search__evaluation-button button">
                            kostenfreie bewertung
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};