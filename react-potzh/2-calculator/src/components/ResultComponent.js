import { useSelector } from "react-redux";

export const ResultComponent = () => {
    const {currentValue} = useSelector(state => state.calculator)
    return (
        <div className="result">
            <p>{currentValue}</p>
        </div>
    )

};
