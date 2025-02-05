import { useEffect, useState } from 'react'
import { EdgeData, NodeData } from '../types'
import { useDispatch, useSelector } from 'react-redux'
import { updateNode } from '../redux/graphSlice'
import { saveState } from '../redux/historySlice'

function FontSizeControl({ selectedNode }: { readonly selectedNode: NodeData }) {
  const dispatch = useDispatch()
  const graphState = useSelector(
    (state: { graph: { nodes: NodeData[]; edges: EdgeData[] } }) => state.graph
  )
  const currentSelectedNode = graphState.nodes.find((node) => node.id === selectedNode.id)

  const [fontSize, setFontSize] = useState(parseInt(currentSelectedNode?.style.fontSize ?? '12'))

  useEffect(() => {
    setFontSize(parseInt(currentSelectedNode?.style.fontSize ?? '12'))
  }, [currentSelectedNode])

  const handleFontChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const size = parseInt(e.target.value ?? 12)
    setFontSize(size)

    const updatedStyles = {
      ...currentSelectedNode?.style, //Preserve existing styles
      fontSize: `${size}px`, //Apply new font size
    }

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
    <div className="align-center">
      <label htmlFor="font">
        <strong>Font Size: </strong>
      </label>
      <input
        type="number"
        name="font"
        min={12}
        max={24}
        value={fontSize}
        onChange={handleFontChange}
        style={{ marginLeft: 10 }}
      />{' '}
      px
    </div>
  )
}

export default FontSizeControl
