export function evaluateCircuit(nodes, edges) {
  // Map of nodeId -> output value (0, 1, or null)
  const values = {};
  
  // Initialize static values (switches)
  nodes.forEach(n => {
    if (n.type === 'switchNode') {
      values[n.id] = n.data.value || 0;
    } else {
      values[n.id] = null;
    }
  });

  // Iterative relaxation to propagate signals
  // We cap iterations to avoid infinite loops from cyclic circuits (feedback loops)
  let changed = true;
  let iterations = 0;
  const maxIterations = nodes.length + 5;
  
  while (changed && iterations < maxIterations) {
    changed = false;
    iterations++;
    
    nodes.forEach(node => {
      if (node.type === 'switchNode') return;
      
      const incomingEdges = edges.filter(e => e.target === node.id);
      
      // Determine inputs based on target handles
      const edgeA = incomingEdges.find(e => e.targetHandle === 'inA' || (!e.targetHandle && incomingEdges.length > 0));
      const edgeB = incomingEdges.find(e => e.targetHandle === 'inB');
      // If a node only takes one input (NOT, Light), edgeA is used.
      // If it takes two and only one is connected, edgeB might be undefined.
      
      const valA = edgeA ? values[edgeA.source] : 0; // default unconnected to 0
      const valB = edgeB ? values[edgeB.source] : 0;

      let newOut = null;
      
      if (node.type === 'lightNode') {
        newOut = valA;
      } else if (node.type === 'gateNode') {
        const type = node.data.type;
        const a = valA !== null ? valA : 0;
        const b = valB !== null ? valB : 0;
        
        switch (type) {
          case 'AND': newOut = a & b; break;
          case 'OR':  newOut = a | b; break;
          case 'NOT': newOut = a ? 0 : 1; break;
          case 'XOR': newOut = a ^ b; break;
          case 'NAND': newOut = (a & b) ? 0 : 1; break;
          case 'NOR': newOut = (a | b) ? 0 : 1; break;
          default: newOut = 0; break;
        }
      }
      
      if (values[node.id] !== newOut) {
        values[node.id] = newOut;
        changed = true;
      }
    });
  }
  
  return values;
}
