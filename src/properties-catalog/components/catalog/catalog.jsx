import { useEffect, useRef, useState } from 'react';
import { useCookies } from 'react-cookie';

import { PropertyCard } from "../property-card/property-card";
import { Pagination } from '../pagination/pagination';
import { SortButton } from '../sort-button/sort-button';

export const Catalog = ({ properties, sort, setSort }) => {
    const [page, setPage] = useState(0);
    const [pages, setPages] = useState(Math.ceil(properties.length / 9));
    const [propertiesOnPage, setPropertiesOnPage] = useState(null);

    const catalogRef = useRef(null);
    const [cookies] = useCookies(['page']);

    const getPropertiesOnPage = () => {
        let propertiesOnPage = properties.slice(page * 9, page * 9 + 9);

        switch (sort) {
            case 'Zuerst die ältesten': {
                propertiesOnPage = propertiesOnPage.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
                break;
            }
            default: {
                propertiesOnPage = propertiesOnPage.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
            }
        }

        setPropertiesOnPage(propertiesOnPage);
    }

    useEffect(() => {
        if (cookies.page) setPage(cookies.page);
    }, [])

    useEffect(() => {
        setPages(Math.ceil(properties.length / 9));
        setPage(0);
    }, [properties])

    useEffect(() => {
        getPropertiesOnPage();
    }, [sort, page, properties])

    return (
        <section ref={catalogRef} className="catalog">
            <div className="container">
                <h2 className="catalog__title">Immobilien in Deutschland kaufen</h2>
                <div className="catalog__top">
                    <p className="catalog__all">{properties.length} Immobilien gefunden</p>
                    <SortButton sort={sort} setSort={setSort} />
                </div>
                {propertiesOnPage && (
                    <ul className="catalog__list">
                        {propertiesOnPage.map(property => (
                            <PropertyCard key={property.unit_id} {...property} />
                        ))}
                    </ul>
                )}
                {pages > 1 && <Pagination page={page} setPage={setPage} pages={pages} catalogRef={catalogRef} />}
            </div>
        </section>
    );
};