"use strict";
const initLozad = () => {
    const lozadElements = document.querySelectorAll('[data-lozad]');

    if (!lozadElements) return;

    lozadElements.forEach(element => {
        const lozadObserver = lozad(element);

        lozadObserver.observe();
    })
}

const initSliders = () => {
    let sliders = document.querySelectorAll('[data-slider]');

    if (!sliders) return;

    let options, sliderSwiper;
    let defaultOptions = {
        speed: 1000,
        loop: true,
        grabCursor: true
    };

    sliders.forEach(slider => {
        const typeOfSlider = slider.dataset.slider;

        switch (typeOfSlider) {
            case 'reviews': {
                setReviewsOptions(slider);
                break;
            }
            case 'objects': {
                setObjectsOptions(slider);
                break;
            }
        }

        sliderSwiper = new Swiper(slider, options);
    })

    function setObjectsOptions(slider) {
        const objectsPrev = slider.closest('.objects-slider').querySelector('.objects-slider__arrow--prev');
        const objectsNext = slider.closest('.objects-slider').querySelector('.objects-slider__arrow--next');
        options = {
            ...defaultOptions,
            slidesPerView: 1,
            spaceBetween: 24,
            autoplay: {
                delay: 5000
            },
            navigation: {
                prevEl: objectsPrev,
                nextEl: objectsNext,
            },
            breakpoints: {
                767: {
                    slidesPerView: 2
                },
                992: {
                    slidesPerView: 3
                }
            }
        }
    }

    function setReviewsOptions(slider) {
        const reviewsPrev = slider.closest('.reviews').querySelector('.reviews__arrow--prev');
        const reviewsNext = slider.closest('.reviews').querySelector('.reviews__arrow--next');
        options = {
            ...defaultOptions,
            slidesPerView: 2.35,
            centeredSlides: true,
            effect: "coverflow",
            coverflowEffect: {
                rotate: 0,
                stretch: -173,
                depth: 700,
                modifier: 1,
                slideShadows: false,
            },
            navigation: {
                prevEl: reviewsPrev,
                nextEl: reviewsNext,
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    effect: 'slide',
                    centeredSlides: false,
                    spaceBetween: 8
                },
                576: {
                    slidesPerView: 1.5,
                    effect: 'slide',
                    centeredSlides: false,
                    spaceBetween: 24
                },
                767: {
                    slidesPerView: 2,
                    effect: 'slide',
                    centeredSlides: false,
                    spaceBetween: 24
                },
                1232: {}
            }
        }
    }
}

const initPropertyImagesSliders = () => {
    const proeprtiesImagesSliders = document.querySelectorAll('.object-card__images.swiper');

    if (!proeprtiesImagesSliders) return;

    proeprtiesImagesSliders.forEach(slider => {
        const options = {
            speed: 1000,
            loop: true,
            grabCursor: true,
            navigation: {
                prevEl: '.object-card__images-arrow--prev',
                nextEl: '.object-card__images-arrow--next',
            }
        }

        const sliderSwiper = new Swiper(slider, options);
    })
}

const initStartQuiz = () => {
    const startQuizButtons = document.querySelectorAll('[data-start-quiz]');

    if (!startQuizButtons) return;

    startQuizButtons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonTypeOfBuilding = button.dataset.startQuiz;

            if (buttonTypeOfBuilding) {
                window.typeOfBuilding = buttonTypeOfBuilding;
            }

            window.setIsVisibleQuiz(true);
        })
    })
}

const initHeader = () => {
    const header = document.querySelector('.site-header');

    if (!header) return;

    let lastScrollTop;

    window.addEventListener('scroll', toggleScrollingClass);
    window.addEventListener('scroll', animateHeader);

    function animateHeader() {
        const scrollTop = document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 48) {
            header.classList.add('is-scrolling-down');
        } else {
            header.classList.remove('is-scrolling-down');
        }

        lastScrollTop = scrollTop;
    }

    function toggleScrollingClass() {
        const scrollTop = document.documentElement.scrollTop;

        if (scrollTop > 0) {
            header.classList.add('is-scrolling');
        } else {
            header.classList.remove('is-scrolling');
        }
    }
}

const initBurgerMenu = () => {
    const menu = document.querySelector(".site-header__panel");
    const burger = document.querySelector(".burger");

    if (!menu || !burger) return;

    const menuOverlay = document.querySelector(".site-header__overlay");
    const menuClose = menu.querySelector(".site-header__panel-close");;

    if (menuClose) menuClose.addEventListener("click", closeBurgerMenu);
    if (menuOverlay) menuOverlay.addEventListener("click", closeBurgerMenu);

    burger.addEventListener("click", openBurgerMenu);

    function closeBurgerMenu() {
        menu.classList.remove("is-open");
        menuOverlay.classList.remove('is-visible');
        document.body.classList.remove('is-lock');
    }

    function openBurgerMenu() {
        menu.classList.add("is-open");
        menuOverlay.classList.add('is-visible');
        document.body.classList.add('is-lock');
    }
};

const initCheckboxes = () => {
    const checkboxes = document.querySelectorAll('.checkbox');

    if (!checkboxes) return;

    checkboxes.forEach(checkbox => {
        const checkboxInput = checkbox.querySelector('input');

        checkboxInput.addEventListener('input', handleCheckbox);

        function handleCheckbox() {
            if (checkboxInput.checked) {
                checkbox.classList.add('is-checked');
            } else {
                checkbox.classList.remove('is-checked');
            }
        }
    })
}

const initAnchors = () => {
    const anchors = document.querySelectorAll('[data-anchor]');

    if (!anchors) return;

    anchors.forEach(link => {

        link.addEventListener('click', function (e) {
            e.preventDefault();

            const href = this.getAttribute('href');
            const scrollTarget = document.querySelector(href);
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition;

            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

}

const initFoldedElements = () => {
    const foldedElements = document.querySelectorAll('[data-fold]');

    if (!foldedElements) return;

    foldedElements.forEach(foldedElement => {
        let foldedElementContent;
        const foldedElementBtn = foldedElement.querySelector('[data-fold-btn]');
        foldedElementContent = foldedElement.querySelectorAll('[data-fold-content]')

        if (foldedElement.classList.contains('is-dropdown')) {
            foldedElementContent = foldedElement.querySelector('[data-fold-content]')
        }

        heightToggleElement(foldedElementBtn, foldedElementContent);
    })
}

const initAccordions = () => {
    const accordions = document.querySelectorAll('[data-accordion]');

    if (!accordions) return;

    accordions.forEach(accordion => {
        const accordionFoldedElements = accordion.querySelectorAll('[data-fold]');

        accordionFoldedElements.forEach((foldedElement, i) => {
            const foldedElementBtn = foldedElement.querySelector('[data-fold-btn]');
            const foldedElementsWithoutCurrent = Array.from(accordionFoldedElements).filter((element, j) => i !== j);

            foldedElementBtn.addEventListener('click', () => closeOtherFoldedElements(foldedElementsWithoutCurrent));
        })

    })

    function closeOtherFoldedElements(foldedElements) {
        foldedElements.forEach(element => {
            const foldedElementBtn = element.querySelector('[data-fold-btn]');
            const foldedElementContent = element.querySelector('[data-fold-content]');

            foldedElementContent.style.height = `${foldedElementContent.scrollHeight}px`;
            window.getComputedStyle(foldedElementContent, null).getPropertyValue("height");
            foldedElementContent.style.height = "0";
            foldedElementBtn.classList.remove("is-active");
            foldedElementContent.classList.remove("is-expanded");

            foldedElementContent.addEventListener("transitionend", () => {
                if (foldedElementContent.style.height !== "0px") {
                    foldedElementContent.style.height = "auto";
                }
            });
        })
    }
}

const initSteps = () => {
    const stepsBlock = document.querySelector('.steps');

    if (!stepsBlock) return;

    let currentTab = 0;
    const stepsTabs = stepsBlock.querySelectorAll('.steps__tab-button');
    const stepsItems = stepsBlock.querySelectorAll('.steps__item');
    const stepsCurrentItem = stepsBlock.querySelector('.steps__current-item');
    const stepsPrev = stepsBlock.querySelector('.steps__arrow--prev');
    const stepsNext = stepsBlock.querySelector('.steps__arrow--next');

    stepsPrev.addEventListener('click', handlePrevClick);
    stepsNext.addEventListener('click', handleNextClick);

    stepsTabs.forEach((tab, i) => {
        tab.addEventListener('click', () => {
            currentTab = i;
            updateTabs(i);
        })
    })

    function handlePrevClick() {
        --currentTab;
        updateTabs(currentTab);
    }

    function handleNextClick() {
        ++currentTab;
        updateTabs(currentTab);
    }

    function updateTabs(i) {
        const activeItem = [...stepsItems].find(item => item.classList.contains('is-active'));
        const activeTab = [...stepsTabs].find(tab => tab.classList.contains('is-active'));

        activeItem.classList.remove('is-active');
        activeTab.classList.remove('is-active');
        stepsItems[i].classList.add('is-active');
        stepsTabs[i].classList.add('is-active');
        stepsCurrentItem.textContent = currentTab + 1;
        stepsPrev.disabled = currentTab === 0;
        stepsNext.disabled = currentTab + 1 === stepsItems.length;
    }
}

const initPopups = () => {
    const overlay = document.querySelector(".overlay");

    if (!overlay) return;

    initCloseModalsOnClickOverlay();

    const popups = document.querySelectorAll("[data-popup]");
    const popupBtns = document.querySelectorAll("[data-popup-btn]");

    if (!popupBtns && !popups) return;

    popupBtns.forEach((btn) => {
        const popup = overlay.querySelector(`[data-popup=${btn.dataset.popupBtn}]`);

        if (popup) {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                openPopup(popup);
            });
        }
    });

    popups.forEach((popup) => {
        const popupCloses = popup.querySelectorAll("[data-popup-close]");

        if (popupCloses) {
            popupCloses.forEach((close) => {
                close.addEventListener("click", (e) => {
                    closePopup(popup);
                });
            });
        }
    });

    function openPopup(popup) {
        overlay.classList.add("is-visible");
        popup.classList.add("is-visible");
        document.body.classList.add('is-lock');
    }

    function closePopup(popup) {
        overlay.classList.remove("is-visible");
        popup.classList.remove("is-visible");
        document.body.classList.remove('is-lock');
    }

    function initCloseModalsOnClickOverlay() {
        overlay.addEventListener("click", (e) => {
            const { target } = e;

            if (target.classList.contains('overlay')) {
                if (popups) {
                    popups.forEach((popup) => {
                        popup.classList.remove("is-visible");
                    });
                }

                document.body.classList.remove("is-lock");
                overlay.classList.remove("is-visible");
            }
        });
    }
}

function heightToggleElement(toggler, blocks) {
    toggler.addEventListener("click", (e) => {
        e.preventDefault();

        if (blocks instanceof NodeList) {
            blocks.forEach(function (block) {
                addFunctionality(toggler, block);
            });
        } else {
            addFunctionality(toggler, blocks);
        }
    });

    function addFunctionality(toggler, block) {
        if (block.style.height === "0px" || !block.style.height && !block.classList.contains('is-expanded')) {
            block.style.height = `${block.scrollHeight}px`;
            toggler.classList.add("is-active");
            block.classList.add("is-expanded");
        } else {
            block.style.height = `${block.scrollHeight}px`;
            window.getComputedStyle(block, null).getPropertyValue("height");
            block.style.height = "0";
            toggler.classList.remove("is-active");
            block.classList.remove("is-expanded");
        }

        block.addEventListener("transitionend", () => {
            if (block.style.height !== "0px") {
                block.style.height = "auto";
            }
        });
    }
}

window.addEventListener("DOMContentLoaded", (e) => {
    initLozad();
    initCheckboxes();
    initAnchors();
    initHeader();
    initBurgerMenu();
    initFoldedElements();
    initAccordions();
    initSliders();
    initPropertyImagesSliders();
    initSteps();
    initStartQuiz();
    initPopups();
});
