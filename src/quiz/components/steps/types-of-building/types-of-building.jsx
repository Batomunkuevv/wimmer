
export const TypesOfBuilding = ({ fieldName, quizData, setQuizData, setStep }) => {
    const handleTypeClick = (e) => {
        const { target } = e;
        const typeNode = target.classList.contains('quiz__variant') ? target : target.closest('.quiz__variant');
        const typeValue = typeNode.dataset.type;

        setQuizData({ ...quizData, typeOfBuilding: typeValue });

        if (typeValue === 'Mehrfamilienhaus') {
            setStep(prev => prev + 1);
        }
    }

    return (
        <>
            <div className="quiz__title">Welche Immobilie möchten Sie bewerten?</div>
            <ul className="quiz__variants quiz__variants--types-of-building"> 
                <li data-type="Wohnung" onClick={handleTypeClick} className="quiz__variant quiz__variant--type-of-building">
                    <div className="quiz__variant-icon quiz__variant-icon--type-of-building">
                        <img width="56" height="56" src="../images/quiz/types-of-building/01.svg" alt="Icon" title="Icon" />
                    </div>
                    <div className="quiz__variant-name">Wohnung</div>
                </li>
                <li data-type="Einfamilienhaus" onClick={handleTypeClick} className="quiz__variant quiz__variant--type-of-building">
                    <div className="quiz__variant-icon quiz__variant-icon--type-of-building">
                        <img width="56" height="56" src="../images/quiz/types-of-building/02.svg" alt="Icon" title="Icon" />
                    </div>
                    <div className="quiz__variant-name">Einfamilienhaus</div>
                </li>
                <li data-type="Mehrfamilienhaus" onClick={handleTypeClick} className="quiz__variant quiz__variant--type-of-building">
                    <div className="quiz__variant-icon quiz__variant-icon--type-of-building">
                        <img width="56" height="56" src="../images/quiz/types-of-building/03.svg" alt="Icon" title="Icon" />
                    </div>
                    <div className="quiz__variant-name">Mehrfamilienhaus</div>
                </li>
            </ul>
        </>
    );
};