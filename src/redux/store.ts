import { configureStore } from '@reduxjs/toolkit'
import graphReducer from './graphSlice'
import historyReducer from './historySlice'
export const store = configureStore({
  reducer: {
    graph: graphReducer,
    history: historyReducer,
  },
})
