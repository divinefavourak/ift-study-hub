import { Handle, Position } from "reactflow";

export function SwitchNode({ data }) {
  const { value = 0, toggle } = data;

  return (
    <div
      style={{
        background: value ? "#22c55e" : "#374151",
        color: "white",
        padding: "10px 15px",
        borderRadius: "8px",
        border: "2px solid #111827",
        cursor: "pointer",
        textAlign: "center",
        minWidth: "60px",
        transition: "all 0.2s"
      }}
      onClick={toggle}
    >
      <div style={{ fontSize: "0.75rem", marginBottom: "4px" }}>INPUT</div>
      <div style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{value}</div>
      <Handle type="source" position={Position.Right} id="out" />
    </div>
  );
}

export function LightNode({ data }) {
  const { value = null } = data;
  const isOn = value === 1;

  return (
    <div
      style={{
        background: isOn ? "#fbbf24" : "#1f2937",
        color: isOn ? "black" : "white",
        padding: "15px",
        borderRadius: "50%",
        border: isOn ? "2px solid #f59e0b" : "2px solid #374151",
        width: "60px",
        height: "60px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        boxShadow: isOn ? "0 0 20px #fbbf24" : "none",
        transition: "all 0.3s ease"
      }}
    >
      <Handle type="target" position={Position.Left} id="in" />
      <span style={{ fontSize: "1.5rem" }}>{isOn ? "💡" : "💡"}</span>
      <span style={{ fontSize: "0.7rem", fontWeight: "bold" }}>{isOn ? "ON" : "OFF"}</span>
    </div>
  );
}
