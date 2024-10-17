import * as Slider from "@radix-ui/react-slider";

export const RangeInput = ({ label, min, max, name, quizData, setQuizData }) => {
    const handleRangeChange = (value) => {
        setQuizData({
            ...quizData,
            propertyParameters: {
                ...quizData.propertyParameters,
                [name]: value
            }
        })
    };

    const handleInputChange = (e) => {
        const { target } = e;
        let inputValue = target.value;

        if (inputValue > max) inputValue = max;
        if (inputValue < 0) inputValue = min;

        setQuizData({
            ...quizData,
            propertyParameters: {
                ...quizData.propertyParameters,
                [name]: inputValue
            }
        })
    }

    const handleInputBlur = (e) => {
        const { target } = e;
        let inputValue = target.value;

        if (inputValue > max) inputValue = max;
        if (inputValue < min || !inputValue) inputValue = min;

        setQuizData({
            ...quizData,
            propertyParameters: {
                ...quizData.propertyParameters,
                [name]: inputValue
            }
        })
    }

    return (
        <div className="property-parameters__range">
            <div className="quiz__label">
                {label}
            </div>
            <Slider.Root
                className="property-parameters__range-item range-slider"
                value={[quizData.propertyParameters[name]]}
                min={min}
                max={max}
                step={1}
                onValueChange={handleRangeChange}
            >
                <Slider.Track className="range-slider__track">
                    <Slider.Range className="range-slider__range" />
                </Slider.Track>
                {name === 'livingSpace' && (
                    <Slider.Thumb className="range-slider__thumb" aria-label="Volume" >
                        <div className="range-slider__tooltip">
                            {quizData.propertyParameters[name]} m<sup>²</sup>
                        </div>
                    </Slider.Thumb>
                )}
                {name !== 'livingSpace' && (
                    <Slider.Thumb className="range-slider__thumb" aria-label="Volume" />
                )}
            </Slider.Root>
            <div className="property-parameters__range-marks">
                <div className="property-parameters__range-mark">{min} m<sup>²</sup></div>
                <div className="property-parameters__range-mark">+ {max} m<sup>²</sup></div>
            </div>
            <label className="property-parameters__range-manual">
                <div className="property-parameters__range-manual-text">Oder manuell eingeben:</div>
                <input type="number" name={name} onChange={handleInputChange} onBlur={handleInputBlur} value={quizData.propertyParameters[name]} className="property-parameters__range-manual-input input" />
            </label>
        </div>
    );
};