import { useRef, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { numberWithDots } from '../../utils/functions';

export const PropertyCard = ({ name, city, street, price, images, created_at }) => {
    const imagesSliderRef = useRef(null);

    images = images ? images.slice(0, 6) : null;
    const handleSliderPrev = useCallback(() => {
        if (!imagesSliderRef.current) return;

        imagesSliderRef.current.swiper.slidePrev();
    }, []);

    const handleSliderNext = useCallback(() => {
        if (!imagesSliderRef.current) return;

        imagesSliderRef.current.swiper.slideNext();
    }, []);

    return (
        <li className="catalog__item">
            <article className="object-card">
                {images && images.length > 1 ? (
                    <Swiper
                        ref={imagesSliderRef}
                        speed={1000}
                        loop={true}
                        grabCursor={true}
                        className='object-card__images'
                    >
                        {
                            images.map((image, i) => (
                                <SwiperSlide key={i} className='object-card__images-item'>
                                    <picture>
                                        <source srcSet={image.big_url} media='(min-resolution: 2dppx)' />
                                        <img src={image.medium_url} alt={name} title={name} />
                                    </picture>
                                </SwiperSlide>
                            ))
                        }
                        <button type="button" onClick={handleSliderPrev} className="object-card__images-arrow object-card__images-arrow--prev">
                            <svg width="21" height="38" viewBox="0 0 21 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.9998 37.1998L0.299805 35.4998L16.7998 18.9998L0.299805 2.4998L1.9998 0.799805L20.1998 18.9998L1.9998 37.1998Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                        <button type="button" onClick={handleSliderNext} className="object-card__images-arrow object-card__images-arrow--next">
                            <svg width="21" height="38" viewBox="0 0 21 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M1.9998 37.1998L0.299805 35.4998L16.7998 18.9998L0.299805 2.4998L1.9998 0.799805L20.1998 18.9998L1.9998 37.1998Z"
                                    fill="currentColor"
                                />
                            </svg>
                        </button>
                    </Swiper>
                ) : images ? (
                    <div className="object-card__images">
                        <img src="../images/no-image.png" alt="No image" title='No image' />
                    </div>
                ) : (
                    <div className="object-card__images">
                        <img src="../images/no-image.png" alt="No image" title='No image' />
                    </div>
                )
                }
                <div className="object-card__body">
                    <div className="object-card__place">
                        {city} / {street}
                    </div>
                    <h3 className="object-card__text">
                        <a href="#">{name}</a>
                    </h3>
                    {price.value && (
                        <div className="object-card__price">€ {numberWithDots(price.value)}</div>
                    )}
                    <ul className="object-card__characteristics">
                        <li className="object-card__characteristic">
                            <span className="object-card__characteristic-icon">
                                <img width="24" height="24" src="./images/icons/characteristic.svg" alt="Icon" title="Icon" />
                            </span>
                            <span className="object-card__characteristic-text">185 m²</span>
                        </li>
                        <li className="object-card__characteristic">
                            <span className="object-card__characteristic-icon">
                                <img width="24" height="24" src="../images/icons/characteristic.svg" alt="Icon" title="Icon" />
                            </span>
                            <span className="object-card__characteristic-text">1.017 m²</span>
                        </li>
                        <li className="object-card__characteristic">
                            <span className="object-card__characteristic-icon">
                                <img width="24" height="24" src="../images/icons/characteristic.svg" alt="Icon" title="Icon" />
                            </span>
                            <span className="object-card__characteristic-text">5</span>
                        </li>
                    </ul>
                    <a href="#" className="object-card__button button">Mehr lesen</a>
                </div>
            </article >
        </li >
    );
};