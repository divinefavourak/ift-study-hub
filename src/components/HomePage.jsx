import { HOME_TAGS } from "../data/courseData";

function HomePage({ onNavigate, scoreBook }) {
  const summary = [
    ["section_lec1", "Lecture 1 section quiz"],
    ["section_note1", "Note One section quiz"],
    ["section_note2", "Note Two section quiz"],
    ["full_all", "Full mixed quiz"],
  ]
    .filter(([key]) => typeof scoreBook[key] === "number")
    .map(([key, label]) => `${label}: ${scoreBook[key]}%`);

  return (
    <section className="page active-page">
      <div className="hero-badge">IFT 211 | MATERIAL-ALIGNED INTERACTIVE HUB ARRANGED BY JESUTOBI-001 OF CSC</div>
      <h2 className="hero-title">
        DIGITAL LOGIC
        <br />
        <span>AND DESIGN</span>
      </h2>
      <p className="hero-text">
        Built from your uploaded course pack. Structure follows Lecture 1 and
        combinational-circuit notes, with explicit placeholders for sparse scanned
        lectures so no unsupported topics are invented.
      </p>

      <div className="tags">
        {HOME_TAGS.map((tag) => (
          <span className={`tag ${tag.tone}`} key={tag.label}>
            {tag.label}
          </span>
        ))}
      </div>

      <div className="card-grid">
        <button className="jump-card" onClick={() => onNavigate("lec1")}>
          <span>Lecture 1</span>
          <h4>Digital Foundations</h4>
          <p>Analog vs digital, signal behavior, and timing equations.</p>
        </button>
        <button className="jump-card" onClick={() => onNavigate("note1-core")}>
          <span>Note One</span>
          <h4>Combinational Core</h4>
          <p>Memoryless circuit logic and function representation methods.</p>
        </button>
        <button className="jump-card" onClick={() => onNavigate("note2-encoder")}>
          <span>Note Two</span>
          <h4>Encoder, Decoder, Adder</h4>
          <p>Priority resolution, address decoding, and arithmetic logic.</p>
        </button>
        <button
          className="jump-card"
          onClick={() => onNavigate("section-quizzes")}
        >
          <span>Assessment</span>
          <h4>Cambridge-style Quizzes</h4>
          <p>Option-level feedback for section quizzes and full quiz.</p>
        </button>
      </div>

      <div className="content-block">
        <h4>Study Flow</h4>
        <ul>
          <li>Read the topic pages from Lecture 1 to Note Two.</li>
          <li>Use inline key-term tooltips while reading.</li>
          <li>Drill flashcards and complete section quizzes.</li>
          <li>Use the full quiz for final revision; best scores are saved locally.</li>
        </ul>
      </div>

      <div className="content-block">
        <h4>Saved Performance</h4>
        {summary.length === 0 ? (
          <p>No quiz attempts saved yet.</p>
        ) : (
          <ul>
            {summary.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default HomePage;

