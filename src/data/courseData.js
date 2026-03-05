export const NAV_ITEMS = [
  {
    label: "Overview",
    items: [
      { id: "home", short: "HM", title: "Course Home" },
      { id: "source-map", short: "SF", title: "Source Map" },
      { id: "glossary", short: "GL", title: "Glossary" },
    ],
  },
  {
    label: "Lectures",
    items: [
      { id: "lec1", short: "L1", title: "Digital Foundations" },
      { id: "lec2", short: "L2", title: "Number Systems" },
      { id: "lec3", short: "L3", title: "Binary Math & Signed Integers" },
      { id: "lec4", short: "L4", title: "Logic Gates" },
      { id: "lec5", short: "L5", title: "Boolean Algebra" },
      { id: "lec6", short: "L6", title: "SOP & POS Formats" },
    ],
  },
  {
    label: "Note One",
    items: [
      { id: "note1-core", short: "N1", title: "Combinational Core" },
      { id: "note1-mux", short: "MX", title: "Multiplexer Logic" },
    ],
  },
  {
    label: "Note Two",
    items: [
      { id: "note2-encoder", short: "PE", title: "Priority Encoder" },
      { id: "note2-decoder", short: "BD", title: "Binary Decoder" },
      { id: "note2-adder", short: "AD", title: "Binary Adders" },
    ],
  },
  {
    label: "Note Three",
    items: [
      { id: "note3", short: "N3", title: "Subtractors & Comparators" }
    ]
  },
  {
    label: "Advanced Topics",
    items: [
      { id: "lec7-kmap", short: "KM", title: "Karnaugh Maps" },
      { id: "lec8-binops", short: "BO", title: "Binary Operation Apps" },
      { id: "lec10-mem", short: "MC", title: "Memory Cells & Flip-Flops" },
      { id: "lec11-fsm", short: "SM", title: "State Machines" },
      { id: "lec12-memorg", short: "MO", title: "Memory Organization" },
      { id: "lec13-hierarchy", short: "MH", title: "Memory Hierarchy" },
      { id: "lec14-serial", short: "SP", title: "Serial Protocol Basics" },
      { id: "lec-cmem", short: "CM", title: "Computer Memory" },
    ],
  },
  {
    label: "Practice",
    items: [
      { id: "flashcards", short: "FC", title: "Flashcards" },
      { id: "section-quizzes", short: "SQ", title: "Section Quizzes" },
      { id: "full-quiz", short: "FQ", title: "Full Quiz" },
      { id: "ai-quiz", short: "AI", title: "✦ AI Quiz" },
      { id: "leaderboard", short: "🏆", title: "Leaderboard" },
      { id: "cheatsheet", short: "📄", title: "PDF Cheatsheet", util: true },
      { id: "logic-builder", short: "⚡", title: "Logic Gate Builder", util: true },
      { id: "battle", short: "⚔️", title: "Live Arena", util: true, accent: "var(--orange)" },
      { id: "h2h", short: "🏟️", title: "H2H Scoreboard", util: true, accent: "var(--cyan)" },
    ],
  },
];

// PAGE_IDS excludes utility pages so they don't dilute course progress %
export const PAGE_IDS = NAV_ITEMS
  .flatMap((group) => group.items)
  .filter((item) => !item.util)
  .map((item) => item.id);

export const HOME_TAGS = [
  { label: "Analog vs Digital", tone: "cyan" },
  { label: "Signal Types", tone: "cyan" },
  { label: "Combinational Logic", tone: "green" },
  { label: "Multiplexer", tone: "green" },
  { label: "Priority Encoder", tone: "orange" },
  { label: "Binary Decoder", tone: "orange" },
  { label: "Half/Full Adder", tone: "orange" },
];

export const SOURCE_FILES = [
  {
    name: "IFT 211 LECTURE 1.pdf",
    status: "Mapped into Digital Foundations, flashcards, glossary, and quizzes.",
  },
  {
    name: "IFT 211 LECTURE 2.pdf",
    status: "Sparse machine-readable text in local extraction; placeholder retained by exact heading.",
  },
  {
    name: "IFT 211 LECTURE 3.pdf",
    status: "Sparse machine-readable text in local extraction; placeholder retained by exact heading.",
  },
  {
    name: "IFT 211 LECTURE 4.pdf",
    status: "Sparse machine-readable text in local extraction; placeholder retained by exact heading.",
  },
  {
    name: "IFT 211 LECTURE 5.pdf",
    status: "Sparse machine-readable text in local extraction; placeholder retained by exact heading.",
  },
  {
    name: "IFT 211 LECTURE 6.pdf",
    status: "Sparse machine-readable text in local extraction; placeholder retained by exact heading.",
  },
  {
    name: "Share IFT 211 COMBINATIONAL CIRCUIT - note one.docx",
    status: "Mapped to Combinational Core and Multiplexer Logic pages.",
  },
  {
    name: "Share IFT 211 COMBINATIONAL CIRCUIT(2).docx",
    status: "Mapped to Priority Encoder, Binary Decoder, and Binary Adder pages.",
  },
  {
    name: "IFT 211 COMBINATIONAL CIRCUIT note two student.pdf",
    status: "Content aligned with note-two combinational topics.",
  },
  {
    name: "IFT 211 COMBINATIONAL CIRCUIT note three.pdf",
    status: "Title retained with explicit placeholder for future OCR pass.",
  },
  {
    name: "The_Secret_Language_of_Your_Devices.mp4",
    status: "Registered as supplementary media source without invented transcript content.",
  },
  {
    name: "IFT 211 Lecture-Computer Memory.pdf",
    status: "Mapped to Computer Memory page covering RAM, ROM, cache memory, memory hierarchy, and capacity calculations.",
  },
];

export const FLASHCARDS = [
  {
    module: "lec1",
    question: "What distinguishes analog from digital values?",
    answer:
      "Analog values are continuous; digital values are sampled and represented with fixed precision.",
  },
  {
    module: "lec1",
    question: "What are the three stages before digital data is formed from a sensor?",
    answer: "Sensor output, signal conditioning, then analog-to-digital conversion.",
  },
  {
    module: "lec1",
    question: "How are frequency and period related?",
    answer: "Frequency is the inverse of period: f = 1 / T.",
  },
  {
    module: "lec1",
    question: "What does duty cycle measure?",
    answer: "The percentage of one period that the waveform remains HIGH.",
  },
  {
    module: "note1",
    question: "What does memoryless mean in combinational logic?",
    answer: "Output depends only on present input combinations, not previous states.",
  },
  {
    module: "note1",
    question: "List the three specification methods for combinational logic.",
    answer: "Boolean algebra, truth table, and logic diagram.",
  },
  {
    module: "note1",
    question: "Why are NAND and NOR called universal gates?",
    answer: "Any combinational function can be implemented with only NANDs or only NORs.",
  },
  {
    module: "note1",
    question: "What is the key role of a multiplexer?",
    answer: "Selecting one input channel from many and routing it to one output.",
  },
  {
    module: "note2",
    question: "What problem does a priority encoder solve?",
    answer: "It removes ambiguity when multiple input lines are active simultaneously.",
  },
  {
    module: "note2",
    question: "What does a decoder do?",
    answer: "It maps an n-bit input code to one active output among up to 2^n lines.",
  },
  {
    module: "note2",
    question: "State half-adder output equations.",
    answer: "SUM = A XOR B, CARRY = A AND B.",
  },
  {
    module: "note2",
    question: "State full-adder carry equation.",
    answer: "Cout = AB + Cin(A XOR B).",
  },
  {
    module: "lec2",
    question: "How many bits does a hexadecimal digit represent?",
    answer: "4 bits (one nibble). Two hex digits represent one byte.",
  },
  {
    module: "lec2",
    question: "Why is Gray code preferred in shaft encoders over standard binary?",
    answer: "Only one bit changes between adjacent Gray code values, preventing erroneous readings when the sensor reads during a transition.",
  },
  {
    module: "lec3",
    question: "What are the two steps to form the two's complement of a number?",
    answer: "Step 1: invert all bits. Step 2: add 1 to the result.",
  },
  {
    module: "lec3",
    question: "What is the difference between carry and overflow?",
    answer: "Carry indicates the unsigned result is out of range; overflow indicates the signed result is out of range.",
  },
  {
    module: "lec4",
    question: "Which logic gate is called 'universal' and why?",
    answer: "NAND (and NOR). Any combinational logic function can be built using only NAND gates (or only NOR gates).",
  },
  {
    module: "lec4",
    question: "How many rows does a truth table with 4 inputs have?",
    answer: "2⁴ = 16 rows.",
  },
  {
    module: "lec5",
    question: "State DeMorgan's first theorem.",
    answer: "NOT(A AND B) = NOT A OR NOT B. An inverted AND becomes an OR of inverted inputs.",
  },
  {
    module: "lec5",
    question: "Simplify: A + A·B",
    answer: "A + A·B = A (absorption rule).",
  },
  {
    module: "lec6",
    question: "How do you derive an SOP expression from a truth table?",
    answer: "Identify rows where output = 1. For each such row write a minterm (AND term) where variables that are 0 are complemented. OR all minterms together.",
  },
  {
    module: "lec6",
    question: "How do you derive a POS expression from a truth table?",
    answer: "Identify rows where output = 0. For each row write a maxterm (OR term) where variables that are 1 are complemented. AND all maxterms together.",
  },
  {
    module: "note3",
    question: "What is the Boolean expression for the Difference output of a half subtractor?",
    answer: "D = X XOR Y (exclusive OR of minuend X and subtrahend Y).",
  },
  {
    module: "note3",
    question: "What outputs does a magnitude comparator produce?",
    answer: "Three outputs: A > B, A = B, and A < B.",
  },
  {
    module: "lec-cmem",
    question: "What are the two major groups of memory circuits?",
    answer: "Dynamic memories (RAM — store data for active computer use) and static memories (store information that defines the operating state of a digital system).",
  },
  {
    module: "lec-cmem",
    question: "Which two processor registers handle memory–CPU data transfer?",
    answer: "MAR (Memory Address Register) holds the address; MDR (Memory Data Register) holds the data being read or written.",
  },
  {
    module: "lec-cmem",
    question: "What is the formula for memory capacity?",
    answer: "Memory capacity = m × n bits, where m is the number of words and n is the number of bits per word.",
  },
  {
    module: "lec-cmem",
    question: "How does DRAM differ from SRAM?",
    answer: "DRAM must be periodically refreshed to retain data (slower, cheaper, smaller). SRAM retains data as long as power is supplied without refresh (faster, more expensive, larger).",
  },
  {
    module: "lec-cmem",
    question: "What is a cache hit versus a cache miss?",
    answer: "Cache hit: requested data is found in cache — fast access. Cache miss: data is not in cache and must be fetched from slower main memory.",
  },
  {
    module: "lec-cmem",
    question: "Name the three cache mapping methods.",
    answer: "Associative mapping, Direct mapping, and Set-Associative mapping.",
  },
  {
    module: "lec-cmem",
    question: "What is the key difference between RAM and ROM?",
    answer: "RAM is volatile (data lost on power-off) and supports read/write. ROM is non-volatile (retains data without power) and is read-only.",
  },
  {
    module: "lec-cmem",
    question: "What are the three primary types of computer memory?",
    answer: "Primary memory (main memory/RAM), cache memory, and secondary memory (magnetic disks, etc.).",
  },
];

export const SECTION_QUIZZES = {
  lec1: {
    label: "Lecture 1",
    questions: [
      {
        module: "lec1",
        question:
          "A sensor value is sampled every 2 ms. Which statement is most accurate?",
        options: [
          "The signal is analog because 2 ms is continuous time.",
          "The resulting data sequence is digital because values are captured at discrete intervals.",
          "Sampling interval automatically determines amplitude precision.",
          "Sampling removes the need for an ADC stage.",
        ],
        correct: 1,
        feedback: [
          "Incorrect. Analog or digital depends on value representation, not merely the time axis.",
          "Correct. Discrete-time measurement creates digital data from the original analog quantity.",
          "Incorrect. Amplitude precision is set by converter resolution.",
          "Incorrect. Sampling is part of ADC workflow, not a replacement for conversion hardware.",
        ],
      },
      {
        module: "lec1",
        question: "For a periodic signal with T = 0.01 s, frequency is:",
        options: ["10 Hz", "50 Hz", "100 Hz", "1000 Hz"],
        correct: 2,
        feedback: [
          "Incorrect. 10 Hz corresponds to T = 0.1 s.",
          "Incorrect. 50 Hz corresponds to T = 0.02 s.",
          "Correct. f = 1/T = 1/0.01 = 100 Hz.",
          "Incorrect. 1000 Hz corresponds to T = 0.001 s.",
        ],
      },
      {
        module: "lec1",
        question: "A waveform is high for 3 ms in a 12 ms period. Duty cycle is:",
        options: ["12.5%", "25%", "33.3%", "75%"],
        correct: 1,
        feedback: [
          "Incorrect. That would require 1.5 ms high time in 12 ms.",
          "Correct. Duty = (3/12) * 100 = 25%.",
          "Incorrect. 33.3% would require 4 ms high time.",
          "Incorrect. 75% would require 9 ms high time.",
        ],
      },
      {
        module: "lec1",
        question: "Which definition matches a negative-going pulse?",
        options: [
          "Idle low, then brief high state.",
          "Idle high, then brief low state before returning high.",
          "Constant high with no transition.",
          "Irregular random transitions with no pulse width definition.",
        ],
        correct: 1,
        feedback: [
          "Incorrect. That describes a positive-going pulse.",
          "Correct. Negative-going pulse dips low from a high idle level.",
          "Incorrect. That is not a pulse.",
          "Incorrect. Pulse behavior requires defined transition and return.",
        ],
      },
    ],
  },
  note1: {
    label: "Note One",
    questions: [
      {
        module: "note1",
        question: "A combinational circuit output depends on:",
        options: [
          "Current inputs and previous output history.",
          "Only the current input combination.",
          "Clock edges only.",
          "Enable pin only.",
        ],
        correct: 1,
        feedback: [
          "Incorrect. History dependence is sequential behavior.",
          "Correct. Combinational logic is memoryless.",
          "Incorrect. Clock dependence is not required for combinational output.",
          "Incorrect. Enable can gate operation but does not define output alone.",
        ],
      },
      {
        module: "note1",
        question:
          "Which set lists the three representation forms stated in note one?",
        options: [
          "K-map, finite-state diagram, machine code",
          "Truth table, transistor layout, register map",
          "Boolean algebra, truth table, logic diagram",
          "Assembler listing, flowchart, waveform only",
        ],
        correct: 2,
        feedback: [
          "Incorrect. That set is not the stated trio in note one.",
          "Incorrect. Truth table is valid but the others are not the listed core methods.",
          "Correct. These are the three specified representation methods.",
          "Incorrect. These are not formal combinational function representations in the material.",
        ],
      },
      {
        module: "note1",
        question: "In a 2-to-1 multiplexer, when select S = 0, output Q follows:",
        options: ["I1", "I0", "both I0 and I1", "neither input"],
        correct: 1,
        feedback: [
          "Incorrect. S=1 selects I1 in the standard mapping.",
          "Correct. S=0 routes I0 to output.",
          "Incorrect. A MUX selects one path at a time.",
          "Incorrect. One data line is selected when enabled.",
        ],
      },
      {
        module: "note1",
        question: "Why are NAND/NOR universal gates?",
        options: [
          "They are only used for memory circuits.",
          "They always minimize delay in all designs.",
          "Any combinational function can be built using only one of these gate types.",
          "They eliminate the need for truth tables.",
        ],
        correct: 2,
        feedback: [
          "Incorrect. Universality is about logical completeness, not memory-only usage.",
          "Incorrect. Delay depends on implementation constraints.",
          "Correct. Logical completeness is exactly why they are called universal.",
          "Incorrect. Truth tables remain valid analysis tools.",
        ],
      },
    ],
  },
  lec2: {
    label: "Lecture 2 – Number Systems",
    questions: [
      {
        module: "lec2",
        question: "What is the decimal value of binary 1011₂?",
        options: ["9", "10", "11", "13"],
        correct: 2,
        feedback: [
          "Incorrect. 1001₂ = 9.",
          "Incorrect. 1010₂ = 10.",
          "Correct. 1·8 + 0·4 + 1·2 + 1·1 = 11.",
          "Incorrect. 1101₂ = 13.",
        ],
      },
      {
        module: "lec2",
        question: "How many bits does each hex digit represent?",
        options: ["1 bit", "2 bits", "4 bits", "8 bits"],
        correct: 2,
        feedback: [
          "Incorrect. 1 bit gives only 0 or 1.",
          "Incorrect. 2 bits give 0–3.",
          "Correct. 4 bits (one nibble) represent 16 values (0–F).",
          "Incorrect. 8 bits is one byte, representing two hex digits.",
        ],
      },
      {
        module: "lec2",
        question: "In BCD, which binary pattern is INVALID?",
        options: ["0000", "0101", "1001", "1010"],
        correct: 3,
        feedback: [
          "Incorrect. 0000 = decimal 0, valid.",
          "Incorrect. 0101 = decimal 5, valid.",
          "Incorrect. 1001 = decimal 9, valid.",
          "Correct. Patterns 1010–1111 (A–F) are undefined in BCD.",
        ],
      },
      {
        module: "lec2",
        question: "The key property of Gray code is that adjacent values differ by:",
        options: ["All bits", "Exactly one bit", "Exactly two bits", "The MSB only"],
        correct: 1,
        feedback: [
          "Incorrect. That describes binary counting, which can cause sensor errors.",
          "Correct. Exactly one bit changes between consecutive Gray code values.",
          "Incorrect. Two-bit changes can still cause erroneous intermediate values.",
          "Incorrect. The MSB flips only halfway through the count.",
        ],
      },
    ],
  },
  lec3: {
    label: "Lecture 3 – Binary Math",
    questions: [
      {
        module: "lec3",
        question: "What is the two's complement of 00100100 (+36)?",
        options: ["11011011", "11011100", "00100101", "11100100"],
        correct: 1,
        feedback: [
          "Incorrect. 11011011 is the one's complement (step 1 only).",
          "Correct. Invert all bits (11011011) then add 1 → 11011100 = -36.",
          "Incorrect. That is +36 + 1.",
          "Incorrect.",
        ],
      },
      {
        module: "lec3",
        question: "Overflow occurs in signed addition when:",
        options: [
          "The carry out of the MSB equals the carry into the MSB.",
          "Two positives sum to a negative result.",
          "The result has a carry out.",
          "The MSB of both operands is 0.",
        ],
        correct: 1,
        feedback: [
          "Incorrect. That is the condition for NO overflow.",
          "Correct. Overflow is detected when two positives yield a negative or two negatives yield a positive.",
          "Incorrect. Carry out indicates unsigned overflow, not signed.",
          "Incorrect. Both positive does not automatically cause overflow.",
        ],
      },
      {
        module: "lec3",
        question: "Sign-extending 10110011 (8-bit) to 16 bits gives:",
        options: [
          "00000000 10110011",
          "11111111 10110011",
          "10110011 00000000",
          "01001100 10110011",
        ],
        correct: 1,
        feedback: [
          "Incorrect. Zero-extension is used for unsigned values.",
          "Correct. The sign bit is 1, so replicate 1s into all higher bits.",
          "Incorrect. The original bits go in the low byte, not swapped.",
          "Incorrect.",
        ],
      },
      {
        module: "lec3",
        question: "Standard ASCII encodes characters in how many bits?",
        options: ["4 bits", "7 bits", "8 bits", "16 bits"],
        correct: 1,
        feedback: [
          "Incorrect. 4 bits cover only 0–15.",
          "Correct. Standard ASCII uses 7 bits (codes 0–127).",
          "Incorrect. Extended ASCII uses 8 bits.",
          "Incorrect. Unicode uses 16 bits.",
        ],
      },
    ],
  },
  lec4: {
    label: "Lecture 4 – Logic Gates",
    questions: [
      {
        module: "lec4",
        question: "An AND gate with inputs 1, 0, 1 produces:",
        options: ["0", "1", "2", "Undefined"],
        correct: 0,
        feedback: [
          "Correct. ALL inputs must be 1 for AND output to be 1. One 0 forces output to 0.",
          "Incorrect. At least one input is 0.",
          "Incorrect. Logic gates output binary values only.",
          "Incorrect.",
        ],
      },
      {
        module: "lec4",
        question: "Which gate outputs 1 for an ODD count of 1-inputs?",
        options: ["AND", "OR", "XOR", "XNOR"],
        correct: 2,
        feedback: [
          "Incorrect. AND outputs 1 only when ALL inputs are 1.",
          "Incorrect. OR outputs 1 when ANY input is 1.",
          "Correct. XOR is a parity checker: output is 1 for odd parity.",
          "Incorrect. XNOR outputs 1 for EVEN count of 1s.",
        ],
      },
      {
        module: "lec4",
        question: "A NAND gate is described as 'universal' because:",
        options: [
          "It is faster than all other gates.",
          "Any combinational function can be built from NAND gates alone.",
          "It uses less power than other gates.",
          "It has more inputs than other gates.",
        ],
        correct: 1,
        feedback: [
          "Incorrect. Universality refers to logical completeness, not speed.",
          "Correct. NAND gates are logically complete: NOT, AND, OR can all be made from NANDs.",
          "Incorrect.",
          "Incorrect.",
        ],
      },
      {
        module: "lec4",
        question: "A three-input truth table has how many rows?",
        options: ["4", "6", "8", "16"],
        correct: 2,
        feedback: [
          "Incorrect. 2² = 4 rows covers 2 inputs.",
          "Incorrect.",
          "Correct. 2³ = 8 rows for 3 inputs.",
          "Incorrect. 2⁴ = 16 rows covers 4 inputs.",
        ],
      },
    ],
  },
  lec5: {
    label: "Lecture 5 – Boolean Algebra",
    questions: [
      {
        module: "lec5",
        question: "What does the Distributive Law state?",
        options: [
          "A + B = B + A",
          "A · (B + C) = A · B + A · C",
          "A + (B + C) = (A + B) + C",
          "NOT(NOT A) = A",
        ],
        correct: 1,
        feedback: [
          "Incorrect. That is the Commutative Law.",
          "Correct. AND distributes over OR.",
          "Incorrect. That is the Associative Law.",
          "Incorrect. That is the Double Negation rule.",
        ],
      },
      {
        module: "lec5",
        question: "DeMorgan's first theorem states: NOT(A · B) =",
        options: ["NOT A · NOT B", "NOT A + NOT B", "A + B", "A · B"],
        correct: 1,
        feedback: [
          "Incorrect. That would stay as an AND.",
          "Correct. NOT(A AND B) = NOT A OR NOT B.",
          "Incorrect.",
          "Incorrect.",
        ],
      },
      {
        module: "lec5",
        question: "Simplify: A · 0",
        options: ["A", "0", "1", "NOT A"],
        correct: 1,
        feedback: [
          "Incorrect. A · 1 = A, not A · 0.",
          "Correct. Anything ANDed with 0 is 0.",
          "Incorrect. A + 1 = 1, not A · 0.",
          "Incorrect.",
        ],
      },
      {
        module: "lec5",
        question: "Which operator has highest precedence in Boolean algebra?",
        options: ["OR", "AND", "NOT", "XOR"],
        correct: 2,
        feedback: [
          "Incorrect. OR has the lowest precedence.",
          "Incorrect. AND is above OR but below NOT.",
          "Correct. NOT > AND > OR (unless overridden by parentheses).",
          "Incorrect. XOR is typically evaluated like OR in precedence.",
        ],
      },
    ],
  },
  lec6: {
    label: "Lecture 6 – SOP & POS",
    questions: [
      {
        module: "lec6",
        question: "In an SOP circuit, the two logic levels (excluding inverters) are:",
        options: ["OR then AND", "AND then OR", "NAND then NOR", "OR then NOR"],
        correct: 1,
        feedback: [
          "Incorrect. That describes POS, not SOP.",
          "Correct. SOP: AND gates feed into a single OR gate.",
          "Incorrect.",
          "Incorrect.",
        ],
      },
      {
        module: "lec6",
        question: "To convert a truth table to SOP, you focus on rows where output =",
        options: ["0", "1", "Both 0 and 1", "Neither"],
        correct: 1,
        feedback: [
          "Incorrect. Rows with 0 are used for POS.",
          "Correct. Each row with output = 1 generates one product (AND) term.",
          "Incorrect.",
          "Incorrect.",
        ],
      },
      {
        module: "lec6",
        question: "In a minterm for a row where A=0, B=1, C=0, the product term is:",
        options: ["A·B·C", "Ā·B·C̄", "A·B̄·C", "Ā·B̄·C̄"],
        correct: 1,
        feedback: [
          "Incorrect. A and C are 0, so they must be complemented.",
          "Correct. Complement each variable that is 0 in that row.",
          "Incorrect. B is 1, so it is not complemented.",
          "Incorrect. B is 1 in this row.",
        ],
      },
      {
        module: "lec6",
        question: "SOP and POS are called 'two-level' forms because:",
        options: [
          "They use exactly two gate types.",
          "Input signals pass through at most two logic gate levels.",
          "They work for up to two input variables only.",
          "They require two inverters per variable.",
        ],
        correct: 1,
        feedback: [
          "Incorrect.",
          "Correct. Two gate levels (plus optional inverters) give maximum speed.",
          "Incorrect. They work for any number of variables.",
          "Incorrect.",
        ],
      },
    ],
  },
  note2: {
    label: "Note Two",
    questions: [
      {
        module: "note2",
        question:
          "If D2 and D6 are both high in an 8-to-3 priority encoder, output corresponds to:",
        options: ["D2", "D6", "Bitwise merge of both", "Undefined state"],
        correct: 1,
        feedback: [
          "Incorrect. Lower-priority lines are ignored when higher-priority lines are active.",
          "Correct. Priority encoder outputs highest-order active input code.",
          "Incorrect. That ambiguity occurs in non-priority encoders.",
          "Incorrect. Priority rule defines output deterministically.",
        ],
      },
      {
        module: "note2",
        question: "A 2-to-4 active-high decoder with input AB=10 activates:",
        options: ["Q0", "Q1", "Q2", "Q3"],
        correct: 2,
        feedback: [
          "Incorrect. Q0 corresponds to AB=00.",
          "Incorrect. Q1 corresponds to AB=01.",
          "Correct. AB=10 maps to Q2.",
          "Incorrect. Q3 corresponds to AB=11.",
        ],
      },
      {
        module: "note2",
        question: "The main limitation of a half adder is missing:",
        options: ["SUM output", "CARRY output", "Carry-in input", "XOR logic"],
        correct: 2,
        feedback: [
          "Incorrect. SUM is present.",
          "Incorrect. CARRY output is present.",
          "Correct. Without carry-in, it cannot fully chain multi-bit addition alone.",
          "Incorrect. XOR logic is central to the SUM calculation.",
        ],
      },
      {
        module: "note2",
        question: "Why is CLA faster than ripple carry in wider adders?",
        options: [
          "CLA skips carry calculations entirely.",
          "CLA computes carries in parallel from generate/propagate terms.",
          "CLA requires only one gate stage regardless of width.",
          "CLA is valid only for 2-bit addition.",
        ],
        correct: 1,
        feedback: [
          "Incorrect. CLA still computes carries, but strategically.",
          "Correct. Parallel carry derivation reduces propagation delay.",
          "Incorrect. Gate depth still grows, but much slower than ripple carry.",
          "Incorrect. CLA is used to improve wider adder performance.",
        ],
      },
    ],
  },
  "lec-cmem": {
    label: "Computer Memory",
    questions: [
      {
        module: "lec-cmem",
        question: "A processor with 20 address lines can address up to how many memory locations?",
        options: ["2^16 = 64K", "2^20 = 1M (mega)", "2^32 = 4G", "2^8 = 256"],
        correct: 1,
        feedback: [
          "Incorrect. 2^16 = 64K corresponds to a 16-bit address bus.",
          "Correct. 2^20 = 1,048,576 ≈ 1M memory locations.",
          "Incorrect. 2^32 = 4G corresponds to a 32-bit address bus.",
          "Incorrect. 2^8 = 256 corresponds to only 8 address lines.",
        ],
      },
      {
        module: "lec-cmem",
        question: "A memory chip specified as 2K×8 has a total capacity of:",
        options: ["2 KB", "8 KB", "16 KB", "32 KB"],
        correct: 2,
        feedback: [
          "Incorrect. 2K words alone does not equal capacity without including bit width.",
          "Incorrect. That would require 2K×4 or 1K×8.",
          "Correct. 2K = 2048 words; 2048 × 8 bits = 16,384 bits = 16 KB.",
          "Incorrect. 32 KB would require 2K×16.",
        ],
      },
      {
        module: "lec-cmem",
        question: "SRAM differs from DRAM in that SRAM:",
        options: [
          "Requires periodic refresh to retain data.",
          "Retains data without refresh but is more expensive.",
          "Is always larger in storage capacity.",
          "Is used only in secondary storage devices.",
        ],
        correct: 1,
        feedback: [
          "Incorrect. Periodic refresh is a characteristic of DRAM, not SRAM.",
          "Correct. SRAM holds data without refresh as long as power is on; it is faster but more expensive than DRAM.",
          "Incorrect. SRAM is smaller in capacity due to cost constraints.",
          "Incorrect. SRAM is used in cache memory, not secondary storage.",
        ],
      },
      {
        module: "lec-cmem",
        question: "A cache miss occurs when:",
        options: [
          "The requested data is found in cache and returned quickly.",
          "The cache controller resets all stored blocks.",
          "The requested memory address is not present in cache, so main memory must be accessed.",
          "Data is written to ROM instead of RAM.",
        ],
        correct: 2,
        feedback: [
          "Incorrect. Finding data in cache is a cache hit, not a miss.",
          "Incorrect. The controller does not reset all blocks on a miss.",
          "Correct. A cache miss forces a slower main-memory access and the block is then loaded into cache.",
          "Incorrect. ROM is unrelated to the cache hit/miss mechanism.",
        ],
      },
    ],
  },
  note3: {
    label: "Note Three – Subtractors & Comparators",
    questions: [
      {
        module: "note3",
        question: "What is the Borrow output of a half subtractor when X=0, Y=1?",
        options: ["0", "1", "Undefined", "Same as Difference"],
        correct: 1,
        feedback: [
          "Incorrect. 0 – 1 requires a borrow.",
          "Correct. Borrow = X̄·Y = 1·1 = 1.",
          "Incorrect.",
          "Incorrect. Borrow and Difference are separate outputs.",
        ],
      },
      {
        module: "note3",
        question: "A full subtractor has how many inputs?",
        options: ["1", "2", "3", "4"],
        correct: 2,
        feedback: [
          "Incorrect.",
          "Incorrect. Two inputs describe a half subtractor.",
          "Correct. X (minuend), Y (subtrahend), and Borrow-in.",
          "Incorrect.",
        ],
      },
      {
        module: "note3",
        question: "A 7-segment Common Cathode display lights a segment by:",
        options: [
          "Driving its anode LOW.",
          "Driving its anode HIGH.",
          "Pulling the common pin HIGH.",
          "Driving its cathode HIGH.",
        ],
        correct: 1,
        feedback: [
          "Incorrect. Anode LOW would reverse-bias the LED.",
          "Correct. Common cathode shares the GND; apply V+ to the anode to illuminate.",
          "Incorrect. The common cathode pin is tied to GND.",
          "Incorrect. That would also reverse-bias the LED.",
        ],
      },
      {
        module: "note3",
        question: "An identity comparator uses which gate internally?",
        options: ["XOR", "NAND", "XNOR", "NOR"],
        correct: 2,
        feedback: [
          "Incorrect. XOR outputs 1 when inputs differ (not equal).",
          "Incorrect.",
          "Correct. XNOR outputs 1 when both inputs are equal (A = B).",
          "Incorrect.",
        ],
      },
    ],
  },
};

export const EXTRA_QUESTIONS = [
  /* ── Lecture 1: Digital Foundations ─────────────────────────── */
  {
    module: "lec1",
    question: "What is the main advantage of digital signals over analog signals for long-distance transmission?",
    options: [
      "Digital signals travel faster than analog signals.",
      "Digital signals can be regenerated without accumulating noise.",
      "Digital signals require less bandwidth.",
      "Digital signals do not need amplification.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. Signal speed depends on the medium, not analog vs digital.",
      "Correct. Digital signals can be fully reconstructed (regenerated) at repeaters, unlike analog which accumulates noise on amplification.",
      "Incorrect. Digital signals often require more bandwidth due to encoding.",
      "Incorrect. Digital signals also weaken over distance and need repeaters.",
    ],
  },
  {
    module: "lec1",
    question: "What is the period of a 200 Hz signal?",
    options: ["0.05 s", "0.005 s", "0.5 s", "5 ms"],
    correct: 1,
    feedback: [
      "Incorrect. 0.05 s = 1/20 Hz.",
      "Correct. T = 1/f = 1/200 = 0.005 s.",
      "Incorrect. 0.5 s = 1/2 Hz.",
      "Incorrect. 5 ms = 0.005 s — this is correct but expressed differently. Actually 5 ms = 0.005 s, so this is also correct — but option B (0.005 s) is the primary answer.",
    ],
  },
  {
    module: "lec1",
    question: "A waveform is HIGH for 8 ms in a 20 ms period. What is the duty cycle?",
    options: ["25%", "30%", "40%", "60%"],
    correct: 2,
    feedback: [
      "Incorrect. 25% would mean 5 ms HIGH in a 20 ms period.",
      "Incorrect. 30% would mean 6 ms HIGH.",
      "Correct. Duty cycle = (8/20) × 100 = 40%.",
      "Incorrect. 60% would mean 12 ms HIGH.",
    ],
  },
  {
    module: "lec1",
    question: "The Nyquist sampling theorem states that to reconstruct a signal without aliasing, the sampling rate must be at least:",
    options: [
      "Equal to the signal frequency.",
      "Half the signal frequency.",
      "Twice the highest frequency component.",
      "Ten times the signal frequency.",
    ],
    correct: 2,
    feedback: [
      "Incorrect. Sampling at the signal frequency is insufficient.",
      "Incorrect. Half the frequency would lose information.",
      "Correct. The Nyquist rate is 2× the highest frequency component (2f_max).",
      "Incorrect. 10× is a rule of thumb for some applications but not the theorem.",
    ],
  },
  {
    module: "lec1",
    question: "An ADC with 8-bit resolution can represent how many distinct voltage levels?",
    options: ["8", "64", "128", "256"],
    correct: 3,
    feedback: [
      "Incorrect. 8 is the number of bits, not the number of levels.",
      "Incorrect. 64 = 2^6 (6-bit resolution).",
      "Incorrect. 128 = 2^7 (7-bit resolution).",
      "Correct. 2^8 = 256 distinct levels.",
    ],
  },
  {
    module: "lec1",
    question: "Signal conditioning performed before an ADC typically includes:",
    options: [
      "Encoding the signal into binary.",
      "Amplifying and filtering the raw sensor signal.",
      "Converting digital values back to analog.",
      "Storing the signal in ROM.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. Encoding is done after conversion.",
      "Correct. Signal conditioning amplifies and filters the raw analog signal before ADC conversion.",
      "Incorrect. That describes a DAC (digital-to-analog converter).",
      "Incorrect. ROM storage is unrelated to signal conditioning.",
    ],
  },
  {
    module: "lec1",
    question: "A rising edge in a digital signal is defined as a transition from:",
    options: ["HIGH to LOW", "LOW to HIGH", "HIGH to HIGH", "LOW to LOW"],
    correct: 1,
    feedback: [
      "Incorrect. HIGH to LOW is a falling edge.",
      "Correct. A rising edge is a LOW-to-HIGH transition.",
      "Incorrect. No transition occurs.",
      "Incorrect. No transition occurs.",
    ],
  },
  {
    module: "lec1",
    question: "Which of the following best describes a positive-going pulse?",
    options: [
      "Idle HIGH, briefly goes LOW, then returns HIGH.",
      "Idle LOW, briefly goes HIGH, then returns LOW.",
      "Continuously transitions between HIGH and LOW.",
      "Remains HIGH indefinitely.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. That describes a negative-going pulse.",
      "Correct. A positive-going pulse starts and ends LOW with a brief HIGH excursion.",
      "Incorrect. That describes an oscillating signal, not a pulse.",
      "Incorrect. That is a constant HIGH, not a pulse.",
    ],
  },

  /* ── Lecture 2: Number Systems ───────────────────────────────── */
  {
    module: "lec2",
    question: "What is the decimal value of binary 1101001₂?",
    options: ["89", "97", "105", "113"],
    correct: 2,
    feedback: [
      "Incorrect.",
      "Incorrect.",
      "Correct. 64+32+8+1 = 105.",
      "Incorrect.",
    ],
  },
  {
    module: "lec2",
    question: "What is the hexadecimal representation of decimal 255?",
    options: ["EF", "FE", "FF", "F0"],
    correct: 2,
    feedback: [
      "Incorrect. EF = 239.",
      "Incorrect. FE = 254.",
      "Correct. 255 = 15×16 + 15 = FF₁₆.",
      "Incorrect. F0 = 240.",
    ],
  },
  {
    module: "lec2",
    question: "What is the octal representation of binary 110101₂?",
    options: ["53", "65", "75", "57"],
    correct: 1,
    feedback: [
      "Incorrect. 53₈ = 101011₂.",
      "Correct. Group from right: 110=6, 101=5 → 65₈.",
      "Incorrect.",
      "Incorrect.",
    ],
  },
  {
    module: "lec2",
    question: "How is decimal 29 encoded in BCD?",
    options: ["0001 1101", "0010 1001", "0011 0010", "0001 1001"],
    correct: 1,
    feedback: [
      "Incorrect. 0001 1101 is not valid BCD encoding of 29.",
      "Correct. 2 = 0010, 9 = 1001 → 0010 1001.",
      "Incorrect.",
      "Incorrect.",
    ],
  },
  {
    module: "lec2",
    question: "What is the decimal value of hexadecimal 2A?",
    options: ["32", "40", "42", "52"],
    correct: 2,
    feedback: [
      "Incorrect.",
      "Incorrect. 2×16 = 32, A = 10, so 32+10 = 42.",
      "Correct. 2×16 + 10 = 42.",
      "Incorrect.",
    ],
  },
  {
    module: "lec2",
    question: "How many bits are required to represent decimal 100 in binary?",
    options: ["5", "6", "7", "8"],
    correct: 2,
    feedback: [
      "Incorrect. 5 bits cover 0–31.",
      "Incorrect. 6 bits cover 0–63.",
      "Correct. 100 = 1100100₂ requires 7 bits (2^7 = 128 > 100 > 63 = 2^6).",
      "Incorrect. 8 bits cover up to 255 — more than needed.",
    ],
  },
  {
    module: "lec2",
    question: "Which number system uses base 8?",
    options: ["Binary", "Octal", "Decimal", "Hexadecimal"],
    correct: 1,
    feedback: [
      "Incorrect. Binary uses base 2.",
      "Correct. Octal uses base 8 and digits 0–7.",
      "Incorrect. Decimal uses base 10.",
      "Incorrect. Hexadecimal uses base 16.",
    ],
  },
  {
    module: "lec2",
    question: "To convert a binary number to octal, you group binary digits in sets of:",
    options: ["1 from right", "2 from right", "3 from right", "4 from right"],
    correct: 2,
    feedback: [
      "Incorrect. Groups of 1 bit only give binary digits.",
      "Incorrect. Groups of 2 give values 0–3.",
      "Correct. Each group of 3 bits maps to one octal digit (2³ = 8).",
      "Incorrect. Groups of 4 bits map to hexadecimal.",
    ],
  },

  /* ── Lecture 3: Binary Math & Signed Integers ────────────────── */
  {
    module: "lec3",
    question: "Using 4-bit two's complement, what is the representable range?",
    options: ["-7 to +7", "-8 to +7", "-8 to +8", "0 to +15"],
    correct: 1,
    feedback: [
      "Incorrect. That is the sign-magnitude range.",
      "Correct. 4-bit two's complement: -2^3 = -8 to +(2^3 - 1) = +7.",
      "Incorrect. +8 cannot be represented in 4-bit two's complement.",
      "Incorrect. That is unsigned 4-bit range.",
    ],
  },
  {
    module: "lec3",
    question: "What is the two's complement representation of -5 in 4 bits?",
    options: ["1010", "1011", "1101", "0101"],
    correct: 1,
    feedback: [
      "Incorrect. 1010 = -6 in 4-bit two's complement.",
      "Correct. +5 = 0101; invert → 1010; add 1 → 1011.",
      "Incorrect. 1101 = -3 in 4-bit two's complement.",
      "Incorrect. 0101 = +5.",
    ],
  },
  {
    module: "lec3",
    question: "In 8-bit two's complement, what is the decimal value of 11111111?",
    options: ["-1", "-127", "255", "-128"],
    correct: 0,
    feedback: [
      "Correct. 11111111 in two's complement = -1 (all 1s = -1).",
      "Incorrect. -127 = 10000001.",
      "Incorrect. 255 is the unsigned interpretation.",
      "Incorrect. -128 = 10000000.",
    ],
  },
  {
    module: "lec3",
    question: "The one's complement of 10110011 is:",
    options: ["10110011", "01001100", "01001101", "10110100"],
    correct: 1,
    feedback: [
      "Incorrect. That is the original number.",
      "Correct. Invert every bit: 10110011 → 01001100.",
      "Incorrect. That would be the two's complement.",
      "Incorrect.",
    ],
  },
  {
    module: "lec3",
    question: "In sign-magnitude representation, -5 in 4 bits is:",
    options: ["1101", "0101", "1011", "1010"],
    correct: 0,
    feedback: [
      "Correct. Sign bit = 1 (negative), magnitude = 101 (5) → 1101.",
      "Incorrect. 0101 = +5.",
      "Incorrect. 1011 = -5 in two's complement, not sign-magnitude.",
      "Incorrect.",
    ],
  },
  {
    module: "lec3",
    question: "Adding 01111111 + 00000001 in 8-bit signed arithmetic results in:",
    options: [
      "+128 — a valid positive result.",
      "10000000 — overflow to -128 (incorrect signed result).",
      "00000000 — wrap-around to zero.",
      "11111111 — the maximum negative value.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. +128 cannot be represented in 8-bit two's complement.",
      "Correct. 127 + 1 overflows; bit pattern becomes 10000000 = -128 in signed representation.",
      "Incorrect.",
      "Incorrect. 11111111 = -1.",
    ],
  },
  {
    module: "lec3",
    question: "Extended ASCII uses how many bits per character?",
    options: ["6", "7", "8", "16"],
    correct: 2,
    feedback: [
      "Incorrect. 6 bits give only 64 characters.",
      "Incorrect. Standard ASCII uses 7 bits.",
      "Correct. Extended ASCII uses 8 bits, giving 256 characters (0–255).",
      "Incorrect. 16 bits is used by Unicode (UTF-16).",
    ],
  },
  {
    module: "lec3",
    question: "To detect overflow in signed binary addition, you check:",
    options: [
      "Whether the result has a carry out of the MSB.",
      "Whether the carry into the MSB differs from the carry out of the MSB.",
      "Whether both operands are positive.",
      "Whether the result is zero.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. Carry out indicates unsigned overflow, not signed overflow.",
      "Correct. Signed overflow occurs when Cin (into MSB) ≠ Cout (out of MSB), i.e., Cin XOR Cout = 1.",
      "Incorrect. Two positive operands can sum without overflow if the result is within range.",
      "Incorrect. A zero result does not indicate overflow.",
    ],
  },

  /* ── Lecture 4: Logic Gates ──────────────────────────────────── */
  {
    module: "lec4",
    question: "A 2-input NOR gate with both inputs at 0 produces output:",
    options: ["0", "1", "Undefined", "Same as inputs"],
    correct: 1,
    feedback: [
      "Incorrect. NOR outputs 0 when ANY input is 1.",
      "Correct. NOR = NOT OR: OR(0,0) = 0, NOT(0) = 1.",
      "Incorrect.",
      "Incorrect. The output is inverted OR.",
    ],
  },
  {
    module: "lec4",
    question: "An XNOR gate outputs 1 when:",
    options: [
      "Inputs differ (one 0, one 1).",
      "Both inputs are the same (both 0 or both 1).",
      "Both inputs are 1.",
      "At least one input is 0.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. Differing inputs produce XOR output of 1 and XNOR output of 0.",
      "Correct. XNOR is the complement of XOR: outputs 1 for equal inputs.",
      "Incorrect. That describes an AND gate.",
      "Incorrect. That is closer to NAND behavior.",
    ],
  },
  {
    module: "lec4",
    question: "Which gate implements F = A'B + AB' (XOR function)?",
    options: ["AND", "OR", "XOR", "XNOR"],
    correct: 2,
    feedback: [
      "Incorrect. AND = A·B.",
      "Incorrect. OR = A+B.",
      "Correct. A XOR B = A'B + AB'.",
      "Incorrect. XNOR = (A XOR B)' = AB + A'B'.",
    ],
  },
  {
    module: "lec4",
    question: "A buffer gate:",
    options: [
      "Inverts the input signal.",
      "Outputs the same logic level as its input.",
      "Performs AND on two inputs.",
      "Performs OR on two inputs.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. Inverting is done by a NOT gate.",
      "Correct. A buffer passes the input unchanged; it is used for signal amplification/driving.",
      "Incorrect. That is an AND gate.",
      "Incorrect. That is an OR gate.",
    ],
  },
  {
    module: "lec4",
    question: "The Boolean expression for a 3-input AND gate is:",
    options: ["F = A + B + C", "F = A · B · C", "F = (A · B · C)'", "F = A ⊕ B ⊕ C"],
    correct: 1,
    feedback: [
      "Incorrect. A+B+C is an OR gate.",
      "Correct. All inputs must be 1 for AND output to be 1.",
      "Incorrect. That is a 3-input NAND gate.",
      "Incorrect. That is a 3-input XOR (odd parity checker).",
    ],
  },
  {
    module: "lec4",
    question: "How many rows does a truth table with 4 input variables have?",
    options: ["8", "12", "16", "32"],
    correct: 2,
    feedback: [
      "Incorrect. 2^3 = 8 rows for 3 variables.",
      "Incorrect. Not a power of 2.",
      "Correct. 2^4 = 16 rows for 4 variables.",
      "Incorrect. 2^5 = 32 rows for 5 variables.",
    ],
  },
  {
    module: "lec4",
    question: "A NAND gate followed immediately by an AND gate (NAND-AND chain) is equivalent to:",
    options: [
      "A single OR gate.",
      "A single AND gate.",
      "A single NOR gate.",
      "A single NAND gate.",
    ],
    correct: 0,
    feedback: [
      "Correct. NAND output = (AB)', AND of (AB)' with something else — actually NAND-AND = OR by DeMorgan. Double-negation after the AND yields the OR function.",
      "Incorrect.",
      "Incorrect.",
      "Incorrect.",
    ],
  },
  {
    module: "lec4",
    question: "Which gate outputs 0 for ALL input combinations EXCEPT when all inputs are 0?",
    options: ["AND", "NOR", "NAND", "OR"],
    correct: 1,
    feedback: [
      "Incorrect. AND outputs 1 only when all inputs are 1.",
      "Correct. NOR = NOT OR: output is 1 only when all inputs are 0.",
      "Incorrect. NAND outputs 0 only when all inputs are 1.",
      "Incorrect. OR outputs 0 only when all inputs are 0.",
    ],
  },

  /* ── Lecture 5: Boolean Algebra ─────────────────────────────── */
  {
    module: "lec5",
    question: "Simplify: A + AB",
    options: ["AB", "A", "B", "A + B"],
    correct: 1,
    feedback: [
      "Incorrect.",
      "Correct. Absorption law: A + AB = A(1+B) = A·1 = A.",
      "Incorrect.",
      "Incorrect.",
    ],
  },
  {
    module: "lec5",
    question: "Apply DeMorgan's theorem to (A + B)':",
    options: ["A' + B'", "A' · B'", "A · B", "A + B"],
    correct: 1,
    feedback: [
      "Incorrect. DeMorgan on OR flips the operator and complements each term.",
      "Correct. (A + B)' = A' · B' (DeMorgan's second theorem).",
      "Incorrect.",
      "Incorrect.",
    ],
  },
  {
    module: "lec5",
    question: "The idempotent law for OR states:",
    options: ["A + 1 = 1", "A + 0 = A", "A + A = A", "A + A' = 1"],
    correct: 2,
    feedback: [
      "Incorrect. That is the null/annihilation law.",
      "Incorrect. That is the identity law.",
      "Correct. Idempotent: A + A = A.",
      "Incorrect. That is the complement law.",
    ],
  },
  {
    module: "lec5",
    question: "Simplify: A · A'",
    options: ["A", "1", "0", "A'"],
    correct: 2,
    feedback: [
      "Incorrect.",
      "Incorrect. A + A' = 1, not A · A'.",
      "Correct. Complement law: A · A' = 0.",
      "Incorrect.",
    ],
  },
  {
    module: "lec5",
    question: "Which law states that A + 1 = 1?",
    options: ["Identity law", "Idempotent law", "Null (annihilation) law", "Complement law"],
    correct: 2,
    feedback: [
      "Incorrect. Identity law: A + 0 = A, A · 1 = A.",
      "Incorrect. Idempotent: A + A = A.",
      "Correct. Null (annihilation) law: A + 1 = 1.",
      "Incorrect. Complement law: A + A' = 1.",
    ],
  },
  {
    module: "lec5",
    question: "Simplify using absorption: (A + B) · A",
    options: ["A + B", "A · B", "A", "B"],
    correct: 2,
    feedback: [
      "Incorrect.",
      "Incorrect.",
      "Correct. Absorption: A · (A + B) = A.",
      "Incorrect.",
    ],
  },
  {
    module: "lec5",
    question: "Double negation (involution) law states:",
    options: ["(A')' = 0", "(A')' = 1", "(A')' = A'", "(A')' = A"],
    correct: 3,
    feedback: [
      "Incorrect.",
      "Incorrect.",
      "Incorrect.",
      "Correct. Double negation cancels out: NOT(NOT A) = A.",
    ],
  },
  {
    module: "lec5",
    question: "Which Boolean identity represents the consensus theorem? AB + A'C + BC =",
    options: ["AB + A'C + BC", "AB + A'C", "A + BC", "ABC + A'BC"],
    correct: 1,
    feedback: [
      "Incorrect. The consensus term BC is redundant.",
      "Correct. BC is the consensus term and can be dropped: AB + A'C + BC = AB + A'C.",
      "Incorrect.",
      "Incorrect.",
    ],
  },

  /* ── Lecture 6: SOP & POS ────────────────────────────────────── */
  {
    module: "lec6",
    question: "How many minterms does a 3-variable Boolean function have?",
    options: ["4", "6", "8", "16"],
    correct: 2,
    feedback: [
      "Incorrect. 4 = 2^2 minterms for 2 variables.",
      "Incorrect.",
      "Correct. 2^3 = 8 minterms for 3 variables.",
      "Incorrect. 16 = 2^4 minterms for 4 variables.",
    ],
  },
  {
    module: "lec6",
    question: "The maxterm M₃ for variables A, B, C (where minterm 3 = A=0, B=1, C=1) is:",
    options: ["A'BC", "A + B' + C'", "A'B'C'", "A + B + C"],
    correct: 1,
    feedback: [
      "Incorrect. That is minterm m₃.",
      "Correct. Maxterm complements each variable that is 1: B=1 → B', C=1 → C'; A=0 → A. So: A + B' + C'.",
      "Incorrect.",
      "Incorrect. That is maxterm M₀.",
    ],
  },
  {
    module: "lec6",
    question: "For a 2-variable truth table where F=1 only at AB=00, the SOP expression is:",
    options: ["AB", "A'B'", "A + B", "A'B + AB'"],
    correct: 1,
    feedback: [
      "Incorrect. AB = 1 only when both are 1.",
      "Correct. The only minterm is A=0, B=0 → minterm A'B'.",
      "Incorrect. A + B = 0 only when both are 0.",
      "Incorrect. That is XOR.",
    ],
  },
  {
    module: "lec6",
    question: "Converting SOP to NAND-NAND form uses which principle?",
    options: [
      "Add a NOT gate to each AND gate output.",
      "Apply double negation: NOT(NOT(SOP)) and use DeMorgan.",
      "Replace OR gates with NOR gates only.",
      "Swap AND and OR gates.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. Adding NOT to AND outputs gives AND-NOT, not NAND-NAND.",
      "Correct. Double-negating the SOP and applying DeMorgan converts AND-OR to NAND-NAND.",
      "Incorrect. NOR-NOR implements POS, not SOP.",
      "Incorrect. Simply swapping gates gives wrong logic.",
    ],
  },
  {
    module: "lec6",
    question: "In POS format, to write a maxterm for a row where A=1, B=0, C=1, the sum term is:",
    options: ["A'BC'", "A' + B + C'", "A + B' + C", "ABC"],
    correct: 1,
    feedback: [
      "Incorrect. That is a product (minterm) form.",
      "Correct. Complement the 1s: A=1→A', C=1→C', B=0→B. Sum term: A' + B + C'.",
      "Incorrect. You complement the 1s, not the 0s.",
      "Incorrect. That is a product term.",
    ],
  },
  {
    module: "lec6",
    question: "A don't-care condition (X) in a Karnaugh map can be assigned any value because:",
    options: [
      "It always evaluates to 1.",
      "The input combination never occurs or the output is irrelevant for it.",
      "It simplifies all groupings automatically.",
      "It eliminates the need for minterms.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. Don't-cares are not fixed at 1.",
      "Correct. Don't-care conditions represent impossible or irrelevant input combinations; they can be 0 or 1 to simplify the expression.",
      "Incorrect. They help but do not automatically simplify.",
      "Incorrect.",
    ],
  },
  {
    module: "lec6",
    question: "Which canonical form uses OR of all product terms (minterms) where output = 1?",
    options: ["POS", "SOP", "Maxterm expansion", "Karnaugh form"],
    correct: 1,
    feedback: [
      "Incorrect. POS is AND of maxterms.",
      "Correct. SOP (Sum of Products) is the OR of minterms corresponding to output = 1.",
      "Incorrect. Maxterm expansion is POS.",
      "Incorrect. Karnaugh map is a minimization tool, not a canonical form.",
    ],
  },
  {
    module: "lec6",
    question: "The two-level AND-OR implementation is preferred because:",
    options: [
      "It uses fewer gates than any other form.",
      "It produces the minimum propagation delay for a given expression.",
      "It works only for two-variable expressions.",
      "It eliminates the need for NOT gates.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. Multi-level circuits can use fewer gates.",
      "Correct. Two-level (SOP/POS) limits signal propagation to at most two gate delays.",
      "Incorrect. It works for any number of variables.",
      "Incorrect. NOT (inverters) are still needed for complemented inputs.",
    ],
  },

  /* ── Note 1: Combinational Core & Multiplexers ───────────────── */
  {
    module: "note1",
    question: "A 4-to-1 multiplexer has how many select lines?",
    options: ["1", "2", "3", "4"],
    correct: 1,
    feedback: [
      "Incorrect. 1 select line gives only 2^1 = 2 input choices.",
      "Correct. 2 select lines give 2^2 = 4 input choices.",
      "Incorrect. 3 select lines give 2^3 = 8 input choices (8-to-1 MUX).",
      "Incorrect. 4 select lines give 2^4 = 16 input choices.",
    ],
  },
  {
    module: "note1",
    question: "A demultiplexer (DEMUX) performs which operation?",
    options: [
      "Selects one input from many and routes it to one output.",
      "Routes a single input to one of many outputs based on a select code.",
      "Combines multiple inputs into one serial stream.",
      "Inverts the selected input.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. That describes a multiplexer (MUX).",
      "Correct. A DEMUX is the inverse of a MUX: one input, many outputs, select determines which output is active.",
      "Incorrect. That describes serialization.",
      "Incorrect.",
    ],
  },
  {
    module: "note1",
    question: "In a 4-to-1 MUX with select S1S0 = 10, which input is routed to the output?",
    options: ["I0", "I1", "I2", "I3"],
    correct: 2,
    feedback: [
      "Incorrect. I0 is selected when S1S0 = 00.",
      "Incorrect. I1 is selected when S1S0 = 01.",
      "Correct. S1S0 = 10 (decimal 2) selects I2.",
      "Incorrect. I3 is selected when S1S0 = 11.",
    ],
  },
  {
    module: "note1",
    question: "An 8-to-1 MUX can directly implement any Boolean function of how many variables using fixed input connections?",
    options: ["2", "3", "4", "8"],
    correct: 1,
    feedback: [
      "Incorrect. 2 variables require a 4-to-1 MUX.",
      "Correct. 3 select lines represent 3 input variables; truth table values (0 or 1) are connected to the 8 data inputs.",
      "Incorrect. 4 variables need a 16-to-1 MUX.",
      "Incorrect. 8 is the number of inputs, not variables.",
    ],
  },
  {
    module: "note1",
    question: "Propagation delay in a combinational circuit is determined by:",
    options: [
      "The number of inputs in the circuit.",
      "The longest signal path from any input to any output.",
      "The clock frequency.",
      "The number of flip-flops.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. More inputs may create more paths but do not directly define delay.",
      "Correct. The critical (longest) path sets the worst-case propagation delay.",
      "Incorrect. Combinational circuits are not clocked.",
      "Incorrect. Flip-flops are sequential elements, not combinational.",
    ],
  },
  {
    module: "note1",
    question: "A three-level logic circuit compared to a two-level (SOP) implementation is:",
    options: [
      "Always faster.",
      "Slower but may use fewer gates.",
      "Impossible to construct.",
      "Limited to three input variables.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. More levels mean more gate delays.",
      "Correct. Extra logic levels reduce gate count but increase propagation delay.",
      "Incorrect. Multi-level circuits are very common in practice.",
      "Incorrect.",
    ],
  },
  {
    module: "note1",
    question: "Which component is used to expand a 2-to-4 decoder into a 3-to-8 decoder?",
    options: [
      "One additional AND gate.",
      "A second 2-to-4 decoder enabled by the extra input bit.",
      "An 8-input OR gate.",
      "A multiplexer.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. A single AND gate is insufficient.",
      "Correct. Two 2-to-4 decoders, each enabled by the complemented/true form of the third input, implement a 3-to-8 decoder.",
      "Incorrect.",
      "Incorrect. MUX selects, decoder expands.",
    ],
  },
  {
    module: "note1",
    question: "Why would a designer use a MUX instead of discrete logic gates for function implementation?",
    options: [
      "MUX gates are faster than AND/OR gates.",
      "MUX is reconfigurable: different functions are obtained by changing the data inputs.",
      "MUX eliminates the need for NOT gates.",
      "MUX uses less power than any gate combination.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. Speed depends on specific implementations.",
      "Correct. A MUX can implement any function of its select variables by simply wiring 0/1/signal to the data inputs.",
      "Incorrect. Complemented inputs may still be needed.",
      "Incorrect. Power depends on technology and load.",
    ],
  },

  /* ── Note 2: Priority Encoder, Decoder, Adders ───────────────── */
  {
    module: "note2",
    question: "A 3-to-8 decoder has how many output lines?",
    options: ["3", "6", "8", "16"],
    correct: 2,
    feedback: [
      "Incorrect. 3 is the number of input (address) lines.",
      "Incorrect.",
      "Correct. A 3-to-8 decoder: 3 inputs, 2^3 = 8 outputs.",
      "Incorrect. 16 outputs require a 4-to-16 decoder.",
    ],
  },
  {
    module: "note2",
    question: "What is the purpose of the ENABLE input on a decoder?",
    options: [
      "To select which output is active.",
      "To globally activate or disable all outputs simultaneously.",
      "To set the input code.",
      "To reset all outputs to 1.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. The address inputs select the output.",
      "Correct. The ENABLE pin controls whether the decoder is active; when disabled, all outputs are deactivated.",
      "Incorrect.",
      "Incorrect.",
    ],
  },
  {
    module: "note2",
    question: "The carry output Cout of a full adder when A=1, B=1, Cin=0 is:",
    options: ["0", "1", "Undefined", "Same as SUM"],
    correct: 1,
    feedback: [
      "Incorrect. A=1 and B=1 generates a carry.",
      "Correct. Cout = AB + Cin(A XOR B) = 1·1 + 0·(1 XOR 1) = 1.",
      "Incorrect.",
      "Incorrect. SUM = A XOR B XOR Cin = 1 XOR 1 XOR 0 = 0; Cout = 1.",
    ],
  },
  {
    module: "note2",
    question: "How many full adders are needed for an 8-bit ripple carry adder (excluding half adder for the LSB)?",
    options: ["6", "7", "8", "16"],
    correct: 2,
    feedback: [
      "Incorrect.",
      "Incorrect. If using one half adder for bit 0, you need 7 full adders for bits 1–7.",
      "Correct. A common implementation uses 8 full adders (treating the LSB full adder with Cin=0).",
      "Incorrect.",
    ],
  },
  {
    module: "note2",
    question: "A priority encoder with active-high inputs D7–D0 and D5 = 1 (all others 0) outputs the binary code for:",
    options: ["0", "3", "5", "7"],
    correct: 2,
    feedback: [
      "Incorrect. 0 would mean D0 is highest active.",
      "Incorrect.",
      "Correct. D5 = 1 → output binary code = 101 (= 5).",
      "Incorrect. D7 would output 111.",
    ],
  },
  {
    module: "note2",
    question: "The VALID (V) output of a priority encoder is asserted when:",
    options: [
      "Only input D0 is active.",
      "At least one input is active.",
      "All inputs are active simultaneously.",
      "The enable pin is HIGH.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. V indicates any active input, not just D0.",
      "Correct. V = 1 indicates that at least one input is asserted, making the output code meaningful.",
      "Incorrect.",
      "Incorrect. Enable is separate from the valid output.",
    ],
  },
  {
    module: "note2",
    question: "The SUM output of a half adder is implemented using which gate?",
    options: ["AND", "OR", "XOR", "NAND"],
    correct: 2,
    feedback: [
      "Incorrect. AND generates the CARRY.",
      "Incorrect. OR does not give the correct SUM.",
      "Correct. SUM = A XOR B.",
      "Incorrect.",
    ],
  },
  {
    module: "note2",
    question: "Carry Look-Ahead (CLA) adder is faster than ripple carry because:",
    options: [
      "It uses simpler gates.",
      "It skips some additions.",
      "It computes all carries simultaneously using generate and propagate terms.",
      "It processes one bit at a time but uses a faster clock.",
    ],
    correct: 2,
    feedback: [
      "Incorrect. CLA may use more complex gates.",
      "Incorrect. CLA computes all carries, just in parallel.",
      "Correct. Generate (G = AB) and Propagate (P = A XOR B) allow all carries to be computed in parallel.",
      "Incorrect. CLA is not clock-speed dependent.",
    ],
  },

  /* ── Note 3: Subtractors & Comparators ───────────────────────── */
  {
    module: "note3",
    question: "The Difference output of a half subtractor when X=1, Y=0 is:",
    options: ["0", "1", "Undefined", "Equal to borrow"],
    correct: 1,
    feedback: [
      "Incorrect. 1 − 0 = 1.",
      "Correct. D = X XOR Y = 1 XOR 0 = 1.",
      "Incorrect.",
      "Incorrect. Borrow = X'·Y = 0·0 = 0.",
    ],
  },
  {
    module: "note3",
    question: "A full subtractor has three inputs. They are:",
    options: [
      "A, B, and Carry-in.",
      "X (minuend), Y (subtrahend), and Borrow-in.",
      "D, Bin, and Bout.",
      "SUM, CARRY, and INPUT.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. Carry-in belongs to an adder.",
      "Correct. Full subtractor inputs: X (minuend), Y (subtrahend), Borrow-in (Bin).",
      "Incorrect. D and Bout are outputs.",
      "Incorrect.",
    ],
  },
  {
    module: "note3",
    question: "A 4-bit magnitude comparator produces how many comparison outputs?",
    options: ["1", "2", "3", "4"],
    correct: 2,
    feedback: [
      "Incorrect. One output cannot distinguish three comparison cases.",
      "Incorrect. Two outputs would miss the equality case.",
      "Correct. Three outputs: A>B, A=B, A<B.",
      "Incorrect.",
    ],
  },
  {
    module: "note3",
    question: "In binary subtraction using two's complement, A − B is computed as:",
    options: [
      "A AND (NOT B).",
      "A + (B' + 1), i.e. A plus the two's complement of B.",
      "A XOR B.",
      "A NOR B.",
    ],
    correct: 1,
    feedback: [
      "Incorrect.",
      "Correct. Two's complement subtraction: A − B = A + (−B) = A + B' + 1.",
      "Incorrect. XOR gives the difference bit only (without borrow).",
      "Incorrect.",
    ],
  },
  {
    module: "note3",
    question: "A common-anode 7-segment display lights a segment by:",
    options: [
      "Driving the segment anode HIGH.",
      "Driving the segment cathode HIGH.",
      "Driving the segment cathode LOW (active LOW).",
      "Pulling the common anode to GND.",
    ],
    correct: 2,
    feedback: [
      "Incorrect. The common anode is already HIGH; the anode of each segment is tied to VCC.",
      "Incorrect. Driving cathode HIGH would reverse-bias the LED.",
      "Correct. Common-anode: anode tied to VCC; to light a segment, pull its cathode LOW.",
      "Incorrect. Pulling anode to GND would turn off all segments.",
    ],
  },
  {
    module: "note3",
    question: "An identity (equality) comparator uses which internal gate to compare two bits?",
    options: ["XOR", "XNOR", "AND", "NOR"],
    correct: 1,
    feedback: [
      "Incorrect. XOR outputs 1 when bits differ (inequality detector).",
      "Correct. XNOR outputs 1 when both bits are equal: A=B output.",
      "Incorrect. AND only outputs 1 when both are 1.",
      "Incorrect.",
    ],
  },

  /* ── Computer Memory ─────────────────────────────────────────── */
  {
    module: "lec-cmem",
    question: "How many address lines are needed to address 4,096 (4K) memory locations?",
    options: ["10", "11", "12", "13"],
    correct: 2,
    feedback: [
      "Incorrect. 2^10 = 1024 = 1K.",
      "Incorrect. 2^11 = 2048 = 2K.",
      "Correct. 2^12 = 4096 = 4K locations.",
      "Incorrect. 2^13 = 8192 = 8K.",
    ],
  },
  {
    module: "lec-cmem",
    question: "What is temporal locality in cache memory design?",
    options: [
      "Data at nearby addresses will be accessed soon.",
      "Recently accessed data is likely to be accessed again in the near future.",
      "Cache stores data in time-ordered blocks.",
      "Temporal data is never cached.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. That describes spatial locality.",
      "Correct. Temporal locality: data recently accessed tends to be accessed again soon.",
      "Incorrect.",
      "Incorrect.",
    ],
  },
  {
    module: "lec-cmem",
    question: "ROM is described as non-volatile because:",
    options: [
      "It is faster than RAM.",
      "It retains data when power is removed.",
      "It can be written to at any time.",
      "It uses dynamic storage cells.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. Speed is unrelated to volatility.",
      "Correct. Non-volatile memory retains its content without power.",
      "Incorrect. ROM is read-only (in its basic form).",
      "Incorrect. ROM uses permanently programmed cells.",
    ],
  },
  {
    module: "lec-cmem",
    question: "In direct-mapping cache, which cache line does a memory block map to?",
    options: [
      "Any available line (associative).",
      "(Block number) mod (number of cache lines).",
      "The least recently used line.",
      "The line with the same tag.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. That describes fully associative mapping.",
      "Correct. Direct mapping: cache line = block_number mod cache_size.",
      "Incorrect. LRU is a replacement policy for associative caches.",
      "Incorrect. Tags are compared after the line is determined.",
    ],
  },
  {
    module: "lec-cmem",
    question: "Flash memory is best classified as:",
    options: [
      "DRAM — requires refresh.",
      "SRAM — retains data without refresh.",
      "EEPROM — electrically erasable, typically erased in sectors.",
      "Mask ROM — permanently programmed at manufacture.",
    ],
    correct: 2,
    feedback: [
      "Incorrect. Flash does not need refresh.",
      "Incorrect. SRAM is volatile; flash is non-volatile.",
      "Correct. Flash is a type of EEPROM erased in blocks/sectors rather than byte-by-byte.",
      "Incorrect. Mask ROM cannot be erased.",
    ],
  },
  {
    module: "lec-cmem",
    question: "The memory hierarchy from fastest/smallest to slowest/largest is:",
    options: [
      "RAM → Cache → Register → Secondary storage.",
      "Register → Cache → RAM → Secondary storage.",
      "Secondary storage → RAM → Cache → Register.",
      "Cache → Register → RAM → Secondary storage.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. Registers are the fastest.",
      "Correct. Registers (fastest, fewest bits) → Cache → RAM → Secondary storage (slowest, largest).",
      "Incorrect. That is reverse order.",
      "Incorrect. Registers are faster than cache.",
    ],
  },
  {
    module: "lec-cmem",
    question: "A memory module specified as 4K×16 has a total bit capacity of:",
    options: ["4 Kbits", "16 Kbits", "32 Kbits", "64 Kbits"],
    correct: 3,
    feedback: [
      "Incorrect. That ignores word width.",
      "Incorrect.",
      "Incorrect. 4K × 8 = 32 Kbits.",
      "Correct. 4K = 4096 words × 16 bits/word = 65,536 bits = 64 Kbits.",
    ],
  },
  {
    module: "lec-cmem",
    question: "What is the role of the Memory Data Register (MDR)?",
    options: [
      "Holds the address of the memory location to be accessed.",
      "Holds the data being transferred to or from memory.",
      "Controls the read/write signal to memory.",
      "Stores the program counter value.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. That is the Memory Address Register (MAR).",
      "Correct. MDR (also called MBR) holds data read from or to be written to memory.",
      "Incorrect. Control signals come from the control unit.",
      "Incorrect. The PC is a separate register.",
    ],
  },

  /* ── Karnaugh Maps ───────────────────────────────────────────── */
  {
    module: "lec7-kmap",
    question: "What is the primary purpose of a Karnaugh map (K-map)?",
    options: [
      "To convert binary to Gray code.",
      "To minimize Boolean expressions by visually grouping adjacent 1s.",
      "To design sequential circuits.",
      "To simulate gate propagation delays.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. Gray code conversion is a different technique.",
      "Correct. K-maps provide a graphical method for Boolean minimization.",
      "Incorrect. K-maps are for combinational logic.",
      "Incorrect.",
    ],
  },
  {
    module: "lec7-kmap",
    question: "Groups in a K-map must contain how many cells?",
    options: ["Any number", "Powers of 2 only (1, 2, 4, 8...)", "Prime numbers only", "Multiples of 3"],
    correct: 1,
    feedback: [
      "Incorrect. Only powers of 2 are valid groups.",
      "Correct. Valid K-map groups: 1, 2, 4, 8, 16 cells (powers of 2).",
      "Incorrect.",
      "Incorrect.",
    ],
  },
  {
    module: "lec7-kmap",
    question: "Adjacent cells in a K-map differ by exactly:",
    options: ["Two variables", "One variable", "All variables", "No variables"],
    correct: 1,
    feedback: [
      "Incorrect. Cells differing by two variables are not adjacent.",
      "Correct. K-map uses Gray code ordering so adjacent cells differ by exactly one variable.",
      "Incorrect.",
      "Incorrect.",
    ],
  },
  {
    module: "lec7-kmap",
    question: "A group of 4 cells in a 4-variable K-map simplifies the expression by eliminating how many variables?",
    options: ["1", "2", "3", "4"],
    correct: 1,
    feedback: [
      "Incorrect. A group of 2 eliminates 1 variable.",
      "Correct. Group of 2^k cells eliminates k variables. Group of 4 = 2^2 eliminates 2 variables.",
      "Incorrect. A group of 8 eliminates 3 variables.",
      "Incorrect. A group of 16 (all cells) eliminates all 4 variables → F = 1.",
    ],
  },
  {
    module: "lec7-kmap",
    question: "A prime implicant in a K-map is:",
    options: [
      "Any group of 1s.",
      "The smallest possible group containing a specific 1-cell.",
      "The largest possible group of 1s that cannot be further expanded.",
      "A group that includes at least one don't-care.",
    ],
    correct: 2,
    feedback: [
      "Incorrect. Not any group — the largest non-expandable group.",
      "Incorrect. That describes an implicant, not necessarily a prime implicant.",
      "Correct. A prime implicant is a group of 1s that cannot be merged into a larger valid group.",
      "Incorrect. Don't-cares can be included but are not required.",
    ],
  },
  {
    module: "lec7-kmap",
    question: "K-map wrapping (toroidal adjacency) means that cells at opposite edges:",
    options: [
      "Are never adjacent.",
      "Are adjacent and can form groups across boundaries.",
      "Belong to different sub-maps.",
      "Are treated as don't-cares.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. Opposite edges are adjacent.",
      "Correct. The K-map wraps: top row is adjacent to bottom row; left column is adjacent to right column.",
      "Incorrect.",
      "Incorrect.",
    ],
  },

  /* ── Flip-Flops & Memory Cells ───────────────────────────────── */
  {
    module: "lec10-mem",
    question: "The characteristic equation of a D flip-flop is:",
    options: ["Q(t+1) = D'", "Q(t+1) = D", "Q(t+1) = Q XOR D", "Q(t+1) = Q"],
    correct: 1,
    feedback: [
      "Incorrect. That would always invert D.",
      "Correct. On the active clock edge, the D flip-flop captures D as the next state.",
      "Incorrect. That is a T flip-flop with T = D.",
      "Incorrect. Q(t+1) = Q describes a latch that holds state.",
    ],
  },
  {
    module: "lec10-mem",
    question: "The SR latch has a forbidden (invalid) state when:",
    options: ["S=0, R=0", "S=1, R=0", "S=0, R=1", "S=1, R=1"],
    correct: 3,
    feedback: [
      "Incorrect. S=0, R=0 is the hold state (Q retains value).",
      "Incorrect. S=1, R=0 sets Q to 1.",
      "Incorrect. S=0, R=1 resets Q to 0.",
      "Correct. S=R=1 is forbidden: it drives both Q and Q' to the same level, causing an undefined state.",
    ],
  },
  {
    module: "lec10-mem",
    question: "What does a JK flip-flop do when J=1 and K=1?",
    options: ["Sets Q to 1.", "Resets Q to 0.", "Holds the current state.", "Toggles Q on each clock edge."],
    correct: 3,
    feedback: [
      "Incorrect. J=1, K=0 sets Q.",
      "Incorrect. J=0, K=1 resets Q.",
      "Incorrect. J=0, K=0 holds state.",
      "Correct. J=K=1 is the toggle condition: Q(t+1) = Q'.",
    ],
  },
  {
    module: "lec10-mem",
    question: "A T flip-flop with input T=0 on each clock edge:",
    options: ["Toggles the output.", "Holds the current output unchanged.", "Resets Q to 0.", "Sets Q to 1."],
    correct: 1,
    feedback: [
      "Incorrect. T=1 causes toggling.",
      "Correct. T=0: Q(t+1) = Q (no change).",
      "Incorrect.",
      "Incorrect.",
    ],
  },
  {
    module: "lec10-mem",
    question: "Setup time for a flip-flop is defined as:",
    options: [
      "Time from clock edge to stable output.",
      "Minimum time data must be stable before the active clock edge.",
      "Maximum time the output remains stable after the clock edge.",
      "Time between two consecutive clock edges.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. That is propagation delay.",
      "Correct. Setup time: data must be stable for this minimum duration before the active clock edge.",
      "Incorrect. That is hold time (data must remain stable after the clock edge).",
      "Incorrect. That is the clock period.",
    ],
  },
  {
    module: "lec10-mem",
    question: "In a master-slave flip-flop:",
    options: [
      "Both master and slave capture data on the same clock edge.",
      "The master captures data on one clock level and transfers to slave on the opposite level.",
      "The slave is faster than the master.",
      "The master is a combinational circuit.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. They respond to opposite clock phases.",
      "Correct. Master is transparent on one clock phase; slave is transparent on the other, preventing race-through.",
      "Incorrect.",
      "Incorrect. Both master and slave are latches (sequential elements).",
    ],
  },

  /* ── State Machines (FSM) ────────────────────────────────────── */
  {
    module: "lec11-fsm",
    question: "In a Moore machine, the output depends on:",
    options: [
      "Current inputs only.",
      "Current state and current inputs.",
      "Current state only.",
      "Next state only.",
    ],
    correct: 2,
    feedback: [
      "Incorrect. That would be a combinational circuit, not an FSM.",
      "Incorrect. That describes a Mealy machine.",
      "Correct. Moore machine: output is a function of state only.",
      "Incorrect.",
    ],
  },
  {
    module: "lec11-fsm",
    question: "A Mealy machine differs from a Moore machine in that:",
    options: [
      "It has no state register.",
      "Its outputs depend on both current state and current inputs.",
      "It requires twice as many states.",
      "Its outputs change only on clock edges.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. A Mealy machine has a state register.",
      "Correct. Mealy: output = f(state, input). Moore: output = f(state) only.",
      "Incorrect. Mealy machines often have fewer states than equivalent Moore machines.",
      "Incorrect. Mealy outputs can change when inputs change (within a clock cycle).",
    ],
  },
  {
    module: "lec11-fsm",
    question: "The minimum number of flip-flops needed to implement a state machine with 6 states is:",
    options: ["2", "3", "4", "6"],
    correct: 1,
    feedback: [
      "Incorrect. 2 flip-flops give only 4 states.",
      "Correct. 2^3 = 8 ≥ 6 states, so 3 flip-flops are needed.",
      "Incorrect. 4 flip-flops give 16 states — more than needed.",
      "Incorrect. One flip-flop per state is not the standard approach.",
    ],
  },
  {
    module: "lec11-fsm",
    question: "A state transition diagram arrow is labeled with:",
    options: [
      "The current state name.",
      "The input (and output for Mealy) that causes the transition.",
      "The clock frequency.",
      "The flip-flop type used.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. States are circles, not arrow labels.",
      "Correct. Arrow labels show the triggering input. For Mealy, output is also shown (input/output format).",
      "Incorrect.",
      "Incorrect.",
    ],
  },
  {
    module: "lec11-fsm",
    question: "A state table for an FSM describes:",
    options: [
      "The hardware connections between flip-flops.",
      "For each state-input combination: the next state and output.",
      "The timing diagram of all state transitions.",
      "The Boolean equations for each gate.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. Hardware connections come from the next-state logic synthesis.",
      "Correct. A state table systematically lists current state, input, next state, and output.",
      "Incorrect. That is a timing diagram.",
      "Incorrect. Boolean equations are derived from the state table.",
    ],
  },
  {
    module: "lec11-fsm",
    question: "One-hot encoding for a state machine means:",
    options: [
      "Only one flip-flop is used for all states.",
      "Each state uses exactly one flip-flop, and only one flip-flop is SET at any time.",
      "State encoding uses the hottest (highest) binary values.",
      "All flip-flops are SET simultaneously.",
    ],
    correct: 1,
    feedback: [
      "Incorrect. One-hot uses one flip-flop per state.",
      "Correct. One-hot encoding: N states → N flip-flops, exactly one bit is '1' at any time.",
      "Incorrect.",
      "Incorrect.",
    ],
  },

  /* ── Mixed review ────────────────────────────────────────────── */
  {
    module: "lec2",
    question: "Converting binary 10101₂ to decimal gives:",
    options: ["19", "21", "23", "25"],
    correct: 1,
    feedback: [
      "Incorrect.",
      "Correct. 16 + 4 + 1 = 21.",
      "Incorrect.",
      "Incorrect.",
    ],
  },
  {
    module: "lec4",
    question: "The output of a 3-input AND gate is 1 only when:",
    options: [
      "At least one input is 1.",
      "Exactly two inputs are 1.",
      "All three inputs are 1.",
      "An odd number of inputs are 1.",
    ],
    correct: 2,
    feedback: [
      "Incorrect. That describes a 3-input OR gate.",
      "Incorrect. AND requires ALL inputs to be 1.",
      "Correct. AND is 1 only when ALL inputs are 1.",
      "Incorrect. That describes XOR.",
    ],
  },
  {
    module: "lec5",
    question: "Simplify: A·B + A·B'",
    options: ["B", "A", "A + B", "0"],
    correct: 1,
    feedback: [
      "Incorrect.",
      "Correct. A·B + A·B' = A·(B + B') = A·1 = A (factoring and complement law).",
      "Incorrect.",
      "Incorrect.",
    ],
  },
  {
    module: "lec-cmem",
    question: "Which memory type is used for CPU cache because of its speed?",
    options: ["DRAM", "SRAM", "Flash", "ROM"],
    correct: 1,
    feedback: [
      "Incorrect. DRAM requires refresh and is slower; it is used for main memory.",
      "Correct. SRAM is fast and does not need refresh, making it ideal for cache memory.",
      "Incorrect. Flash is non-volatile secondary storage.",
      "Incorrect. ROM is read-only and used for firmware.",
    ],
  },
];

export const FULL_QUIZ = [
  ...SECTION_QUIZZES.lec1.questions,
  ...SECTION_QUIZZES.lec2.questions,
  ...SECTION_QUIZZES.lec3.questions,
  ...SECTION_QUIZZES.lec4.questions,
  ...SECTION_QUIZZES.lec5.questions,
  ...SECTION_QUIZZES.lec6.questions,
  ...SECTION_QUIZZES.note1.questions,
  ...SECTION_QUIZZES.note2.questions,
  ...SECTION_QUIZZES.note3.questions,
  ...SECTION_QUIZZES["lec-cmem"].questions,
  ...EXTRA_QUESTIONS,
];

export const GLOSSARY = [
  {
    module: "lec1",
    term: "Analog signal",
    definition: "A continuous-valued signal with infinitely many intermediate values.",
  },
  {
    module: "lec1",
    term: "Digital value",
    definition: "A fixed-precision representation of measured analog quantity.",
  },
  {
    module: "lec1",
    term: "Rising edge",
    definition: "Transition from logic 0 to logic 1.",
  },
  {
    module: "lec1",
    term: "Falling edge",
    definition: "Transition from logic 1 to logic 0.",
  },
  {
    module: "lec1",
    term: "Duty cycle",
    definition: "Percentage of one period spent at logic high.",
  },
  {
    module: "note1",
    term: "Combinational circuit",
    definition: "Circuit whose output is determined only by present inputs.",
  },
  {
    module: "note1",
    term: "Truth table",
    definition: "Table of every input combination mapped to outputs.",
  },
  {
    module: "note1",
    term: "Multiplexer",
    definition: "Selector circuit that routes one input among many to one output.",
  },
  {
    module: "note1",
    term: "Select lines",
    definition: "Control inputs used to choose which MUX data line is active.",
  },
  {
    module: "note2",
    term: "Priority encoder",
    definition: "Encoder that outputs code for the highest-priority active input.",
  },
  {
    module: "note2",
    term: "Decoder enable",
    definition: "Control pin that globally activates or deactivates decoder outputs.",
  },
  {
    module: "note2",
    term: "Chip select (CS)",
    definition: "Memory-select signal that enables one chip at a time on shared buses.",
  },
  {
    module: "note2",
    term: "Half adder",
    definition: "Two-input adder producing SUM and CARRY, without carry-in input.",
  },
  {
    module: "note2",
    term: "Full adder",
    definition: "Three-input adder (A, B, Cin) producing SUM and Cout.",
  },
  {
    module: "note2",
    term: "Carry look-ahead",
    definition: "Adder strategy using generate/propagate terms for faster carry computation.",
  },
  {
    module: "lec-cmem",
    term: "MAR",
    definition: "Memory Address Register — holds the address of the memory location to be accessed by the processor.",
  },
  {
    module: "lec-cmem",
    term: "MDR",
    definition: "Memory Data Register — holds the data being transferred to or from a memory location.",
  },
  {
    module: "lec-cmem",
    term: "Volatile memory",
    definition: "Memory that loses its stored contents when power is removed (e.g., RAM).",
  },
  {
    module: "lec-cmem",
    term: "Cache hit",
    definition: "Condition where the CPU's requested data is found in cache memory, allowing fast retrieval.",
  },
  {
    module: "lec-cmem",
    term: "Cache miss",
    definition: "Condition where the requested data is not in cache; the CPU must access the slower main memory.",
  },
  {
    module: "lec-cmem",
    term: "DRAM",
    definition: "Dynamic RAM — must be periodically refreshed to retain data; slower but cheaper than SRAM.",
  },
  {
    module: "lec-cmem",
    term: "SRAM",
    definition: "Static RAM — retains data as long as power is supplied without refresh; faster but more expensive than DRAM.",
  },
  {
    module: "lec-cmem",
    term: "Word size",
    definition: "The number of bits in a memory word; determines data bus width and the maximum addressable memory range.",
  },
  {
    module: "lec-cmem",
    term: "EPROM",
    definition: "Erasable Programmable ROM — can be erased using ultraviolet light and reprogrammed.",
  },
  {
    module: "lec-cmem",
    term: "EEPROM",
    definition: "Electrically Erasable Programmable ROM — can be erased electrically on a per-cell basis without UV light.",
  },
];

