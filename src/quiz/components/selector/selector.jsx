import { useState, useRef } from "react";
import classNames from "classnames";

export const Selector = ({ options, placeholder, className, value, name, setValues }) => {
    const selectorRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const classes = classNames([className, 'selector', { 'is-open': isOpen }]);

    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    }

    const handleOptionClick = (e) => {
        const { target: option } = e;
        const optionValue = option.dataset.value;

        setValues(prev => ({ ...prev, [name]: optionValue }));
        setIsOpen(false);
    }

    const handleClickOutside = (e) => {
        const { target } = e;
        const isInsideSelector = selectorRef.current?.contains(target);

        if (!isInsideSelector) setIsOpen(false);
    }

    window.addEventListener('click', handleClickOutside);

    return (
        <div ref={selectorRef} className={classes}>
            <button type="button" onClick={handleButtonClick} className="selector__button">
                <span className="selector__button-text">
                    {value ? value : placeholder}
                </span>
                <span className="selector__button-icon">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.5837 6.66665L16.8753 5.95831L10.0003 12.8333L3.12533 5.95831L2.41699 6.66665L10.0003 14.25L17.5837 6.66665Z" fill="currentColor" />
                    </svg>
                </span>
            </button>
            {options && (
                <ul className='selector__dropdown'>
                    {options.map((option, i) => (
                        <li
                            key={i}
                            className={classNames('selector__option', { 'is-active': value === option })}
                            data-value={option}
                            onClick={handleOptionClick}
                        >
                            {option}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};