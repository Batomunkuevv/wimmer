import classNames from "classnames";
import { Fragment, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

export const Pagination = ({ page, pages, setPage, catalogRef }) => {
    const [paginationItems, setPaginationItems] = useState([]);

    const [cookies, setCookie] = useCookies(['page']);
    const incrementedPage = page + 1;

    const getPaginationItems = () => {
        let paginationItems = [];

        if (pages > 10) {
            paginationItems = [1];

            switch (true) {
                case incrementedPage < 4: {
                    paginationItems = [1, 2, 3, 4, '...'];
                    break;
                }
                case incrementedPage > pages - 3: {
                    paginationItems = [1, '...', pages - 3, pages - 2, pages - 1];
                    break;
                }
                default: {
                    paginationItems = [1, '...', incrementedPage - 1, incrementedPage, incrementedPage + 1, '...'];
                }
            }

            paginationItems.push(pages);
        } else {
            for (let i = 1; i <= pages; i++) {
                paginationItems.push(i);
            }
        }

        setPaginationItems(paginationItems);
    }

    const handlePaginationClick = (e) => {
        const { target } = e;
        const targetPage = Number(target.textContent) - 1;

        catalogRef.current?.scrollIntoView({ behavior: 'smooth' })

        setTimeout(() => {
            setPage(targetPage);
            setCookie('page', targetPage)
        }, 1000);
    }

    const handlePrevClick = () => {
        catalogRef.current?.scrollIntoView({ behavior: 'smooth' })
        setTimeout(() => {
            setPage(prev => {
                setCookie('page', prev - 1);

                return prev - 1
            });
        }, 1000);
    }

    const handleNextClick = () => {
        catalogRef.current?.scrollIntoView({ behavior: 'smooth' })
        setTimeout(() => {
            setCookie('page', incrementedPage);
            setPage(incrementedPage);
        }, 1000);
    }

    useEffect(() => {
        getPaginationItems();
    }, [page, pages])

    return (
        <div className="catalog__navigation">
            <button type="button" disabled={incrementedPage === 1} onClick={handlePrevClick} className="catalog__arrow catalog__arrow--prev">
                <svg width="21" height="38" viewBox="0 0 21 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1.9998 37.1998L0.299805 35.4998L16.7998 18.9998L0.299805 2.4998L1.9998 0.799805L20.1998 18.9998L1.9998 37.1998Z"
                        fill="currentColor"
                    />
                </svg>
            </button>
            <ul className="catalog__pagination pagination">
                {paginationItems?.map((item, i) => {
                    const isDotts = item === '...';
                    const isCurrent = item === incrementedPage;

                    return (
                        <Fragment key={i}>
                            {isDotts && (
                                <li className="pagination__item">
                                    <span className="pagination__dotts">{item}</span>
                                </li>
                            )}
                            {!isDotts && (
                                <li className="pagination__item">
                                    <button
                                        type="button"
                                        className={classNames('pagination__button', { 'is-current': isCurrent })}
                                        onClick={handlePaginationClick}
                                    >{item}</button>
                                </li>
                            )}
                        </Fragment>
                    )
                }
                )}
            </ul>
            <button type="button" disabled={incrementedPage === pages} onClick={handleNextClick} className="catalog__arrow">
                <svg width="21" height="38" viewBox="0 0 21 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M1.9998 37.1998L0.299805 35.4998L16.7998 18.9998L0.299805 2.4998L1.9998 0.799805L20.1998 18.9998L1.9998 37.1998Z"
                        fill="currentColor"
                    />
                </svg>
            </button>
        </div>
    );
};