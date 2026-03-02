import { useEffect } from "react";

/**
 * Cheatsheet component
 * A strictly print-optimized view of all key formulas and notes.
 * Uses @media print CSS rules to format nicely into A4 pages when downloaded as PDF.
 */
export default function Cheatsheet({ onBack }) {
  useEffect(() => {
    // Optionally trigger print immediately if we want
    // setTimeout(() => window.print(), 500);
  }, []);

  return (
    <div className="cheatsheet-page bg-white text-black min-h-screen p-8">
      {/* ── Output-only Print Controls ── */}
      <div className="print-controls hide-on-print mb-8 p-4 bg-gray-100 rounded-lg flex justify-between items-center border border-gray-300">
        <div>
          <h2 className="text-xl font-bold m-0 text-black">Master Cheatsheet</h2>
          <p className="text-gray-600 m-0">Print to PDF for best results (A4 size, default margins).</p>
        </div>
        <div className="flex gap-4">
          <button className="action outline" style={{color: 'black', borderColor: 'black'}} onClick={onBack}>
            ← Back to App
          </button>
          <button className="action primary" onClick={() => window.print()}>
            🖨️ Print / Save PDF
          </button>
        </div>
      </div>

      {/* ── Print Content ── */}
      <div className="cheatsheet-content print-target">
        
        {/* Title Page / Header */}
        <div className="cs-header border-b-2 border-black pb-4 mb-6">
          <h1 className="text-4xl font-black uppercase m-0">IFT 211</h1>
          <h2 className="text-2xl font-bold text-gray-700 m-0">Digital Logic & Design Master Cheatsheet</h2>
        </div>

        {/* CSS grid for 2-column layout in print */}
        <div className="cs-grid" style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: "2rem",
          rowGap: "1.5rem"
        }}>
          
          {/* Base Conversions & Numeric */}
          <section className="cs-section break-inside-avoid">
            <h3 className="cs-section-title font-bold text-lg border-b border-gray-400 mb-2">1. Number Systems & Codes</h3>
            <ul className="text-sm list-disc pl-4 m-0 space-y-1">
              <li><strong>Binary to Decimal:</strong> Sum <code>bit_value × 2^position</code>. (e.g., 1011 = 8+0+2+1 = 11)</li>
              <li><strong>Decimal to Binary:</strong> Successive division by 2, read remainders bottom-to-top.</li>
              <li><strong>Hexadecimal:</strong> Base 16 (0-9, A-F). 1 Hex digit = 4 binary bits.</li>
              <li><strong>Octal:</strong> Base 8 (0-7). 1 Octal digit = 3 binary bits.</li>
              <li><strong>BCD (Binary Coded Decimal):</strong> Each decimal digit is represented by a 4-bit binary group. (e.g., 45 = 0100 0101)</li>
              <li><strong>Gray Code:</strong> Only one bit changes state between successive values. Used in K-Maps and absolute encoders.</li>
            </ul>
          </section>

          {/* Signed Arithmetic */}
          <section className="cs-section break-inside-avoid">
            <h3 className="cs-section-title font-bold text-lg border-b border-gray-400 mb-2">2. Signed Binary Arithmethic</h3>
            <ul className="text-sm list-disc pl-4 m-0 space-y-1">
              <li><strong>1's Complement:</strong> Invert all bits (0→1, 1→0). Two zeros (+0, -0).</li>
              <li><strong>2's Complement:</strong> Invert all bits and add 1. Range: -(2^(n-1)) to (2^(n-1) - 1).</li>
              <li><strong>Sign Bit:</strong> MSB = 0 (+), 1 (-).</li>
              <li><strong>Overflow Rule:</strong> Occurs when adding two numbers of the SAME sign yields a result of the OPPOSITE sign.</li>
            </ul>
          </section>

          {/* Logic Gates */}
          <section className="cs-section break-inside-avoid">
            <h3 className="cs-section-title font-bold text-lg border-b border-gray-400 mb-2">3. Logic Gates</h3>
            <table className="w-full text-sm border-collapse border border-gray-300 mt-2 text-center table-fixed">
              <thead><tr className="bg-gray-100"><th className="border p-1">Gate</th><th className="border p-1">Truth (A,B→Y)</th><th className="border p-1">Expression</th></tr></thead>
              <tbody>
                <tr><td className="border font-bold">AND</td><td className="border">High only if ALL High</td><td className="border">Y = A·B</td></tr>
                <tr><td className="border font-bold">OR</td><td className="border">High if ANY High</td><td className="border">Y = A+B</td></tr>
                <tr><td className="border font-bold">NOT</td><td className="border">Inverts input</td><td className="border">Y = A'</td></tr>
                <tr><td className="border font-bold">NAND</td><td className="border">Low only if ALL High</td><td className="border">Y = (A·B)'</td></tr>
                <tr><td className="border font-bold">NOR</td><td className="border">Low if ANY High</td><td className="border">Y = (A+B)'</td></tr>
                <tr><td className="border font-bold">XOR</td><td className="border">High if ODD Highs</td><td className="border">Y = A⊕B</td></tr>
                <tr><td className="border font-bold">XNOR</td><td className="border">High if EVEN Highs</td><td className="border">Y = (A⊕B)'</td></tr>
              </tbody>
            </table>
          </section>

          {/* Boolean Algebra Laws */}
          <section className="cs-section break-inside-avoid">
            <h3 className="cs-section-title font-bold text-lg border-b border-gray-400 mb-2">4. Boolean Algebra</h3>
            <div className="text-sm grid grid-cols-2 gap-2">
              <div>
                <strong>Basic Rules:</strong><br/>
                A+0=A, A+1=1<br/>
                A·0=0, A·1=A<br/>
                A+A=A, A·A=A<br/>
                A+A'=1, A·A'=0
              </div>
              <div>
                <strong>DeMorgan's:</strong><br/>
                (A+B)' = A'·B'<br/>
                (A·B)' = A'+B'<br/>
                <em>"Break the line, change the sign."</em>
              </div>
            </div>
          </section>

          {/* SOP, POS & K-Maps */}
          <section className="cs-section break-inside-avoid">
            <h3 className="cs-section-title font-bold text-lg border-b border-gray-400 mb-2">5. SOP, POS & K-Maps</h3>
            <ul className="text-sm list-disc pl-4 m-0 space-y-1">
              <li><strong>Sum of Products (SOP):</strong> Minterms (Output=1). Grouped by OR-ing AND terms. E.g., A'B + AB'</li>
              <li><strong>Product of Sums (POS):</strong> Maxterms (Output=0). Grouped by AND-ing OR terms. E.g., (A+B')(A'+B)</li>
              <li><strong>K-Map Grouping:</strong> Group contiguous 1s (or 0s for POS) in powers of 2 (1, 2, 4, 8, 16). Larger groups = simpler terms. Edges wrap around.</li>
              <li><strong>Don't Cares (X):</strong> Optional 1s or 0s grouped only if they help make a larger overall group.</li>
            </ul>
          </section>

          {/* Combinational Logic */}
          <section className="cs-section break-inside-avoid">
            <h3 className="cs-section-title font-bold text-lg border-b border-gray-400 mb-2">6. Combinational Logic</h3>
            <ul className="text-sm list-disc pl-4 m-0 space-y-1">
              <li><strong>Half Adder:</strong> Adds 2 bits. SUM = A⊕B, CARRY = A·B</li>
              <li><strong>Full Adder:</strong> Adds 3 bits (A,B,Cin). SUM = A⊕B⊕Cin, CARRY = AB + Cin(A⊕B)</li>
              <li><strong>Multiplexer (MUX):</strong> 2^n inputs → 1 output based on n select lines. Universal form of logic implementation.</li>
              <li><strong>Decoder:</strong> n inputs → 2^n outputs. Only one output active. Used in memory addressing.</li>
              <li><strong>Encoder:</strong> 2^n inputs → n outputs. Priority encoder gives highest-order active input.</li>
            </ul>
          </section>

          {/* Sequential Logic */}
          <section className="cs-section break-inside-avoid">
            <h3 className="cs-section-title font-bold text-lg border-b border-gray-400 mb-2">7. Memory & Sequential Logic</h3>
            <ul className="text-sm list-disc pl-4 m-0 space-y-1">
              <li><strong>SR Latch:</strong> S=Set(1), R=Reset(0). SR=11 is invalid for NOR latch.</li>
              <li><strong>D Latch/Flip-Flop:</strong> Output Q tracks D input when clock edge occurs (Data flip-flop). Avoids indeterminate states.</li>
              <li><strong>JK Flip-Flop:</strong> Universal F-F. J=1/K=0 (Set), J=0/K=1 (Reset), J=1/K=1 (Toggle output).</li>
              <li><strong>T Flip-Flop:</strong> T=1 (Toggle), T=0 (Hold). Built by tying J and K together. Key for counters.</li>
              <li><strong>Moore Machine:</strong> Outputs depend ONLY on current state. Slower to react, safer.</li>
              <li><strong>Mealy Machine:</strong> Outputs depend on current state AND inputs. Faster, fewer states.</li>
            </ul>
          </section>

          {/* Memory Hierarchy */}
          <section className="cs-section break-inside-avoid">
            <h3 className="cs-section-title font-bold text-lg border-b border-gray-400 mb-2">8. Memory Hierarchy & Capacity</h3>
            <ul className="text-sm list-disc pl-4 m-0 space-y-1">
              <li><strong>Capacity Equation:</strong> Total Bits = 2^k × W. (k = # address lines, W = word length in bits).</li>
              <li><strong>SRAM:</strong> Flip-flop based (6 transistors). Very fast, low density, high power. (Used for Cache L1/L2)</li>
              <li><strong>DRAM:</strong> Capacitor based (1 transistor + 1 capacitor). Slower, high density, requires periodic refresh. (Main Memory RAM)</li>
              <li><strong>ROM Types:</strong> ROM (Mask programmed), PROM (Fuse link, OTP), EPROM (UV erasable), EEPROM (Electrically erasable byte-by-byte), Flash (Block erasable).</li>
            </ul>
          </section>
          
           {/* Communication Protocols */}
           <section className="cs-section break-inside-avoid mt-2">
            <h3 className="cs-section-title font-bold text-lg border-b border-gray-400 mb-2">9. Serial Protocols</h3>
            <ul className="text-sm list-disc pl-4 m-0 space-y-1">
              <li><strong>UART:</strong> Asynchronous. Tx→Rx, Rx→Tx. Start bit(0), 5-8 data bits, Parity(opt), Stop bit(1). Devices MUST agree on Baud Rate.</li>
              <li><strong>SPI:</strong> Synchronous, Full-Duplex. Master-Slave. 4 wires: SCLK, MOSI, MISO, SS/CS. Very fast.</li>
              <li><strong>I2C:</strong> Synchronous, Half-Duplex. Multi-master multi-slave. 2 wires: SDA (data), SCL (clock). Address based + ACK/NACK.</li>
            </ul>
          </section>

        </div>
        
        <div className="mt-8 text-center text-xs text-gray-500 italic border-t border-gray-300 pt-2">
          Generated via IFT 211 Study Hub · Built by Jesutobi-001
        </div>

      </div>
    </div>
  );
}
