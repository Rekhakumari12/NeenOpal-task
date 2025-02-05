import { createSlice } from '@reduxjs/toolkit'
import { HistoryState } from '../types'

const initialState: HistoryState = {
  past: [], // undo
  present: null,
  future: [], // redo
}

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    saveState: (state, action) => {
      if (state.present) {
        state.past.push(state.present)
      }
      state.present = action.payload
      state.future = [] // clear redo history for new changes
    },
    redo: (state) => {
      if (state.future.length > 0) {
        if (state.present !== null) {
          state.past.push(state.present) // push element to the end of the array
        }
        state.present = state.future.shift() || null
      }
    },
    undo: (state) => {
      if (state.past.length > 0) {
        if (state.present !== null) {
          state.future.unshift(state.present) // push element to the start of the array
        }
        state.present = state.past.pop() || null
      }
    },
  },
})

export const { redo, undo, saveState } = historySlice.actions
export default historySlice.reducer
