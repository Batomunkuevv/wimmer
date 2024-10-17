import { Selector } from '../../selector/selector';


export const PropertyState = ({ quizData, setQuizData }) => {
    const propertyStates = ['Gut erhalten', 'Schlecht erhalten'];
    const equipment = ['Standard', 'Starkes'];

    return (
        <>
            <div className="quiz__title">Nur noch 2 wichtige Fakten:</div>
            <div className="quiz__items">
                <div className="quiz__item">
                    <label className="quiz__label">Zustand der Immobilie</label>
                    <Selector options={propertyStates} name='state' value={quizData.state} setValues={setQuizData} placeholder='Gut erhalten' />
                </div>
                <div className="quiz__item">
                    <label className="quiz__label">Qualität der Ausstattung (z.B. Küche, Fenster, Böden, etc.)</label>
                    <Selector options={equipment} name='equipment' value={quizData.equipment} setValues={setQuizData} placeholder='Standard' />
                </div>
            </div>
        </>
    );
};