import React, { useState, useCallback, useEffect, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
} from "reactflow";
import "reactflow/dist/style.css";

import GateNode from "./GateNode";
import { SwitchNode, LightNode } from "./IONodes";
import { evaluateCircuit } from "./engine";

const nodeTypes = {
  gateNode: GateNode,
  switchNode: SwitchNode,
  lightNode: LightNode,
};

let idCounter = 1;
const getId = () => `node_${idCounter++}`;

export default function LogicGateBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  
  const reactFlowWrapper = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Recalculate circuit whenever nodes or edges change in a meaningful way
  useEffect(() => {
    if (nodes.length === 0) return;
    
    const results = evaluateCircuit(nodes, edges);
    let changed = false;
    
    const updatedNodes = nodes.map(n => {
      // For gates and lights, we update their displayed output value
      if (n.type === 'gateNode' || n.type === 'lightNode') {
        const newVal = results[n.id] !== undefined ? results[n.id] : null;
        if (n.data.value !== newVal && n.data.outputValue !== newVal) {
          changed = true;
          return {
            ...n,
            data: { 
              ...n.data, 
              value: newVal, 
              outputValue: newVal 
            }
          };
        }
      }
      return n;
    });

    if (changed) {
      setNodes(updatedNodes);
    }
  }, [nodes.map(n => n.data.value).join(','), edges.length]);
  // Dependencies target when a switch changes value or we add/remove edges

  const onConnect = useCallback(
    (params) => {
      // Prevent connecting to the same target handle twice
      const existingEdge = edges.find(e => e.target === params.target && e.targetHandle === params.targetHandle);
      if (!existingEdge) {
        setEdges((eds) => addEdge({ ...params, animated: true, style: { stroke: 'var(--cyan)' } }, eds));
      }
    },
    [edges, setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      
      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const typeStr = event.dataTransfer.getData('application/reactflow');
      
      if (!typeStr) return;

      // Extract node type and gate type (if it's a gate)
      const [nodeClass, gateType] = typeStr.split(':');
      
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      
      const newNode = {
        id: getId(),
        type: nodeClass,
        position,
        data: nodeClass === 'gateNode' 
          ? { type: gateType, outputValue: null }
          : { 
              value: 0, 
              toggle: () => {
                // Switch toggle logic
                setNodes(nds => nds.map(n => {
                  if (n.id === newNode.id) {
                    return { ...n, data: { ...n.data, value: n.data.value ? 0 : 1 } };
                  }
                  return n;
                }));
              }
            },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <div className="logic-builder-page page active-page border">
      <div className="lb-header">
        <h2 className="lb-title">⚡ Interactive Logic Gate Builder</h2>
        <p className="lb-sub">Drag and drop components to build and test your own digital circuits.</p>
      </div>

      <div className="lb-layout" style={{ display: 'flex', height: '600px', width: '100%', marginTop: '20px', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}>
        
        {/* Sidebar Component Palette */}
        <aside style={{ width: '250px', background: 'var(--surface2)', padding: '15px', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h4 style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '10px' }}>INPUT / OUTPUT</h4>
            <div 
              className="drag-node" 
              style={{ background: '#374151', padding: '10px', borderRadius: '6px', cursor: 'grab', marginBottom: '8px', color: 'white', border: '1px solid #4B5563' }}
              onDragStart={(e) => e.dataTransfer.setData('application/reactflow', 'switchNode:Switch')}
              draggable
            >
              🔄 Toggle Switch (0/1)
            </div>
            <div 
              className="drag-node" 
              style={{ background: '#1f2937', padding: '10px', borderRadius: '6px', cursor: 'grab', color: 'white', border: '1px solid #4B5563' }}
              onDragStart={(e) => e.dataTransfer.setData('application/reactflow', 'lightNode:Light')}
              draggable
            >
              💡 Output Lightbulb
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '10px' }}>LOGIC GATES</h4>
            {['AND', 'OR', 'NOT', 'XOR', 'NAND', 'NOR'].map(type => (
              <div 
                key={type}
                className="drag-node" 
                style={{ background: 'rgba(0,0,0,0.2)', padding: '10px', borderRadius: '6px', cursor: 'grab', marginBottom: '8px', border: '1px solid var(--border)', fontWeight: 'bold' }}
                onDragStart={(e) => e.dataTransfer.setData('application/reactflow', `gateNode:${type}`)}
                draggable
              >
                {type} Gate
              </div>
            ))}
          </div>

          <div style={{ marginTop: 'auto', fontSize: '0.8rem', opacity: 0.6 }}>
            <p>Tip: Drag from a dot to connect gates. Click a wire to select it, press Backspace to delete.</p>
          </div>
        </aside>
        
        {/* ReactFlow Canvas */}
        <div style={{ flex: 1 }} ref={reactFlowWrapper}>
          <ReactFlowProvider>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              fitView
              colorMode="dark"
            >
              <Background gap={16} size={1} color="rgba(255,255,255,0.1)" />
              <Controls />
            </ReactFlow>
          </ReactFlowProvider>
        </div>
      </div>
    </div>
  );
}
