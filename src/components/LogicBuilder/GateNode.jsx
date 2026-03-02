import { Handle, Position } from "reactflow";

const gateStyles = {
  AND: { bg: "#3b82f6", label: "AND", inputs: 2 },
  OR:  { bg: "#10b981", label: "OR",  inputs: 2 },
  NOT: { bg: "#f59e0b", label: "NOT", inputs: 1 },
  XOR: { bg: "#8b5cf6", label: "XOR", inputs: 2 },
  NAND: { bg: "#ef4444", label: "NAND", inputs: 2 },
  NOR: { bg: "#06b6d4", label: "NOR", inputs: 2 },
};

export default function GateNode({ data }) {
  const { type = "AND", outputValue = null } = data;
  const config = gateStyles[type] || gateStyles["AND"];

  return (
    <div
      style={{
        background: config.bg,
        color: "white",
        padding: "10px 20px",
        borderRadius: "8px",
        minWidth: "80px",
        textAlign: "center",
        boxShadow: outputValue === 1 ? "0 0 15px currentColor" : "0 4px 6px rgba(0,0,0,0.3)",
        opacity: outputValue === 0 ? 0.7 : 1,
        transition: "all 0.2s ease"
      }}
    >
      {/* Input Handles */}
      {config.inputs === 2 ? (
        <>
          <Handle type="target" position={Position.Left} id="inA" style={{ top: "30%" }} />
          <Handle type="target" position={Position.Left} id="inB" style={{ top: "70%" }} />
        </>
      ) : (
        <Handle type="target" position={Position.Left} id="inA" />
      )}

      <div style={{ fontWeight: "bold", letterSpacing: "1px" }}>{config.label}</div>
      <div style={{ fontSize: "0.7rem", opacity: 0.8 }}>
        Out: {outputValue !== null ? outputValue : "?"}
      </div>

      {/* Output Handle */}
      <Handle type="source" position={Position.Right} id="out" />
    </div>
  );
}
