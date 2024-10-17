export const AddressStep = ({ quizData, setQuizData }) => {
    const handleInputChange = (e) => {
        const { target } = e;
        const inputName = target.name;
        const inputValue = target.value;

        setQuizData(
            {
                ...quizData,
                address: {
                    ...quizData.address,
                    [inputName]: inputValue
                }
            })
    }

    return (
        <>
            <div className="quiz__title">Bitte geben Sie die Adresse der Immobilie ein.</div>
            <div className="quiz__address">
                <div className="quiz__address-item quiz__address-item--big">
                    <label className="quiz__label">Straße</label>
                    <input onInput={handleInputChange} type="text" name="street" value={quizData.address.street} placeholder="Straße spezifizieren" className="input quiz__input" />
                </div>
                <div className="quiz__address-item quiz__address-item--small">
                    <label className="quiz__label">Hausnr</label>
                    <input onInput={handleInputChange} type="number" name="houseNumber" value={quizData.address.houseNumber} placeholder="35" className="input quiz__input" />
                </div>
                <div className="quiz__address-item quiz__address-item--small">
                    <label className="quiz__label">PLZ</label>
                    <input onInput={handleInputChange} type="text" name="postalCode" value={quizData.address.postalCode} placeholder="PLZ schreiben" className="input quiz__input" />
                </div>
                <div className="quiz__address-item quiz__address-item--big">
                    <label className="quiz__label">Ort</label>
                    <input onInput={handleInputChange} type="text" name="place" value={quizData.address.place} placeholder="Ort schreiben" className="input quiz__input" />
                </div>
            </div>
        </>
    );
};