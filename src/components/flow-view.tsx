import { getPriorityColor, getPriorityLabel } from '@/lib/utils';
import { useTaskStore } from '@/store/task-store';
import type { Task } from '@/types';
import {
  type Node,
  type Edge,
  addEdge,
  type Connection,
  useNodesState,
  useEdgesState,
  ConnectionMode,
  Background,
  Controls,
  ReactFlow,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { memo, useCallback, useEffect, useMemo } from 'react';

const FLOW_CONFIG = {
  GRID: {
    COLUMNS: 4,
    NODE_WIDTH: 280,
    NODE_HEIGHT: 180,
    OFFSET_X: 50,
    OFFSET_Y: 50,
  },
  EDGE: {
    COLOR: '#f54900',
    WIDTH: 2,
  },
  HANDLE: {
    SIZE: 12,
    COLOR: '#5045e6',
    BORDER: '',
  },
} as const;

const calculateNodePosition = (index: number) => ({
  x: (index % FLOW_CONFIG.GRID.COLUMNS) * FLOW_CONFIG.GRID.NODE_WIDTH + FLOW_CONFIG.GRID.OFFSET_X,
  y: Math.floor(index / FLOW_CONFIG.GRID.COLUMNS) * FLOW_CONFIG.GRID.NODE_HEIGHT + FLOW_CONFIG.GRID.OFFSET_Y,
});

const createEdgeConfig = (source: string, target: string): Edge => ({
  id: `${source}-${target}`,
  source,
  target,
  sourceHandle: 'source',
  targetHandle: 'target',
  type: 'smoothstep',
  animated: true,
  style: { stroke: FLOW_CONFIG.EDGE.COLOR, strokeWidth: FLOW_CONFIG.EDGE.WIDTH },
  markerEnd: {
    type: 'arrowclosed',
    color: FLOW_CONFIG.EDGE.COLOR,
  },
});

function getTaskEdges(tasks: Task[]): Edge[] {
  const edges: Edge[] = [];

  for (const task of tasks) {
    if (task.dependencies) {
      for (const depId of task.dependencies) {
        if (tasks.some(t => t.id === depId)) {
          edges.push({
            ...createEdgeConfig(depId, task.id),
            sourceHandle: 'source',
            targetHandle: 'target'
          });
        }
      }
    }
  }

  return edges;
}

const handleStyle = {
  background: FLOW_CONFIG.HANDLE.COLOR,
  width: FLOW_CONFIG.HANDLE.SIZE,
  height: FLOW_CONFIG.HANDLE.SIZE,
  border: FLOW_CONFIG.HANDLE.BORDER,
};

const TaskNode = memo(({ data }: { data: { task: Task } }) => {
  const { task } = data;

  return (
    <div className="bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg p-3 shadow-lg min-w-[200px] hover:border-primary transition-colors">
      <Handle
        type="target"
        position={Position.Left}
        id="target"
        style={handleStyle}
        className="hover:scale-110 transition-transform"
      />

      <div className="font-semibold mb-2 text-sm">
        {task.title}
      </div>
      <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(task.priority)}`}>
        {getPriorityLabel(task.priority)}
      </div>

      <Handle
        type="source"
        position={Position.Right}
        id="source"
        style={handleStyle}
        className="hover:scale-110 transition-transform"
      />
    </div>
  );
});

const nodeTypes = {
  taskNode: TaskNode,
};

export default function FlowView() {
  const { tasks, updateTask } = useTaskStore()

  const initialNodes: Node[] = useMemo(() =>
    tasks.map((task, index) => ({
      id: task.id,
      type: 'taskNode',
      position: calculateNodePosition(index),
      data: { task },
      draggable: true,
    })), [tasks]);

  const initialEdges: Edge[] = useMemo(() => getTaskEdges(tasks), [tasks]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => {
      const { source, target } = params;

      if (!source || !target || source === target) return;

      const connectionExists = edges.some(
        edge => edge.source === source && edge.target === target
      );

      if (connectionExists) return;

      const newEdge = createEdgeConfig(source, target);
      setEdges((eds) => addEdge(newEdge, eds));

      const targetTask = tasks.find(task => task.id === target);
      if (targetTask) {
        const currentDependencies = targetTask.dependencies || [];
        if (!currentDependencies.includes(source)) {
          updateTask(target, {
            dependencies: [...currentDependencies, source]
          });
        }
      }
    },
    [setEdges, edges, tasks, updateTask]
  );

  const onEdgesDelete = useCallback(
    (edgesToDelete: Edge[]) => {
      edgesToDelete.forEach((edge) => {
        const targetTask = tasks.find(task => task.id === edge.target);
        if (targetTask) {
          const updatedDependencies = (targetTask.dependencies || []).filter(
            (depId) => depId !== edge.source
          );
          updateTask(edge.target, {
            dependencies: updatedDependencies.length > 0 ? updatedDependencies : undefined
          });
        }
      });
    },
    [tasks, updateTask]
  );

  useEffect(() => {
    setNodes((currentNodes) => {
      const nodePositions = new Map(
        currentNodes.map(node => [node.id, node.position])
      );

      return tasks.map((task, index) => ({
        id: task.id,
        type: 'taskNode',
        position: nodePositions.get(task.id) || calculateNodePosition(index),
        data: { task },
        draggable: true,
      }));
    });
  }, [tasks, setNodes]);

  useEffect(() => {
    setEdges(initialEdges);
  }, [initialEdges, setEdges]);

  return (
    <div className="h-full w-full" id="flow-view">
      <div style={{ height: '500px' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onEdgesDelete={onEdgesDelete}
          connectionMode={ConnectionMode.Loose}
          nodeTypes={nodeTypes}
          fitView
          deleteKeyCode="Delete"
          elementsSelectable={true}
          selectNodesOnDrag={false}
        >
          <Background />
          <Controls className='text-slate-900' />
        </ReactFlow>
      </div>
    </div>
  )
}
