import Term from "./Term";

const PAGES = {
  lec1: {
    tag: "Lecture 1",
    title: "DIGITAL FOUNDATIONS",
    subtitle:
      "Analog/digital representation, waveform vocabulary, and timing relationships.",
    body: (
      <>
        <div className="split">
          <article className="content-block">
            <h4>Analog and Digital</h4>
            <p>
              Real-world quantities are{" "}
              <Term
                label="analog"
                tip="Continuous values with infinitely many values between two points."
              />
              . Digital systems convert them into sampled, finite-precision values.
            </p>
            <p>
              Material flow: sensor signal, signal conditioning, and analog-to-digital
              conversion.
            </p>
            <div className="info-box info">
              Digital representation improves processing robustness but adds ADC
              complexity and sampling tradeoffs.
            </div>
          </article>
          <article className="content-block">
            <h4>Signal Types</h4>
            <ul>
              <li>Rising edge: transition from 0 to 1.</li>
              <li>Falling edge: transition from 1 to 0.</li>
              <li>Positive-going pulse: idle LOW, briefly HIGH.</li>
              <li>Negative-going pulse: idle HIGH, briefly LOW.</li>
              <li>Pulse trains can be periodic or non-periodic.</li>
            </ul>
          </article>
        </div>

        <article className="content-block">
          <h4>Frequency and Duty Cycle</h4>
          <div className="formula">f = 1 / T</div>
          <div className="formula">Duty Cycle = (t_w / T) * 100%</div>
          <p>
            PWM keeps frequency fixed while varying duty cycle to control average
            power in motors, LEDs, and related loads.
          </p>
        </article>
      </>
    ),
  },
  "note1-core": {
    tag: "Combinational Note One",
    title: "COMBINATIONAL CORE",
    subtitle:
      "Definition of combinational circuits and core representation methods.",
    body: (
      <>
        <article className="content-block">
          <h4>Definition</h4>
          <p>
            A combinational logic circuit is{" "}
            <Term
              label="memoryless"
              tip="Output depends only on current inputs, not previous state."
            />
            : output at any instant depends only on current input combination.
          </p>
          <p>
            This contrasts with sequential circuits, which depend on present inputs
            and prior state.
          </p>
        </article>

        <div className="split">
          <article className="content-block">
            <h4>Three Representation Methods</h4>
            <ul>
              <li>Boolean algebra expressions</li>
              <li>Truth tables</li>
              <li>Logic diagrams</li>
            </ul>
          </article>
          <article className="content-block">
            <h4>Common Combinational Classes</h4>
            <ul>
              <li>Multiplexers and demultiplexers</li>
              <li>Encoders and decoders</li>
              <li>Half adders and full adders</li>
            </ul>
          </article>
        </div>

        <article className="content-block">
          <h4>Universal Gates</h4>
          <p>
            The note explicitly states that NAND-only or NOR-only implementations
            can realize any combinational function.
          </p>
        </article>
      </>
    ),
  },
  lec2: {
    tag: "Lecture 2",
    title: "NUMBER SYSTEMS",
    subtitle:
      "Understanding binary, decimal, hexadecimal, and counting sequences like Gray Code.",
    body: (
      <>
        <article className="content-block">
          <h4>Introduction to Numbering Systems</h4>
          <p>
            Computers remember numbers using transistors acting as switches with only two positions: on (1) or off (0).
            A single transistor stores one bit (binary digit). For larger values, these bits are grouped together.
          </p>
          <div className="info-box info">
            <strong>Bit:</strong> A single 0 or 1.<br/>
            <strong>Nibble:</strong> A 4-bit binary number (e.g., 1010).<br/>
            <strong>Byte:</strong> An 8-bit binary number (e.g., 10100101).<br/>
            <strong>Word / Double Word:</strong> 16-bit and 32-bit numbers respectively.
          </div>
        </article>

        <div className="split">
          <article className="content-block">
            <h4>Counting in Binary</h4>
            <p>
              When counting in base-2 (binary), we only have symbols 0 and 1. We increment the next place value earlier than in base-10.
            </p>
            <ul>
              <li>0</li>
              <li>1</li>
              <li>10 (Another digit added)</li>
              <li>11</li>
              <li>100 (Another digit added)</li>
            </ul>
            <p>
              With <Term label="n bits" tip="The number of available binary positions" />, there are <strong>2^n</strong> possible combinations.
              For example, 4 bits yield 16 different values (0 to 15).
            </p>
          </article>

          <article className="content-block">
            <h4>Binary to Decimal Conversion</h4>
            <p>
              Each bit represents a successive power of two. The rightmost bit is the <strong>LSB (Least Significant Bit)</strong> (2^0 = 1).
            </p>
            <div className="formula">
              10110100₂ = (1×2⁷) + (1×2⁵) + (1×2⁴) + (1×2²)
            </div>
            <p>
              128 + 32 + 16 + 4 = <strong>180₁₀</strong>
            </p>
          </article>
        </div>

        <article className="content-block">
          <h4>Converting Decimal to Binary/Hex</h4>
          <p>
            To convert <Term label="Decimal to Binary" tip="Base 10 to Base 2" />, repeatedly divide the decimal integer by 2. The remainder becomes the binary digit, building from LSB to MSB.
          </p>
          <p>
            To convert to <strong>Hexadecimal</strong>, divide by 16 instead, or group binary digits into chunks of 4 bits (Nibbles). Each 4-bit chunk corresponds to one Hex digit (0-9, A-F).
          </p>
          <div className="formula">Example: 0001 0110 1010 0111 = 1 6 A 7₁₆</div>
        </article>
        
        <article className="content-block">
          <h4>Gray Code</h4>
          <p>
            Standard binary counting can cause physical sensor errors during transitions (e.g. 011 to 100 changes 3 bits at once).
            <Term label="Gray Code" tip="Alternate counting sequence where only one bit changes at a time." /> solves this.
          </p>
          <ul>
            <li><strong>Algorithm:</strong> Add a 0 to the start of the binary value.</li>
            <li>Compare adjacent bits moving right.</li>
            <li>If they are the same, write a 0. If different, write a 1.</li>
          </ul>
        </article>
      </>
    ),
  },
  "note1-mux": {
    tag: "Combinational Note One",
    title: "MULTIPLEXER LOGIC",
    subtitle:
      "Selection circuits that route one of many inputs to one output line.",
    body: (
      <>
        <article className="content-block">
          <h4>Multiplexer Role</h4>
          <p>
            A MUX selects one data line from several input channels and forwards it
            to a common output. Select lines determine the active channel.
          </p>
          <p>
            With n select lines, one of 2^n inputs can be chosen at a given instant.
          </p>
        </article>

        <div className="split">
          <article className="content-block">
            <h4>2-to-1 Truth Behavior</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>S</th>
                  <th>I0</th>
                  <th>I1</th>
                  <th>Q</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0</td>
                  <td>1</td>
                  <td>0</td>
                  <td>1</td>
                </tr>
                <tr>
                  <td>0</td>
                  <td>0</td>
                  <td>1</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>1</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>0</td>
                  <td>1</td>
                  <td>1</td>
                </tr>
              </tbody>
            </table>
            <div className="formula">Q = (NOT S AND I0) OR (S AND I1)</div>
          </article>

          <article className="content-block">
            <h4>4-to-1 Selection Pattern</h4>
            <ul>
              <li>AB = 00 {"=>"} I0</li>
              <li>AB = 01 {"=>"} I1</li>
              <li>AB = 10 {"=>"} I2</li>
              <li>AB = 11 {"=>"} I3</li>
            </ul>
            <div className="info-box ok">
              Larger multiplexers can be composed from smaller 2-to-1 stages.
            </div>
          </article>
        </div>
      </>
    ),
  },
  "note2-encoder": {
    tag: "Combinational Note Two",
    title: "PRIORITY ENCODER",
    subtitle:
      "Resolving simultaneous active inputs through fixed priority ordering.",
    body: (
      <>
        <article className="content-block">
          <h4>Why Priority Matters</h4>
          <p>
            Standard encoders can produce ambiguous output when multiple inputs are
            active. Priority encoders remove this ambiguity by selecting only the
            highest-priority active input.
          </p>
        </article>
        <article className="content-block">
          <h4>8-to-3 Behavior</h4>
          <p>
            If D2, D3, and D5 are high at once, the output represents D5 because it
            has higher priority.
          </p>
          <div className="formula">Q2 = D4 + D5 + D6 + D7</div>
          <div className="info-box warn">
            Lower-priority active lines become don't-care when a higher one is present.
          </div>
        </article>
        <article className="content-block">
          <h4>Application</h4>
          <p>
            Keyboard encoding and related interfaces use this strategy to reduce many
            physical lines into compact binary-coded output.
          </p>
        </article>
      </>
    ),
  },
  "note2-decoder": {
    tag: "Combinational Note Two",
    title: "BINARY DECODER",
    subtitle: "Inverse mapping from binary input to one active output.",
    body: (
      <>
        <div className="split">
          <article className="content-block">
            <h4>2-to-4 Active-High Example</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>A</th>
                  <th>B</th>
                  <th>Q0</th>
                  <th>Q1</th>
                  <th>Q2</th>
                  <th>Q3</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>0</td>
                  <td>0</td>
                  <td>1</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>0</td>
                  <td>1</td>
                  <td>0</td>
                  <td>1</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>1</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>1</td>
                  <td>1</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                  <td>1</td>
                </tr>
              </tbody>
            </table>
          </article>
          <article className="content-block">
            <h4>Enable and IC Context</h4>
            <p>
              Decoder enable pins turn decoding on or off globally and are used for
              cascading devices into larger decode spaces.
            </p>
            <p>
              NAND-based decoders are common because active-low implementation is
              transistor-efficient in integrated circuits.
            </p>
          </article>
        </div>
        <article className="content-block">
          <h4>Address Decoding</h4>
          <p>
            Decoders drive memory chip-select lines so only one chip is active at any
            instant, preventing data-bus contention.
          </p>
        </article>
      </>
    ),
  },
  "note2-adder": {
    tag: "Combinational Note Two",
    title: "BINARY ADDERS",
    subtitle:
      "Half adder, full adder, carry propagation limits, and carry look-ahead.",
    body: (
      <>
        <div className="split">
          <article className="content-block">
            <h4>Half Adder</h4>
            <div className="formula">SUM = A XOR B</div>
            <div className="formula">CARRY = A AND B</div>
            <p>No carry-in input is available, so direct multi-bit chaining is limited.</p>
          </article>
          <article className="content-block">
            <h4>Full Adder</h4>
            <div className="formula">SUM = (A XOR B) XOR Cin</div>
            <div className="formula">Cout = AB + Cin(A XOR B)</div>
            <p>Adds A, B, and incoming carry to support chained arithmetic.</p>
          </article>
        </div>
        <article className="content-block">
          <h4>Ripple Carry vs CLA</h4>
          <p>
            Ripple carry delay scales with bit width because each stage waits for prior
            carry. CLA computes carries with generate/propagate relations to reduce
            delay growth.
          </p>
          <div className="formula">Gi = AiBi, Pi = Ai XOR Bi, Ci+1 = Gi + PiCi</div>
        </article>
      </>
    ),
  },
  lec3: {
    tag: "Lecture 3",
    title: "BINARY MATH & SIGNED REPRESENTATIONS",
    subtitle: "Binary addition, two's complement, sign extension, carry vs overflow, and character storage.",
    body: (
      <>
        <div className="split">
          <article className="content-block">
            <h4>Binary & Hexadecimal Addition</h4>
            <p>
              Addition in binary operates bit-by-bit from the LSB. Carries propagate leftward when a sum reaches 2 (10 in binary).
            </p>
            <div className="formula">
              0000 0100 (4) + 0000 0111 (7) = 0000 1011 (11)
            </div>
            <p>
              For hexadecimal, if the sum exceeds 15, divide by 16. The quotient is the carry, the remainder is the sum digit (e.g., A + 5 = 15 = F).
            </p>
          </article>

          <article className="content-block">
            <h4>Two's Complement</h4>
            <p>
              The standard for signed integers. The MSB (Most Significant Bit) serves as a negative weight (e.g., -128 for an 8-bit number).
            </p>
            <ol>
              <li>Invert all bits (1's complement).</li>
              <li>Add 1.</li>
            </ol>
            <div className="info-box info">Shortcut: Scanning from the right (LSB), leave bits unchanged until the first 1. Keep that 1, then invert all remaining bits to the left.</div>
          </article>
        </div>

        <div className="split">
          <article className="content-block">
            <h4>Sign Extension & Subtraction</h4>
            <p>
              <strong>Sign Extension:</strong> To widen a signed number's bit-width, replicate the MSB (sign bit) into all new higher positions.
              <ul>
                <li>+98: 01100010 {"=>"} <strong>00000000</strong> 01100010</li>
                <li>-77: 10110011 {"=>"} <strong>11111111</strong> 10110011</li>
              </ul>
            </p>
            <p>
              <strong>Subtraction (A - B):</strong> Convert B to its 2's complement (-B) and add it to A. Discard any final carry.
            </p>
          </article>

          <article className="content-block">
            <h4>Carry vs Overflow</h4>
            <ul>
              <li><strong>Carry:</strong> Unsigned result out of range (e.g., {"<"} 0 or {">"} max value).</li>
              <li><strong>Overflow:</strong> Signed result out of range. Occurs when two identical signs are added but produce a sum of the opposite sign.</li>
            </ul>
          </article>
        </div>

        <article className="content-block">
          <h4>Character Storage</h4>
          <p>
            Text relies on mapping binary sequences to characters:
            <ul>
              <li><strong>Standard ASCII:</strong> 7-bit codes (0-127). Example: 'A' = 41₁₆ = 65₁₀, Space = 20₁₆ = 32₁₀.</li>
              <li><strong>Extended ASCII:</strong> 8-bit codes (0-255).</li>
              <li><strong>Unicode / UTF-8:</strong> Up to 16-bit or variable length encoding. Null (00₁₆) terminates C-strings.</li>
            </ul>
          </p>
        </article>
      </>
    ),
  },
  lec4: {
    tag: "Lecture 4",
    title: "LOGIC GATES",
    subtitle: "NOT, AND, OR, XOR gates; truth tables; derived gates; and combinational logic.",
    body: (
      <>
        <div className="split">
          <article className="content-block">
            <h4>Basic Gates & Behavior</h4>
            <ul>
              <li><strong>NOT (Inverter):</strong> Flips 1 to 0, 0 to 1. Triangle symbol with a circle at the tip.</li>
              <li><strong>AND:</strong> Output is 1 <em>ONLY IF ALL</em> inputs are 1. Like switches in series.</li>
              <li><strong>OR:</strong> Output is 1 <em>IF ANY</em> input is 1. Like switches in parallel.</li>
              <li><strong>XOR (Exclusive-OR):</strong> Parity checker. Output is 1 if there's an <em>ODD count of ones</em> at the input. Used heavily in error checking.</li>
            </ul>
          </article>
          <article className="content-block">
            <h4>Derived Universal Gates</h4>
            <ul>
              <li><strong>NAND:</strong> AND gate with an inverted output. Universal gate—any circuit can be built from NANDs alone. Fastest transistor circuits.</li>
              <li><strong>NOR:</strong> OR gate with an inverted output. Also universal. Output is 1 only if all inputs are 0.</li>
              <li><strong>XNOR:</strong> XOR gate with inverted output. Output is 1 for an EVEN count of ones.</li>
            </ul>
            <div className="info-box ok">Inverted inputs/outputs on schematic diagrams are represented by small circles (bubbles).</div>
          </article>
        </div>
        
        <article className="content-block">
          <h4>Truth Tables</h4>
          <p>A truth table lists all possible patterns of 0s and 1s for the inputs. For <em>n</em> inputs there are exactly <strong>2ⁿ</strong> rows.</p>
          <table className="table">
            <thead><tr><th>A</th><th>B</th><th>AND</th><th>OR</th><th>XOR</th><th>NAND</th></tr></thead>
            <tbody>
              <tr><td>0</td><td>0</td><td>0</td><td>0</td><td>0</td><td>1</td></tr>
              <tr><td>0</td><td>1</td><td>0</td><td>1</td><td>1</td><td>1</td></tr>
              <tr><td>1</td><td>0</td><td>0</td><td>1</td><td>1</td><td>1</td></tr>
              <tr><td>1</td><td>1</td><td>1</td><td>1</td><td>0</td><td>0</td></tr>
            </tbody>
          </table>
          <p>
            <strong>Pattern trick:</strong> Fill the rightmost column (LSB) alternating 0, 1, 0, 1... Fill the next column alternating 0, 0, 1, 1... Keep doubling the group size moving left.
          </p>
        </article>

        <article className="content-block">
          <h4>Combinational Logic</h4>
          <p>
            Connects multiple logic gates where outputs of some feed into others. The output at any instant depends <em>only</em> on the current inputs (no memory).
          </p>
          <p>
            To evaluate a complex circuit, create intermediate columns in your truth table for each gate. Trace the signals left-to-right until reaching the final output expression.
          </p>
        </article>
      </>
    ),
  },
  lec5: {
    tag: "Lecture 5",
    title: "BOOLEAN ALGEBRA",
    subtitle: "Laws, rules for AND/OR/NOT/XOR, simplification, and DeMorgan's Theorem.",
    body: (
      <>
        <div className="split">
          <article className="content-block">
            <h4>Fundamental Laws</h4>
            <p><strong>Commutative:</strong> A+B = B+A, A·B = B·A. The order of operands doesn't matter.</p>
            <p><strong>Associative:</strong> A+(B+C) = (A+B)+C, A·(B·C) = (A·B)·C. Grouping three or more operations doesn't change the output.</p>
            <p><strong>Distributive:</strong> A·(B+C) = A·B + A·C. An AND operation distributes across an OR operation (FOIL can be used for multi-terms).</p>
          </article>
          
          <article className="content-block">
            <h4>Precedence</h4>
            <p>Similar to mathematical operations, Boolean Algebra has an order of precedence:</p>
            <ol>
              <li>Parentheses `()` override everything.</li>
              <li>`NOT` (Bars spanning multiple terms act like parentheses).</li>
              <li>`AND` takes precedence over `OR`.</li>
              <li>`OR` operations.</li>
            </ol>
            <div className="info-box warn">A·B is NOT the same as A(inverted)·B(inverted). The first evaluates AND then `NOT`. The second evaluates `NOT` on each term, then ANDs.</div>
          </article>
        </div>

        <article className="content-block">
          <h4>Single-Variable Rules</h4>
          <table className="table">
            <thead>
              <tr><th>OR Rules</th><th>AND Rules</th><th>XOR Rules</th><th>NOT Rules</th></tr>
            </thead>
            <tbody>
              <tr><td>A + 0 = A</td><td>A · 0 = 0</td><td>A ⊕ 0 = A</td><td>A(dbl bar) = A</td></tr>
              <tr><td>A + 1 = 1</td><td>A · 1 = A</td><td>A ⊕ 1 = A(inv)</td><td>-</td></tr>
              <tr><td>A + A = A</td><td>A · A = A</td><td>A ⊕ A = 0</td><td>-</td></tr>
              <tr><td>A + A(inv) = 1</td><td>A · A(inv) = 0</td><td>A ⊕ A(inv) = 1</td><td>-</td></tr>
            </tbody>
          </table>
          <p>
            <strong>Complex Simplification Rules:</strong><br/>
            A + A·B = A (Since A·B is redundant if A is already true).<br/>
            A + A(inv)·B = A + B.<br/>
          </p>
        </article>

        <article className="content-block">
          <h4>DeMorgan's Theorem</h4>
          <p>Allows us to distribute an inverter from the output of an AND or OR gate to its inputs, which switches the gate type.</p>
          <div className="formula">NOT(A · B) = A(inv) + B(inv)</div>
          <div className="formula">NOT(A + B) = A(inv) · B(inv)</div>
          <p>
            <strong>Usage:</strong> Convert NAND/NOR expressions back to AND/OR or to simplify SOP/POS circuits. Apply reverse precedence when distributing the bar over a complex equation.
          </p>
        </article>
      </>
    ),
  },
  lec6: {
    tag: "Lecture 6",
    title: "SOP & POS FORMATS",
    subtitle: "Sum-of-Products, Product-of-Sums, standard Boolean forms, and truth-table conversions.",
    body: (
      <>
        <article className="content-block">
          <h4>Standard Representations</h4>
          <p>Standardizing circuitry enables off-the-shelf components and programmable hardware to easily accommodate any digital logic structure. Both SOP and POS represent the <strong>fastest possible digital circuitry</strong> because all signals pass through exactly two layers of logic gates (not counting initial inverters).</p>
        </article>

        <div className="split">
          <article className="content-block">
            <h4>Sum-of-Products (SOP)</h4>
            <p>One OR gate collecting outputs of multiple AND gates. E.g., X = A(inv)·B·C(inv) + A·B(inv) + A·B·C(inv)</p>
            <ul>
              <li><strong>No parentheses allowed</strong> (adds levels of logic).</li>
              <li><strong>No multi-variable inversions</strong> (adds levels). Apply DeMorgan's to fix them.</li>
            </ul>
            <p><strong>From Truth Table to SOP:</strong></p>
            <ol>
              <li>Identify rows with an output of 1.</li>
              <li>Create an AND term for each row. Invert inputs that are 0.</li>
              <li>OR all product terms together.</li>
            </ol>
          </article>
          
          <article className="content-block">
            <h4>Product-of-Sums (POS)</h4>
            <p>One AND gate collecting outputs of multiple OR gates. E.g., X = (A+B+C)(A+B(inv)+C)(A(inv)+B+C(inv))</p>
            <ul>
              <li><strong>No parentheses inside sum terms</strong>.</li>
              <li><strong>No multi-variable inversions</strong>.</li>
            </ul>
            <p><strong>From Truth Table to POS:</strong></p>
            <ol>
              <li>Identify rows with an output of 0.</li>
              <li>Create an OR sum term for each row. Invert inputs that are 1.</li>
              <li>AND all sum terms together.</li>
            </ol>
            <div className="info-box ok">SOP forms terms when outputs are 1. POS forms terms when outputs are 0.</div>
          </article>
        </div>
      </>
    ),
  },
  note3: {
    tag: "Combinational Note Three",
    title: "SUBTRACTORS, COMPARATORS & DISPLAYS",
    subtitle: "Binary subtractors, digital magnitude comparators, and 7-segment display decoding via BCD.",
    body: (
      <>
        <div className="split">
          <article className="content-block">
            <h4>Binary Subtractors</h4>
            <p>
              Subtraction resembles the opposite of addition but uses a <em>Borrow</em> instead of a carry.
            </p>
            <p><strong>Half Subtractor:</strong> Subtracts two single bits (X - Y). Needs no previous borrow.
            Diff = X XOR Y, BorrowOut = X(inv)·Y. Doesn't support cascading.</p>
            <p><strong>Full Subtractor:</strong> Adds a Borrow-In term. Made of two cascaded Half Subtractors.
            Diff = (X XOR Y) XOR BorrowIn.
            BorrowOut = X(inv)·Y + (X XOR Y)(inv)·BorrowIn.</p>
            <div className="info-box info">Modern systems avoid subtractors and perform X - Y natively using an n-bit adder with Y converted to its 2's complement (Invert all bits of Y and set Adder Carry-In to 1).</div>
          </article>

          <article className="content-block">
            <h4>Digital Comparators</h4>
            <p>Combinational circuits comparing two binary values. Primarily uses Exclusive-NOR (XNOR) for equality checks.</p>
            <ul>
              <li><strong>Identity:</strong> 1 output. Only outputs 1 if A = B.</li>
              <li><strong>Magnitude:</strong> 3 outputs. Evaluates A {">"} B, A = B, or A {"<"} B. e.g. 74LS85</li>
            </ul>
            <p>When comparing larger widths (e.g. 8-bit using 4-bit packages), cascade them from the Most Significant Bits (MSB) to Least Significant point. If MSBs confirm an inequality (e.g. A {">"} B), lower bit comparators are ignored.</p>
          </article>
        </div>

        <article className="content-block">
          <h4>7-Segment Displays & BCD</h4>
          <p>Contains 7 colored LEDs (a, b, c, d, e, f, g) to display characters.</p>
          <ul>
            <li><strong>Common Cathode (CC):</strong> Shared ground. Drive an anode HIGH to turn a segment ON.</li>
            <li><strong>Common Anode (CA):</strong> Shared power (+5V). Drive a cathode LOW to turn a segment ON.</li>
          </ul>
          <p><strong>Binary Coded Decimal (BCD):</strong>
            Encodes each decimal digit natively into a 4-bit binary group (0000 to 1001). Values 1010 to 1111 are outright invalid.
            Instead of routing multiple processor lines to individual LED segments, BCD-to-7-segment decoders (like 74LS47/48) decode 4 pins of BCD directly into the 7 pins required for the visual digit.
          </p>
        </article>
      </>
    ),
  },

  "lec7-kmap": {
    tag: "Lecture 7",
    title: "KARNAUGH MAPS (K-MAPS)",
    subtitle: "A visual graphical method for simplifying Boolean expressions by grouping adjacent minterms.",
    body: (
      <>
        <article className="content-block">
          <h4>Why K-Maps?</h4>
          <p>
            Using algebra rules to simplify Boolean expressions is time-consuming and error-prone for large functions.
            The <strong>Karnaugh Map (K-Map)</strong>
            provides a visual shortcut. By grouping 1s together we can read off the simplified SOP expression directly.
          </p>
          <div className="info-box info">
            K-Maps leverage <strong>Gray Code</strong> ordering for rows and columns — adjacent cells <em>always</em> differ by exactly one bit. This makes simplification as easy as drawing circles.
          </div>
        </article>

        <div className="split">
          <article className="content-block">
            <h4>2-Variable K-Map Structure</h4>
            <p>For inputs A and B (4 minterms, 2×2 grid):</p>
            <table className="table">
              <thead><tr><th>AB →</th><th>00</th><th>01</th><th>11</th><th>10</th></tr></thead>
              <tbody>
                <tr><td><strong>Cell:</strong></td><td>m0</td><td>m1</td><td>m3</td><td>m2</td></tr>
              </tbody>
            </table>
            <p><em>Example:</em> f = Σ(1,2,3) → cells m1, m2, m3 are 1. Group m1+m3 gives B. Group m2+m3 gives A. Simplified: <strong>f = A + B</strong>.</p>
          </article>

          <article className="content-block">
            <h4>Grouping Rules</h4>
            <ul>
              <li>Groups must be sized as a <strong>power of 2</strong>: 1, 2, 4, 8, 16…</li>
              <li>Groups can only wrap around edges (the map is a torus).</li>
              <li>A cell can belong to <strong>multiple groups</strong> (overlapping OK).</li>
              <li>Always form the <strong>largest possible groups first</strong> (fewer product terms).</li>
              <li>Don't-Care (X) cells may be treated as 1 if it enlarges a group.</li>
            </ul>
            <div className="info-box ok">Each doubling of group size removes one variable from the product term.</div>
          </article>
        </div>

        <article className="content-block">
          <h4>3-Variable K-Map (Worked Example)</h4>
          <p>f(A,B,C) = Σ(0,1,2,4,5,6) — shade minterms 0,1,2,4,5,6.</p>
          <table className="table">
            <thead><tr><th>BC → / A ↓</th><th>00</th><th>01</th><th>11</th><th>10</th></tr></thead>
            <tbody>
              <tr><td>A=0</td><td>1(m0)</td><td>1(m1)</td><td>0(m3)</td><td>1(m2)</td></tr>
              <tr><td>A=1</td><td>1(m4)</td><td>1(m5)</td><td>0(m7)</td><td>1(m6)</td></tr>
            </tbody>
          </table>
          <p>
            <strong>Groups found:</strong><br/>
            • All 4 left-column cells (00,01 columns, both rows) → <em>C' eliminates A, B</em> ... gives <strong>B'</strong>? — No: these are columns 00 and 01 → B=0, C varies but both have some 1s... Let's re-read: m0,m1,m4,m5 form a group where <strong>A and C can be anything, B=0</strong> → term = <strong>B'</strong>.<br/>
            • m0,m2,m4,m6 (column 00 and col 10) = C=0 cells → term = <strong>C'</strong>.
          </p>
          <div className="formula">f = B' + C'</div>
        </article>

        <article className="content-block">
          <h4>4-Variable K-Map (Worked Example)</h4>
          <p>f(A,B,C,D) = Σ(0,1,4,5,7,8,9,12,13,15) — 4×4 grid.</p>
          <ul>
            <li><strong>Corner group</strong> {"{"}m0,m1,m4,m5{"}"} + {"{"}m8,m9,m12,m13{"}"} — all 8 cells where B=0 → term = <strong>B'</strong>.</li>
            <li><strong>Right column group</strong> {"{"}m5,m7,m13,m15{"}"} — CD=11 for both rows where D=1 → check: AB=00,01,10,11 but C=D=1 → term = <strong>CD</strong>.</li>
          </ul>
          <div className="formula">f = B' + CD</div>
          <div className="info-box warn">Always verify: substitute each minterm back into your simplified expression and confirm it outputs 1.</div>
        </article>

        <article className="content-block">
          <h4>POS via K-Map (Grouping 0s)</h4>
          <p>
            To derive <strong>Product-of-Sums</strong>, circle the 0s instead of the 1s. Apply the same grouping rules.
            Each group of 0s yields one Sum term. Variable appears <em>complemented</em> if it is 1 in that cell position.
          </p>
          <div className="info-box info">For POS: where the variable is 1 inside the group → write it un-complemented in the sum term. Where it is 0 → write it complemented.</div>
        </article>
      </>
    ),
  },

  "lec8-binops": {
    tag: "Lecture 8",
    title: "BINARY OPERATION APPLICATIONS",
    subtitle: "Real-world applications of binary arithmetic: ALU operations, parity, checksums, and error detection.",
    body: (
      <>
        <article className="content-block">
          <h4>Arithmetic Logic Unit (ALU)</h4>
          <p>
            The ALU is the engine of a CPU. It performs <em>binary arithmetic</em> (ADD, SUB, MUL) and <em>logical operations</em> (AND, OR, NOT, XOR) on register values.
            A selection code (opcode) on the control lines tells the ALU which operation to perform.
          </p>
          <div className="formula">Common n-bit ALU operations: ADD, SUB, AND, OR, XOR, NOT, SHL (shift left), SHR (shift right)</div>
          <p>
            <strong>Arithmetic shifts:</strong> Shift Left by 1 ≡ ×2; Shift Right by 1 ≡ ÷2 (signed — replicate sign bit).
            Logical shifts fill with 0. Useful for fast multiplication and division by powers of 2.
          </p>
        </article>

        <div className="split">
          <article className="content-block">
            <h4>Parity Checking</h4>
            <p>
              Parity adds one bit to a data word so the total number of 1s satisfies a rule:
            </p>
            <ul>
              <li><strong>Even parity:</strong> Total 1-count is always even. Parity bit = XOR of all data bits.</li>
              <li><strong>Odd parity:</strong> Total 1-count is always odd.</li>
            </ul>
            <p><em>Example:</em> Data = 1011001 (four 1s, even). Even parity bit = 0. Transmitted: 1011001<strong>0</strong>. If any single bit flips, the receiver detects the error.</p>
            <div className="info-box warn">Parity can detect an odd number of bit errors but cannot correct errors or detect even-count errors.</div>
          </article>

          <article className="content-block">
            <h4>Checksum & Cyclic Redundancy Check (CRC)</h4>
            <p>
              <strong>Checksum:</strong> Sum all data bytes, discard overflow, transmit the sum. Receiver recalculates; a mismatch flags corruption.
            </p>
            <p>
              <strong>CRC (Cyclic Redundancy Check):</strong> Divides the message (treated as a polynomial) by a generator polynomial using XOR-based long division. The remainder is appended as the CRC value. Receiver repeats the division — a non-zero remainder signals an error. CRCs can detect burst errors.
            </p>
          </article>
        </div>

        <article className="content-block">
          <h4>Bit Masking Operations</h4>
          <p>
            Bitwise operations let software manipulate individual bits within a register or byte:
          </p>
          <table className="table">
            <thead><tr><th>Operation</th><th>Effect</th><th>Example</th></tr></thead>
            <tbody>
              <tr><td>AND with mask</td><td>Clear (zero out) specific bits</td><td>0b10110011 AND 0b00001111 = 0b00000011</td></tr>
              <tr><td>OR with mask</td><td>Set (force to 1) specific bits</td><td>0b10110011 OR 0b11000000 = 0b11110011</td></tr>
              <tr><td>XOR with mask</td><td>Toggle specific bits</td><td>0b10110011 XOR 0b00111100 = 0b10001111</td></tr>
              <tr><td>NOT</td><td>Invert all bits</td><td>NOT 0b10110011 = 0b01001100</td></tr>
            </tbody>
          </table>
        </article>
      </>
    ),
  },

  "lec10-mem": {
    tag: "Lecture 10",
    title: "MEMORY CELLS & FLIP-FLOPS",
    subtitle: "SR Latch, D, JK, and T flip-flops — the elementary 1-bit memory building blocks of digital systems.",
    body: (
      <>
        <article className="content-block">
          <h4>Why Sequential Circuits Need Memory</h4>
          <p>
            Combinational logic outputs depend <em>only on current inputs</em>. Sequential circuits add <strong>state</strong> (memory) — the output also depends on the history of past inputs. This enables counters, registers, state machines, and RAM cells.
          </p>
          <p>
            <strong>Latches</strong>: level-triggered (output can change while enable is HIGH).<br/>
            <strong>Flip-flops</strong>: edge-triggered (output only changes at a clock edge — rising or falling).
          </p>
        </article>

        <div className="split">
          <article className="content-block">
            <h4>SR Latch (Set-Reset)</h4>
            <p>Built from cross-coupled NAND or NOR gates.</p>
            <table className="table">
              <thead><tr><th>S</th><th>R</th><th>Q (next)</th><th>State</th></tr></thead>
              <tbody>
                <tr><td>0</td><td>0</td><td>Q (hold)</td><td>Memory</td></tr>
                <tr><td>1</td><td>0</td><td>1</td><td>Set</td></tr>
                <tr><td>0</td><td>1</td><td>0</td><td>Reset</td></tr>
                <tr><td>1</td><td>1</td><td>INVALID</td><td>Forbidden!</td></tr>
              </tbody>
            </table>
            <div className="info-box warn">S=R=1 simultaneously is forbidden — both outputs become 1, violating Q ≠ Q(inv).</div>
          </article>

          <article className="content-block">
            <h4>D Flip-Flop (Data / Delay)</h4>
            <p>
              Captures D at the rising clock edge; holds it until the next rising edge.
              Eliminates the SR forbidden state by tying R = NOT(S).
            </p>
            <div className="formula">Q(next) = D (sampled at clock ↑)</div>
            <p>
              <strong>Used for:</strong> Registers, pipeline stages, synchronizers.
            </p>
            <p>
              <em>Example:</em> If D = 1 just before the clock rises, then Q → 1 and remains 1 regardless of D changing afterwards until the next clock edge.
            </p>
          </article>
        </div>

        <div className="split">
          <article className="content-block">
            <h4>JK Flip-Flop</h4>
            <p>
              Extends the SR flip-flop by defining behavior for J=K=1: the output <strong>toggles</strong>.
            </p>
            <table className="table">
              <thead><tr><th>J</th><th>K</th><th>Q (next)</th></tr></thead>
              <tbody>
                <tr><td>0</td><td>0</td><td>Q (no change)</td></tr>
                <tr><td>1</td><td>0</td><td>1 (Set)</td></tr>
                <tr><td>0</td><td>1</td><td>0 (Reset)</td></tr>
                <tr><td>1</td><td>1</td><td>Q(inv) (Toggle)</td></tr>
              </tbody>
            </table>
            <div className="formula">Q(next) = J·Q(inv) + K(inv)·Q</div>
          </article>

          <article className="content-block">
            <h4>T Flip-Flop (Toggle)</h4>
            <p>
              A simplified JK with J=K=T. When T=1, output toggles on each clock edge.
              Used in <strong>binary counters</strong> — each FF divides clock frequency by 2.
            </p>
            <div className="formula">Q(next) = T XOR Q</div>
            <p>
              <em>Example:</em> A 3-bit ripple counter uses 3 T-FFs (all T=1). It counts: 000 → 001 → 010 → 011 → 100 → 101 → 110 → 111 → 000...
            </p>
            <div className="info-box ok">Master-Slave D flip-flops are made of two D latches in series, preventing output glitches during clock transitions.</div>
          </article>
        </div>

        <article className="content-block">
          <h4>SRAM vs. DRAM Memory Cells</h4>
          <p>
            <strong>SRAM (Static RAM):</strong> Uses 6 transistors arranged as a cross-coupled inverter pair (a bistable latch). Holds its value as long as power is on. <em>Does not need refreshing</em>. Fast but expensive — used in CPU cache.
          </p>
          <p>
            <strong>DRAM (Dynamic RAM):</strong> Uses just 1 transistor + 1 capacitor. Stores charge on a capacitor to represent a 1. Charge leaks, so cells must be <em>refreshed</em> every ~64 ms. Slower but very dense and cheap — used for main system RAM.
          </p>
        </article>
      </>
    ),
  },

  "lec11-fsm": {
    tag: "Lecture 11",
    title: "STATE MACHINES",
    subtitle: "Finite State Machines (FSMs): Moore and Mealy models, state diagrams, state tables, and counter design.",
    body: (
      <>
        <article className="content-block">
          <h4>What Is a Finite State Machine?</h4>
          <p>
            A <strong>Finite State Machine (FSM)</strong> consists of:
          </p>
          <ul>
            <li>A finite set of <strong>states</strong> (stored in flip-flops).</li>
            <li><strong>Inputs</strong> that trigger transitions.</li>
            <li>A <strong>Next-State logic</strong> (combinational) that computes the next state.</li>
            <li><strong>Output logic</strong> that produces outputs from state (and optionally inputs).</li>
          </ul>
          <div className="formula">FSM = Flip-Flops (state memory) + Combinational Logic (next-state & output)</div>
        </article>

        <div className="split">
          <article className="content-block">
            <h4>Moore Machine</h4>
            <p>
              Outputs depend <em>only on the current state</em> (not inputs). Outputs change synchronously — stable and glitch-free.
            </p>
            <ul>
              <li>Output is labelled inside each state bubble.</li>
              <li>May require more states for the same function.</li>
              <li>Preferred when stable, predictable outputs are critical.</li>
            </ul>
            <p><em>Example: Traffic light controller.</em> Each colour (Red, Green, Yellow) is a state with a fixed output pattern.</p>
          </article>

          <article className="content-block">
            <h4>Mealy Machine</h4>
            <p>
              Outputs depend on <em>both current state AND current input</em>. Response is immediate — one clock cycle faster than Moore.
            </p>
            <ul>
              <li>Output is labelled on the transition arcs.</li>
              <li>Fewer states needed for the same logic.</li>
              <li>Can exhibit glitches if inputs change asynchronously.</li>
            </ul>
            <p><em>Example: Sequence detector.</em> Output goes HIGH immediately when the last input completes the pattern "1011".</p>
          </article>
        </div>

        <article className="content-block">
          <h4>FSM Design Procedure (Step-by-Step)</h4>
          <ol>
            <li><strong>Understand the problem</strong> — identify inputs, outputs, and behaviours.</li>
            <li><strong>Draw a state diagram</strong> — circles = states, arrows = transitions labelled with input/output.</li>
            <li><strong>Create a state table</strong> — current state, input combinations, next state, output.</li>
            <li><strong>Assign binary codes</strong> to states.</li>
            <li><strong>Choose flip-flop type</strong> (D, JK, T) and derive excitation equations using K-Maps.</li>
            <li><strong>Draw the final circuit</strong> — combinational logic feeding flip-flop inputs.</li>
          </ol>
        </article>

        <article className="content-block">
          <h4>Worked Example: 2-Bit Synchronous Up-Counter</h4>
          <p>States: 00 → 01 → 10 → 11 → 00 (cycles). Use D flip-flops.</p>
          <table className="table">
            <thead><tr><th>Current State (Q1Q0)</th><th>Next State (Q1+Q0+)</th><th>D1</th><th>D0</th></tr></thead>
            <tbody>
              <tr><td>00</td><td>01</td><td>0</td><td>1</td></tr>
              <tr><td>01</td><td>10</td><td>1</td><td>0</td></tr>
              <tr><td>10</td><td>11</td><td>1</td><td>1</td></tr>
              <tr><td>11</td><td>00</td><td>0</td><td>0</td></tr>
            </tbody>
          </table>
          <p>K-Map simplification: <strong>D0 = Q0(inv)</strong>, <strong>D1 = Q1 XOR Q0</strong>.</p>
          <div className="info-box ok">Synchronous counters change all flip-flops simultaneously — no ripple delay, operates at higher clock frequencies.</div>
        </article>
      </>
    ),
  },

  "lec12-memorg": {
    tag: "Lecture 12",
    title: "MEMORY ORGANIZATION",
    subtitle: "Addressability, memory arrays, ROM types, RAM structures, and how bits are physically mapped to addresses.",
    body: (
      <>
        <article className="content-block">
          <h4>Memory Address Basics</h4>
          <p>
            A memory module with <strong>k address lines</strong> can address <strong>2^k</strong> unique locations.
            Each location stores a <strong>word</strong> (typically 8 bits = 1 byte, or wider).
          </p>
          <div className="formula">Memory capacity = 2^k × w bits (k = address bits, w = word width)</div>
          <p><em>Example:</em> A memory with 16 address lines and 8-bit words has 2^16 × 8 = 512 Kbits = 64 KB capacity.</p>
        </article>

        <div className="split">
          <article className="content-block">
            <h4>RAM (Read/Write Memory)</h4>
            <p><strong>SRAM (Static):</strong></p>
            <ul>
              <li>6-transistor bistable latch per cell.</li>
              <li>Fast (~1 ns access), no refresh needed.</li>
              <li>Expensive, low density — CPU Cache (L1/L2/L3).</li>
            </ul>
            <p><strong>DRAM (Dynamic):</strong></p>
            <ul>
              <li>1 transistor + 1 capacitor per cell.</li>
              <li>Slower (~50–100 ns), must refresh every 64 ms.</li>
              <li>Cheap, high density — Main Memory (GB-scale).</li>
            </ul>
          </article>

          <article className="content-block">
            <h4>ROM (Read-Only Memory)</h4>
            <p>Non-volatile — retains data when power is off. Used for firmware and boot code.</p>
            <table className="table">
              <thead><tr><th>Type</th><th>Erase Method</th><th>Use</th></tr></thead>
              <tbody>
                <tr><td>ROM (Mask)</td><td>Cannot erase</td><td>Factory-programmed</td></tr>
                <tr><td>PROM</td><td>Cannot erase (OTP)</td><td>User-programmed once</td></tr>
                <tr><td>EPROM</td><td>Ultraviolet light</td><td>Development/testing</td></tr>
                <tr><td>EEPROM</td><td>Electrical signal</td><td>BIOS, calibration data</td></tr>
                <tr><td>Flash</td><td>Electrical, block-erase</td><td>SSD, USB drives, embedded firmware</td></tr>
              </tbody>
            </table>
          </article>
        </div>

        <article className="content-block">
          <h4>Memory Expansion</h4>
          <p>
            When a single chip does not have enough capacity, chips are combined:
          </p>
          <ul>
            <li><strong>Word-width expansion:</strong> Place chips in parallel. E.g., two 4-bit-wide chips side-by-side give 8-bit words. Same address lines, each chip handles half the data bits.</li>
            <li><strong>Address-space expansion:</strong> Stack chips in series. E.g., two 2K×8 chips stacked give 4K×8. Use an extra address line to select which chip to enable via Chip Select (CS).</li>
          </ul>
          <div className="formula">Total addresses = sum of chips' address spaces | Total width = sum of chips' word widths</div>
        </article>
      </>
    ),
  },

  "lec13-hierarchy": {
    tag: "Lecture 13",
    title: "MEMORY HIERARCHY",
    subtitle: "Registers, cache, RAM, and secondary storage — balancing speed, cost, and capacity in a computer system.",
    body: (
      <>
        <article className="content-block">
          <h4>The Need for a Hierarchy</h4>
          <p>
            CPUs can execute billions of instructions per second. However, large memories (DRAM, SSDs, HDDs) are much slower.
            The <Term label="Memory Hierarchy" tip="A pyramid of memory technologies ordered by speed and cost, ensuring fast data is kept close to the CPU." /> bridges this gap using the principle of <strong>locality of reference</strong>:
          </p>
          <ul>
            <li><strong>Temporal locality:</strong> Accessed data is likely to be accessed again soon.</li>
            <li><strong>Spatial locality:</strong> If one address is accessed, nearby addresses are likely to follow.</li>
          </ul>
        </article>

        <article className="content-block">
          <h4>Hierarchy Levels</h4>
          <table className="table">
            <thead><tr><th>Level</th><th>Technology</th><th>Capacity</th><th>Speed</th><th>Cost/GB</th></tr></thead>
            <tbody>
              <tr><td>Registers</td><td>Flip-flops inside CPU</td><td>~KB</td><td>~0.3 ns</td><td>Highest</td></tr>
              <tr><td>L1 Cache</td><td>SRAM on-chip</td><td>32–256 KB</td><td>~1 ns</td><td>Very High</td></tr>
              <tr><td>L2 Cache</td><td>SRAM (on or near CPU)</td><td>256KB–4MB</td><td>~5 ns</td><td>High</td></tr>
              <tr><td>L3 Cache</td><td>SRAM shared</td><td>4–64 MB</td><td>~20 ns</td><td>Moderate</td></tr>
              <tr><td>Main Memory</td><td>DRAM</td><td>4–128 GB</td><td>~100 ns</td><td>Low</td></tr>
              <tr><td>Secondary</td><td>SSD / HDD</td><td>100GB–20TB</td><td>µs–ms</td><td>Very Low</td></tr>
              <tr><td>Tertiary</td><td>Magnetic tape / cloud</td><td>Unlimited</td><td>Seconds</td><td>Lowest</td></tr>
            </tbody>
          </table>
        </article>

        <div className="split">
          <article className="content-block">
            <h4>Cache Operation</h4>
            <p>
              When the CPU requests data, it first checks the cache:
            </p>
            <ul>
              <li><strong>Cache HIT:</strong> Data found in cache — served quickly (e.g., 1–20 cycles).</li>
              <li><strong>Cache MISS:</strong> Data not in cache — fetched from RAM (100+ cycles), and a copy is placed in cache.</li>
            </ul>
            <div className="formula">Hit Rate = Cache Hits / Total Accesses (good systems: 95–99%)</div>
            <div className="formula">Average Access Time = Hit Rate × Cache Time + Miss Rate × DRAM Time</div>
          </article>

          <article className="content-block">
            <h4>Registers</h4>
            <p>
              Registers are the fastest storage. Built from D flip-flops inside the CPU. Examples:
            </p>
            <ul>
              <li><strong>Data Register (DR):</strong> Holds ALU operands/results.</li>
              <li><strong>Instruction Register (IR):</strong> Holds the current opcode being decoded.</li>
              <li><strong>Program Counter (PC):</strong> Holds the address of the next instruction.</li>
              <li><strong>Stack Pointer (SP):</strong> Tracks the top of the call stack.</li>
            </ul>
            <div className="info-box ok">Shift registers (a chain of D flip-flops) can convert serial data to parallel or vice versa — widely used in SPI and UART circuits.</div>
          </article>
        </div>
      </>
    ),
  },

  "lec14-serial": {
    tag: "Lecture 14",
    title: "SERIAL PROTOCOL BASICS",
    subtitle: "UART, SPI, and I2C — serial communication standards used between embedded systems and peripherals.",
    body: (
      <>
        <article className="content-block">
          <h4>Serial vs. Parallel Communication</h4>
          <p>
            <strong>Parallel:</strong> Multiple bits transmitted simultaneously on separate wires. Fast but requires many pins and suffers from skew at high speeds (e.g., old printer ports).
          </p>
          <p>
            <strong>Serial:</strong> Bits sent one after another on a single wire. Slower per cycle but practical for long distances, fewer pins, and avoids skew. Modern high-speed communication is overwhelmingly serial.
          </p>
        </article>

        <div className="split">
          <article className="content-block">
            <h4>UART (Universal Asynchronous Receiver/Transmitter)</h4>
            <p><em>Asynchronous</em> — no shared clock signal. Both sides agree on a <strong>baud rate</strong> (bits per second).</p>
            <ul>
              <li><strong>Lines:</strong> TX (transmit) and RX (receive) — only 2 wires.</li>
              <li>Idle line = HIGH (logic 1).</li>
              <li>Frame = Start bit (0) + 5–9 data bits + optional parity + 1–2 stop bits (1).</li>
            </ul>
            <div className="formula">Baud rate = bits per second. Common: 9600, 115200</div>
            <p><em>Example:</em> Sending 'A' (01000001) at 9600 baud: 1 start + 8 data + 1 stop = 10 bits. Time = 10/9600 ≈ 1.04 ms.</p>
            <div className="info-box info">Used for: serial console/debug, GPS modules, Bluetooth UART bridges.</div>
          </article>

          <article className="content-block">
            <h4>SPI (Serial Peripheral Interface)</h4>
            <p><em>Synchronous</em>, <em>full-duplex</em>. A master controls the clock (SCLK) and selects slaves individually.</p>
            <ul>
              <li><strong>Lines:</strong> MOSI (Master Out Slave In), MISO (Master In Slave Out), SCLK (clock), SS/CS (chip select, one per slave).</li>
              <li>Data clocked on rising or falling edge (configurable via CPOL/CPHA).</li>
              <li><strong>Fastest</strong> of the three — 10s of MHz possible.</li>
            </ul>
            <div className="info-box ok">Used for: SD cards, TFT displays, high-speed ADCs/DACs, Flash memory chips.</div>
          </article>
        </div>

        <article className="content-block">
          <h4>I2C (Inter-Integrated Circuit)</h4>
          <p>
            <em>Synchronous</em>, <em>half-duplex</em>, multi-master, multi-slave on only <strong>2 wires</strong>: SDA (data) and SCL (clock).
            Each slave has a unique 7-bit (or 10-bit) <strong>address</strong>.
          </p>
          <ul>
            <li>Both lines are <strong>open-drain</strong> requiring pull-up resistors to V+.</li>
            <li><strong>Start condition:</strong> SDA goes LOW while SCL is HIGH.</li>
            <li><strong>Stop condition:</strong> SDA goes HIGH while SCL is HIGH.</li>
            <li>After each byte, slave asserts <strong>ACK</strong> (pulls SDA LOW) to acknowledge receipt.</li>
          </ul>
          <table className="table">
            <thead><tr><th>Mode</th><th>Speed</th></tr></thead>
            <tbody>
              <tr><td>Standard</td><td>100 kbps</td></tr>
              <tr><td>Fast</td><td>400 kbps</td></tr>
              <tr><td>Fast-Plus</td><td>1 Mbps</td></tr>
              <tr><td>High Speed</td><td>3.4 Mbps</td></tr>
            </tbody>
          </table>
          <div className="info-box info">Used for: temperature sensors, OLED displays, EEPROMs, real-time clocks.</div>
        </article>

        <article className="content-block">
          <h4>Protocol Comparison</h4>
          <table className="table">
            <thead><tr><th>Feature</th><th>UART</th><th>SPI</th><th>I2C</th></tr></thead>
            <tbody>
              <tr><td>Clock</td><td>None (async)</td><td>Master provides</td><td>Master provides</td></tr>
              <tr><td>Wires</td><td>2 (TX, RX)</td><td>4+ (MOSI,MISO,SCLK,SS)</td><td>2 (SDA, SCL)</td></tr>
              <tr><td>Duplex</td><td>Full</td><td>Full</td><td>Half</td></tr>
              <tr><td>Speed</td><td>Low (~115200 bps)</td><td>Highest (MBps)</td><td>Medium (100k–3.4Mbps)</td></tr>
              <tr><td>Multi-slave</td><td>No</td><td>Yes (one SS per slave)</td><td>Yes (addressing)</td></tr>
            </tbody>
          </table>
        </article>
      </>
    ),
  },
};

function TopicPage({ pageId }) {
  const page = PAGES[pageId];

  if (!page) {
    return null;
  }

  return (
    <section className="page active-page">
      <div className="section-header">
        <div className="section-tag">{page.tag}</div>
        <h3>{page.title}</h3>
        <p>{page.subtitle}</p>
      </div>
      {page.body}
    </section>
  );
}

export default TopicPage;
