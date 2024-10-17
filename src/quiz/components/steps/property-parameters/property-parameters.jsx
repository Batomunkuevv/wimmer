import { RangeInput } from "../../range-input/range-input";

export const PropertyParameters = ({ quizData, setQuizData }) => {
    const handleInputChange = (e) => {
        const { target } = e;
        const inputName = target.name;
        const inputValue = target.value;

        setQuizData(
            {
                ...quizData,
                propertyParameters: {
                    ...quizData.propertyParameters,
                    [inputName]: inputValue
                }
            })
    }

    const decrementConstruction = () => {
        const prevConstruction = Number(quizData.propertyParameters.yearConstruction);

        setQuizData({
            ...quizData,
            propertyParameters: {
                ...quizData.propertyParameters,
                yearConstruction: prevConstruction !== 0 ? prevConstruction - 1 : prevConstruction
            }
        })
    }

    const incrementConstruction = () => {
        const prevConstruction = Number(quizData.propertyParameters.yearConstruction);

        setQuizData({
            ...quizData,
            propertyParameters: {
                ...quizData.propertyParameters,
                yearConstruction: prevConstruction + 1
            }
        })
    }

    const decrementNumberOfRooms = () => {
        const prevNumberOfRooms = Number(quizData.propertyParameters.numberOfRooms);

        setQuizData({
            ...quizData,
            propertyParameters: {
                ...quizData.propertyParameters,
                numberOfRooms: prevNumberOfRooms !== 0 ? prevNumberOfRooms - 0.5 : prevNumberOfRooms
            }
        })
    }

    const incrementNumberOfRooms = () => {
        const prevNumberOfRooms = Number(quizData.propertyParameters.numberOfRooms);

        setQuizData({
            ...quizData,
            propertyParameters: {
                ...quizData.propertyParameters,
                numberOfRooms: prevNumberOfRooms + 0.5
            }
        })
    }

    return (
        <>
            <div className="quiz__title">Bitte geben Sie die Parameter des Objekts an</div>
            <div className="quiz__property-parameters property-parameters">
                <div className="property-parameters__body">
                    <div className="property-parameters__construction">
                        <label htmlFor="quiz-year-onstruction" className="quiz__label">Baujahr</label>
                        <input onInput={handleInputChange} type="number" name="yearConstruction" placeholder="Z.B. 1990" min='0' step='1' value={quizData.propertyParameters.yearConstruction} className="property-parameters__construction-input input" />
                        <div className="property-parameters__construction-handlers">
                            <button onClick={incrementConstruction} className="property-parameters__construction-handler property-parameters__construction-handler--decrement"></button>
                            <button onClick={decrementConstruction} className="property-parameters__construction-handler"></button>
                        </div>
                    </div>
                    <div className="property-parameters__rooms">
                        <label htmlFor="numberOfRooms" className="property-parameters__rooms-label quiz__label">Anzahl der Zimmer</label>
                        <div className="property-parameters__rooms-body">
                            <button type="button" onClick={decrementNumberOfRooms} className="property-parameters__rooms-button">
                            </button>
                            <input onChange={(e) => { }} id="numberOfRooms" type="number" name="numberOfRooms" value={quizData.propertyParameters.numberOfRooms} min='0.5' step='0.5' className="property-parameters__rooms-input input" />
                            <button type="button" onClick={incrementNumberOfRooms} className="property-parameters__rooms-button property-parameters__rooms-button--increment">
                            </button>
                        </div>
                    </div>
                    <RangeInput label="Wohnfläche" min={10} max={800} name="livingSpace" quizData={quizData} setQuizData={setQuizData} />
                    <RangeInput label="Grundstücksfläche" min={50} max={5000} name="landArea" quizData={quizData} setQuizData={setQuizData} />
                </div>
            </div>
        </>
    );
};