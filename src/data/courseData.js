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
    ],
  },
  {
    label: "Practice",
    items: [
      { id: "flashcards", short: "FC", title: "Flashcards" },
      { id: "section-quizzes", short: "SQ", title: "Section Quizzes" },
      { id: "full-quiz", short: "FQ", title: "Full Quiz" },
      { id: "ai-quiz", short: "AI", title: "✦ AI Quiz" },
    ],
  },
];

export const PAGE_IDS = NAV_ITEMS.flatMap((group) => group.items.map((item) => item.id));

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
];

