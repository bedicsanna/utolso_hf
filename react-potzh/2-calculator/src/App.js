import './App.css';
import { ResultComponent } from './components/ResultComponent';
import { KeyPadComponent } from "./components/KeyPadComponent";
import { HistoryComponent } from './components/HistoryComponent';
import { addNumerToExpression, addNumber, addOperatorToExpression, setEditorMode, addToHistory, clearExpression } from './services/reducers/calculatorSlice';
import { useDispatch, useSelector } from "react-redux";
import { combineSlices } from '@reduxjs/toolkit';

const App = () => {
    const {currentValue, currentExpression, history, editorMode} = useSelector(state => state.calculator)
    const dispatch = useDispatch()

    const handleClick = (e)=> {
        let value = e.target.name
        if (value) {    
            if (currentValue !== 0 && !isNaN(value) && !editorMode){
                value = `${currentValue}` + `${value}`
            } 
            else {
                dispatch(setEditorMode(false))
            }

            if (!isNaN(value)){
                dispatch(addNumber(value))
            }
            else {
            }

            if (!isNaN(value)){
                dispatch(addNumerToExpression(value))
            }
            else{
                dispatch(addOperatorToExpression(value))
            }

            if (value === "="){
                dispatch(setEditorMode(true))
                const result = eval(currentExpression.join(" "))
                dispatch(addNumber(result))
                dispatch(addToHistory(`${currentExpression.join(" ")}` + ` = ${result}`))
                dispatch(clearExpression())
            }
        }}

    return (
        <div>
            <div className="calculator-body">
                <h1>Számológép</h1>
                <ResultComponent />
                <KeyPadComponent handleClick={handleClick} />
                <HistoryComponent />
            </div>
        </div>
    );

};

export default App;
