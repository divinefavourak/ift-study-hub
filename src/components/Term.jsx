function Term({ label, tip }) {
  return (
    <span className="term">
      {label}
      <span className="term-tip">{tip}</span>
    </span>
  );
}

export default Term;

