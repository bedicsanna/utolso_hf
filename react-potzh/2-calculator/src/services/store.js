import { configureStore } from '@reduxjs/toolkit'
import calculatorSlice from './reducers/calculatorSlice'

export const store = configureStore({
  reducer: {
    calculator: calculatorSlice
  },
})