import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { EdgeData, GraphState, NodeData } from '../types'

const initialState: GraphState = { nodes: [], edges: [] }

const graphSlice = createSlice({
  name: 'graph',
  initialState,
  reducers: {
    setNode: (state, action: PayloadAction<NodeData[]>) => {
      state.nodes = action.payload
    },
    setEdges: (state, action: PayloadAction<EdgeData[]>) => {
      state.edges = action.payload
    },
    updateNode: (state, action) => {
      const { id, update } = action.payload
      const nodeIndex = state.nodes.findIndex((node) => node.id === id)
      if (nodeIndex !== -1) {
        state.nodes[nodeIndex] = {
          ...state.nodes[nodeIndex],
          style: {
            ...state.nodes[nodeIndex].style, // Preserve existing styles
            ...update.styles, // Merge new updates
          },
        }
      }
    },
  },
})

export const { setEdges, setNode, updateNode } = graphSlice.actions
export default graphSlice.reducer
