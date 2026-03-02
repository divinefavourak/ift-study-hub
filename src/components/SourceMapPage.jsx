import { SOURCE_FILES } from "../data/courseData";

function SourceMapPage() {
  return (
    <section className="page active-page">
      <div className="section-header">
        <div className="section-tag">Uploaded Sources</div>
        <h3>FILE COVERAGE MAP</h3>
        <p>
          All uploaded files are represented. Sparse OCR extractions are flagged
          explicitly and kept as placeholders by exact file heading.
        </p>
      </div>

      <div className="file-grid">
        {SOURCE_FILES.map((file) => (
          <article className="file-card" key={file.name}>
            <h5>{file.name}</h5>
            <p>{file.status}</p>
          </article>
        ))}
      </div>

      <div className="info-box info">
        <strong>Content policy:</strong> this site uses only uploaded materials and
        avoids invented topic content where text extraction was sparse.
      </div>
    </section>
  );
}

export default SourceMapPage;

