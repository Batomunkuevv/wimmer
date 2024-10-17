import classNames from 'classnames';

import { addZero } from '../../../utils/functions';

export const TypesOfHouse = ({ quizData, setQuizData, setStep }) => {
    const typesOfHouse = ['Freistehend', 'Doppelhaushälfte', 'Reihenendhaus', 'Reihenmittelhaus', 'Landhaus'];

    const handleTypeClick = (e) => {
        const { target } = e;
        const typeNode = target.classList.contains('quiz__variant') ? target : target.closest('.quiz__variant');
        const typeValue = typeNode.dataset.type;

        setQuizData({ ...quizData, typeOfHouse: typeValue });
        setStep(prev => prev + 1);
    }

    return (
        <>
            <div className="quiz__title">Welche Immobilie möchten Sie bewerten?</div>
            <ul className="quiz__variants">
                {typesOfHouse.map((type, i) => (
                    <li key={i} data-type={type} onClick={handleTypeClick} className={classNames('quiz__variant', {'is-active': quizData.typeOfHouse === type})}>
                        <div className="quiz__variant-icon">
                            <img width="56" height="56" src={`../images/quiz/types-of-house/${addZero(i + 1)}.svg`} alt="Icon" title="Icon" />
                        </div>
                        <div className="quiz__variant-name">{type}</div>
                    </li>
                ))}
            </ul>
        </>
    );
};