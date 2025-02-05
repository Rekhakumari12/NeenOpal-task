import { useDispatch, useSelector } from 'react-redux'
import { redo, undo } from '../redux/historySlice'
import { GraphState, HistoryState } from '../types'
import { setEdges, setNode } from '../redux/graphSlice'

function UndoRedoControls() {
  const dispatch = useDispatch()
  const history = useSelector((state: { history: HistoryState }) => state.history)

  const applyHistoryState = (state: GraphState) => {
    if (state) {
      dispatch(setNode(state.nodes))
      dispatch(setEdges(state.edges))
    }
  }
  const handleUndo = () => {
    console.log('first', history)
    dispatch(undo())
    applyHistoryState(history?.past[history.past.length - 1])
  }

  const handleRedo = () => {
    dispatch(redo())
    applyHistoryState(history?.future[0])
  }
  return (
    <div className="undo-redo-controls">
      <button onClick={handleUndo}>Undo</button>
      <button onClick={handleRedo}>Redo</button>
    </div>
  )
}

export default UndoRedoControls
