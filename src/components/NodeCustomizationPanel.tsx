import { NodeData } from '../types'
import ColorPicker from './ColorPicker'
import FontSizeControl from './FontSizeControl'

function NodeCustomizationPanel({ selectedNode }: { readonly selectedNode: NodeData }) {
  return (
    <div className="node-panel">
      <h2>Customize Node {selectedNode.id}</h2>
      <ColorPicker selectedNode={selectedNode} />
      <FontSizeControl selectedNode={selectedNode} />
    </div>
  )
}

export default NodeCustomizationPanel
