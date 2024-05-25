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

    document.addEventListener('keydown', (event) => {
        const keyName = event.key;
        handleClick(event)
      });

    const handleClick = (e)=> {
        const operators = ["+", "-", "*", "/", "="]

        let value = null
        if (e.target.name){
            value = e.target.name
        }
        else if (e.key){
            // console.log(!isNaN(e.key))
            // console.log(operators.includes(e.key))
            if (!isNaN(e.key) || operators.includes(e.key)){
                value = e.key
            }
        }

        if (value) {    
            console.log(operators.includes(value))
            console.log(value)
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
