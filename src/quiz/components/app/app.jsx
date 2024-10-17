import { useEffect, useState } from "react";
import classNames from "classnames";

import { TypesOfBuilding } from '../steps/types-of-building/types-of-building';
import { TypesOfHouse } from '../steps/types-of-house/types-of-house';
import { TypesOfFlat } from '../steps/types-of-flat/types-of-flat';
import { AddressStep } from '../steps/address-step/address-step';
import { PropertyParameters } from '../steps/property-parameters/property-parameters';
import { PropertyState } from '../steps/property-state/property-state';
import { LastStep } from '../steps/last-step/last-step';

const defaultQuizData = {
    typeOfBuilding: '',
    typeOfHouse: '',
    typeOfFlat: '',
    address: {
        street: '',
        houseNumber: '',
        postalCode: '',
        place: '',
    },
    state: 'Gut erhalten',
    equipment: 'Standard',
    propertyParameters: {
        yearConstruction: '',
        numberOfRooms: 6,
        livingSpace: 180,
        landArea: 500
    },
    email: ''
}

export const App = () => {
    const [quizData, setQuizData] = useState(defaultQuizData);
    const [step, setStep] = useState(1);
    const [progress, setProgress] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    const handleNextClick = () => {
        setStep(prev => prev + 1);
    }

    const handlePrevClick = () => {
        if (step === 1) {
            setQuizData(defaultQuizData)

            return;
        }

        if ((step === 2 && quizData.typeOfBuilding === 'Mehrfamilienhaus')) {
            setQuizData({ ...quizData, typeOfBuilding: '' })
        }

        setStep(prev => prev - 1);
    }

    const getNextDisabled = () => {
        switch (step) {
            case 1: {
                if (quizData.typeOfBuilding !== 'Mehrfamilienhaus' && (!quizData.typeOfFlat && !quizData.typeOfHouse)) return true;
                break;
            }
            case 2: {
                if (!quizData.address.street || !quizData.address.houseNumber || !quizData.address.postalCode || !quizData.address.place) return true;
                break;
            }
            case 3: {
                if (!quizData.propertyParameters.yearConstruction) return true;
                break;
            }
        }

        return false;
    }

    const checkStart = () => {
        if (window.typeOfBuilding) {
            setQuizData({ ...quizData, typeOfBuilding: window.typeOfBuilding })

            if (window.typeOfBuilding === 'Mehrfamilienhaus') setStep(2);

            window.typeOfBuilding = '';
        }
    }

    const handleClickOverlay = (e) => {
        const { target } = e;
        const isOverlay = target.classList.contains('overlay');

        if (isOverlay) {
            setIsVisible(false);
            setQuizData(defaultQuizData);
            setStep(1);
        }
    }

    useEffect(() => {
        window.setIsVisibleQuiz = setIsVisible;
    }, [])

    useEffect(() => {
        checkStart();
    }, [isVisible])

    useEffect(() => {
        setProgress(100 / 5 * step);
    }, [step])

    return (
        <div onClick={handleClickOverlay} className={classNames('overlay', { 'is-visible': isVisible })}>
            <div className=" quiz">
                <div className="quiz__progressbar">
                    <div className="quiz__progressbar-progress" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="quiz__body">
                    {step === 1 && !quizData.typeOfBuilding && <TypesOfBuilding quizData={quizData} setQuizData={setQuizData} setStep={setStep} />}
                    {step === 1 && quizData.typeOfBuilding === 'Einfamilienhaus' && (
                        <TypesOfHouse fieldName='typeOfBuilding' quizData={quizData} setQuizData={setQuizData} setStep={setStep} />
                    )}
                    {step === 1 && quizData.typeOfBuilding === 'Wohnung' && (
                        <TypesOfFlat fieldName='typeOfBuilding' quizData={quizData} setQuizData={setQuizData} setStep={setStep} />
                    )}
                    {step === 2 && <AddressStep quizData={quizData} setQuizData={setQuizData} />}
                    {step === 3 && <PropertyParameters quizData={quizData} setQuizData={setQuizData} />}
                    {step === 4 && <PropertyState quizData={quizData} setQuizData={setQuizData} />}
                    {step === 5 && <LastStep quizData={quizData} setQuizData={setQuizData} />}
                    {step !== 5 && (step !== 1 || quizData.typeOfBuilding) && (
                        <div className="quiz__buttons">
                            <button type="button" className="quiz__button button button--black" onClick={handlePrevClick}>Zurück</button>
                            <button type="button" disabled={getNextDisabled()} className="quiz__button button" onClick={handleNextClick}>Weiter</button>
                        </div>
                    )}
                </div>
                <ul className="quiz__advantages">
                    <li className="quiz__advantages-item">Immobilienwertrechner</li>
                    <li className="quiz__advantages-item">Sofortige Ergebnisanzeige</li>
                    <li className="quiz__advantages-item">Digitale Verkaufssimulation</li>
                </ul>
            </div>
        </div>
    );
};