import { useEffect, useState } from 'react'
import { EdgeData, NodeData } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { updateNode } from '../redux/graphSlice'
import { saveState } from '../redux/historySlice'

function ColorPicker({ selectedNode }: { readonly selectedNode: NodeData }) {
  const dispatch = useDispatch()

  const graphState = useSelector(
    (state: { graph: { nodes: NodeData[]; edges: EdgeData[] } }) => state.graph
  )
  const currentSelectedNode = graphState.nodes.find((node) => node.id === selectedNode.id)

  const [color, setColor] = useState(currentSelectedNode?.style.background ?? '#ffffff')

  useEffect(() => {
    setColor(currentSelectedNode?.style.background ?? '#ffffff')
  }, [currentSelectedNode])

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedColor = e.target.value
    setColor(selectedColor)

    const updatedStyles = { ...currentSelectedNode?.style, background: selectedColor }
    dispatch(updateNode({ id: currentSelectedNode?.id, update: { styles: updatedStyles } }))

    // save changes to history
    dispatch(
      saveState({
        nodes: graphState.nodes.map((node) => {
          return node.id === currentSelectedNode?.id ? { ...node, style: updatedStyles } : node
        }),
        edges: graphState.edges,
      })
    )
  }
  return (
    <div>
      <label htmlFor="color">
        <strong>Color:</strong>
      </label>
      <input
        type="color"
        name="color"
        value={color}
        onChange={handleColorChange}
        className="color-picker"
      />
    </div>
  )
}

export default ColorPicker
