export const LastStep = ({ quizData, setQuizData }) => {
    const handleInputChange = (e) => {
        const { target } = e;
        const inputValue = target.value;

        setQuizData(
            {
                ...quizData,
                email: inputValue
            })
    }

    return (
        <>
            <div className="quiz__title quiz__title--last">An wen dürfen wir uns bezüglich der Bewertung wenden?</div>
            <div className="quiz__last">
                <p className="quiz__last-text">
                    Bitte achten Sie auf die korrekte Schreibweise Ihrer E-Mail-Adresse. <span>Wichtig:</span> Überprüfen Sie auch Ihren Spam-Ordner nach Post <a href="mailto:pochtaname@gmail.com">pochtaname@gmail.com</a>
                </p>
                <div className="quiz__last-icon">
                    <img src="../images/icons/lock.svg" alt="Icon" title="Icon" />
                </div>
                <div className="quiz__last-email quiz__item">
                    <label htmlFor="quiz-email" className="quiz__label">E-mail</label>
                    <input onInput={handleInputChange} id="quiz-email" type="email" name="email" placeholder="Geben Sie Ihre E-Mail ein" className="quiz__input input" />
                </div>
                <label className="quiz__last-privacy quiz__ checkbox">
                    <input type="checkbox" name="privacy" className="checkbox__input visually-hidden" />
                    <div className="checkbox__indicator"></div>
                    <div className="checkbox__text">Ich willige zur Kontaktaufnahme und Zusendung von Informationen ein. Weitere Angaben, auch zu meinem Widerrufsrecht, habe ich in der <a href="#">Datenschutzerklärung</a> gelesen.</div>
                </label>
                <button type="button" disabled={!quizData.email} className="quiz__last-button button">E-Mail-Adresse bestätigen</button>
            </div>
        </>
    );
};