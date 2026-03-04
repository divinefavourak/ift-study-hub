import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "48px 32px", textAlign: "center" }}>
          <div style={{ fontSize: "2rem", marginBottom: "16px" }}>⚠️</div>
          <h2 style={{ color: "var(--orange)", marginBottom: "12px" }}>Something went wrong</h2>
          <p style={{ color: "var(--muted)", marginBottom: "24px" }}>
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <button
            className="action primary"
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Try again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
