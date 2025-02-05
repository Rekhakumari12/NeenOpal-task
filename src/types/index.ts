export interface NodeData {
  id: string
  data: { label: string }
  position: { x: number; y: number }
  style: {
    background?: string
    fontSize?: string
    padding?: number
  }
  draggable: boolean
}

export interface EdgeData {
  id: string
  source: string
  target: string
}

export interface GraphState {
  nodes: NodeData[]
  edges: EdgeData[]
}

export interface HistoryState {
  past: GraphState[]
  present: GraphState | null
  future: GraphState[]
}
