import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentValue: 0, //aktuálisan bevitt számot
    currentExpression: [], //aktuálisan szerkesztett kifejezést
    history: [], //korábbi kifejezéseket tároljuk.
    editorMode: false, //kijelzőn lévő érték épp szerkesztés alatt van-e vagy eredmény jelenik meg
};

export const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        addNumber: (state, { payload }) => {
            state.currentValue = payload
        },
        addNumerToExpression: (state, { payload }) => {
            if (state.currentExpression.length === 0){
                state.currentExpression[0] = payload
            }
            else{
                state.currentExpression[state.currentExpression.length-1] = payload
            }
        },
        addOperatorToExpression: (state, { payload }) => {
            state.currentExpression.push(payload)
            state.currentExpression.push("")
            state.currentValue = 0
        },
        clearExpression: (state) => {
            state.currentExpression = []
        },
        setEditorMode: (state, {payload}) => {
            state.editorMode = payload
        },
        addToHistory: (state, {payload}) => {
            state.history.push(payload)
        }
    },
})

export const { 
    addNumber, 
    addNumerToExpression, 
    addOperatorToExpression,
    clearExpression, 
    setEditorMode,
    addToHistory
} = calculatorSlice.actions

export default calculatorSlice.reducer