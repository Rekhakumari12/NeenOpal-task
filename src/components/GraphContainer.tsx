import {
  Background,
  ReactFlow,
  NodeMouseHandler,
  Controls,
  applyNodeChanges,
  NodeChange,
} from '@xyflow/react'
import { useDispatch, useSelector } from 'react-redux'
import { GraphState, NodeData } from '../types'
import { useCallback, useEffect, useState } from 'react'
import { setEdges, setNode } from '../redux/graphSlice'
import NodeCustomizationPanel from './NodeCustomizationPanel'
import UndoRedoControls from './UndoRedoControls'
import { saveState } from '../redux/historySlice'

const initialNodes = Array.from({ length: 10 }, (_, i) => ({
  id: `${i + 1}`,
  data: { label: `Node ${i + 1}` },
  position: { x: i * 100, y: i * 100 },
  style: { background: '#ffffff', fontSize: '14px' },
  draggable: true,
}))

const initialEdges = Array.from({ length: 10 }, (_, i) => ({
  id: `edge-${i + 1}`,
  source: `${i + 1}`,
  target: `${i + 2}`,
  animated: true,
}))

function GraphContainer() {
  const { nodes, edges } = useSelector((state: { graph: GraphState }) => state.graph)
  const [selectedNode, setSelectedNode] = useState<NodeData | null>(null)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setNode(initialNodes))
    dispatch(setEdges(initialEdges))
    dispatch(saveState({ nodes: initialNodes, edges: initialEdges }))
  }, [dispatch])

  const onNodeClick: NodeMouseHandler<NodeData> = (e, node: NodeData) => {
    e.preventDefault()
    setSelectedNode(node)
    dispatch(saveState({ nodes, edges }))
  }

  // handle changes to the nodes (dragging, position update, etc.)
  const onNodeChange = useCallback(
    (newNodes: NodeChange<NodeData>[]) => {
      const updatedNode = applyNodeChanges(newNodes, nodes)
      dispatch(setNode(updatedNode))
    },
    [dispatch, nodes]
  )
  return (
    <div>
      <div className="graph-container">
        <div style={{ height: '60vh', border: '2px solid black' }}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodeClick={onNodeClick}
            onNodesChange={onNodeChange}
            fitView
          >
            <Background gap={16} />
            <Controls />
          </ReactFlow>
        </div>
      </div>
      <div className="node-customization-panel">
        {selectedNode && <NodeCustomizationPanel selectedNode={selectedNode} />}
      </div>
      <UndoRedoControls />
    </div>
  )
}

export default GraphContainer
