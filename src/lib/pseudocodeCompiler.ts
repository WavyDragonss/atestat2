export type CompileOptions = {
  wildcardMode?: boolean;
};

export type CompileIssue = {
  line: number;
  message: string;
  source: string;
};

export type CompileResult = {
  normalizedPseudocode: string;
  js: string;
  issues: CompileIssue[];
};

export type CppResult = {
  normalizedPseudocode: string;
  cpp: string;
  issues: CompileIssue[];
};

export type ExecutionResult = {
  compile: CompileResult;
  outputs: string[];
  runtimeError: string | null;
};

type BlockType = "if" | "while" | "for" | "repeat";

type BlockEntry = {
  type: BlockType;
  line: number;
};

const INDENT = "  ";

function stripDiacritics(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function normalizeForMatch(line: string) {
  return stripDiacritics(line)
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeSourceLine(line: string) {
  let out = line;

  out = out
    .replace(/[\u2500-\u257f\u25a0]/g, " ")
    .replace(/[\u21d0\u21e6\u2190\u27f5\uf0df]/g, " <- ")
    .replace(/[\u2265]/g, " >= ")
    .replace(/[\u2264]/g, " <= ")
    .replace(/[\u2260]/g, " != ")
    .replace(/[\u2194\u27f7\uf0ab]/g, " <-> ")
    .replace(/^\s*[\|:]+\s*/, "")
    .replace(/\s+/g, " ")
    .trim();

  // Common OCR cleanup for command keywords (e.g. iteste -> citeste).
  out = out
    .replace(/^\s*i(?:te?ste)\b/i, "citeste")
    .replace(/^\s*afisea[sz]a\b/i, "afiseaza");

  if (/^\(.+\)$/.test(out)) {
    return `# ${out.slice(1, -1).trim()}`;
  }

  return out;
}

function closeTokenFor(type: BlockType) {
  if (type === "if") {
    return "sfarsit_daca";
  }
  if (type === "while") {
    return "sfarsit_cat_timp";
  }
  if (type === "for") {
    return "sfarsit_pentru";
  }
  return "pana cand false";
}

function inferOpenType(normalizedLine: string): BlockType | null {
  if (/^(daca|if)\s+.+\s+(atunci|then)$/.test(normalizedLine)) {
    return "if";
  }
  if (/^(cat\s+timp|while)\s+.+(?:\s+(executa|do))?$/.test(normalizedLine)) {
    return "while";
  }
  if (/^(pentru|for)\s+[a-z_][a-z0-9_]*\s*(?:<-|=)\s+.+/.test(normalizedLine)) {
    return "for";
  }
  if (/^(repeta|repeat)$/.test(normalizedLine)) {
    return "repeat";
  }
  return null;
}

function inferCloseType(normalizedLine: string): BlockType | null {
  if (/^(sfarsit_daca|sfarsit daca|endif|end if)$/.test(normalizedLine)) {
    return "if";
  }
  if (/^(sfarsit_cat_timp|sfarsit cat timp|sfarsit_while|end while)$/.test(normalizedLine)) {
    return "while";
  }
  if (/^(sfarsit_pentru|sfarsit pentru|end for)$/.test(normalizedLine)) {
    return "for";
  }
  if (/^(pana\s+cand|until)\s+.+$/.test(normalizedLine)) {
    return "repeat";
  }
  return null;
}

export function normalizePseudocode(input: string) {
  const rawLines = input.replace(/\r\n/g, "\n").split("\n");
  const normalizedLines: string[] = [];
  const visualStack: BlockType[] = [];

  for (const rawLine of rawLines) {
    const rawTrimmed = rawLine.trim();
    const hasVisualCloser = /^[\s└┘┴─\-_=■]+$/.test(rawTrimmed) && /[└┘■]/.test(rawTrimmed);

    let normalized = normalizeSourceLine(rawLine);

    if (!normalized && hasVisualCloser) {
      const top = visualStack.pop();
      normalized = top ? closeTokenFor(top) : "";
    }

    if (!normalized) {
      normalizedLines.push("");
      continue;
    }

    const key = normalizeForMatch(normalized);
    const closeType = inferCloseType(key);
    if (closeType && visualStack[visualStack.length - 1] === closeType) {
      visualStack.pop();
    }

    normalizedLines.push(normalized);

    const openType = inferOpenType(key);
    if (openType) {
      visualStack.push(openType);
    }
  }

  return normalizedLines.join("\n");
}

export function describeStructureGuide(input: string) {
  const lines = normalizePseudocode(input).split("\n");
  const stack: BlockType[] = [];
  const guide: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      continue;
    }

    const key = normalizeForMatch(trimmed);
    const closeType = inferCloseType(key);
    if (closeType) {
      if (stack.length > 0) {
        stack.pop();
      }
      guide.push(`${"| ".repeat(stack.length)}-= ${trimmed}`);
      continue;
    }

    guide.push(`${"| ".repeat(stack.length)}| ${trimmed}`);

    const openType = inferOpenType(key);
    if (openType) {
      stack.push(openType);
    }
  }

  return guide.join("\n");
}

export function formatAndTranslatePseudocode(input: string) {
  const normalized = normalizePseudocode(input);
  const lines = normalized.split("\n");

  const translated = lines.map((line) => {
    let out = line;
    out = out
      .replace(/^\s*citeste\b/i, "read")
      .replace(/^\s*scrie\b/i, "write")
      .replace(/^\s*afiseaza\b/i, "write")
      .replace(/^\s*daca\b/i, "if")
      .replace(/\batunci\b/gi, "then")
      .replace(/^\s*altfel\b/i, "else")
      .replace(/^\s*sfarsit_daca\b/i, "end if")
      .replace(/^\s*sfarsit daca\b/i, "end if")
      .replace(/^\s*cat timp\b/i, "while")
      .replace(/\bexecuta\b/gi, "do")
      .replace(/^\s*sfarsit_cat_timp\b/i, "end while")
      .replace(/^\s*sfarsit cat timp\b/i, "end while")
      .replace(/^\s*pentru\b/i, "for")
      .replace(/^\s*sfarsit_pentru\b/i, "end for")
      .replace(/^\s*sfarsit pentru\b/i, "end for")
      .replace(/^\s*repeta\b/i, "repeat")
      .replace(/^\s*pana cand\b/i, "until");

    return out;
  });

  return translated.join("\n");
}

function normalizeOperatorsBase(expression: string) {
  return expression
    .trim()
    .replace(/\u2260/g, "!=")
    .replace(/\u2264/g, "<=")
    .replace(/\u2265/g, ">=")
    .replace(/\bdiv\b/gi, "/")
    .replace(/\bmod\b/gi, "%")
    .replace(/\bsi\b/gi, "&&")
    .replace(/\bsau\b/gi, "||")
    .replace(/\bnu\b/gi, "!");
}

function normalizeOperatorsJs(expression: string) {
  let out = normalizeOperatorsBase(expression);

  out = out.replace(/\[([^\[\]]+)\]/g, "Math.floor($1)");
  out = out.replace(/([^<>!=])=([^=])/g, "$1===$2");
  out = out.replace(/^=([^=])/g, "===$1");

  return out;
}

function normalizeOperatorsCpp(expression: string) {
  let out = normalizeOperatorsBase(expression);

  out = out.replace(/\[([^\[\]]+)\]/g, "((int)($1))");
  out = out.replace(/([^<>!=])=([^=])/g, "$1==$2");
  out = out.replace(/^=([^=])/g, "==$1");

  return out;
}

function parseForLine(line: string) {
  const normalized = normalizeForMatch(line);

  const csvStep = normalized.match(
    /^(?:pentru|for)\s+([a-z_][a-z0-9_]*)\s*(?:<-|=)\s*(.+?)\s*,\s*(.+?)\s*,\s*(.+?)(?:\s+(?:executa|do))?$/i,
  );
  if (csvStep) {
    return {
      variable: csvStep[1],
      start: csvStep[2],
      end: csvStep[3],
      step: csvStep[4],
    };
  }

  const optionalStep = normalized.match(
    /^(?:pentru|for)\s+([a-z_][a-z0-9_]*)\s*(?:<-|=)\s*(.+?)\s*,\s*(.+?)(?:\s+pas\s+(.+?))?(?:\s+(?:executa|do))?$/i,
  );
  if (!optionalStep) {
    return null;
  }

  return {
    variable: optionalStep[1],
    start: optionalStep[2],
    end: optionalStep[3],
    step: optionalStep[4] ?? "1",
  };
}

function parseReadVariables(line: string) {
  const normalizedLine = stripDiacritics(line);
  const trimmed = normalizedLine.trim();
  const firstSpace = trimmed.indexOf(" ");
  if (firstSpace === -1) {
    return null;
  }

  const command = trimmed.slice(0, firstSpace).toLowerCase();
  const payload = trimmed.slice(firstSpace + 1).trim();

  const isReadCommand =
    command === "read" ||
    command === "citeste" ||
    command === "iteste" ||
    command.endsWith("iteste") ||
    command.endsWith("citeste");

  if (!isReadCommand || !payload) {
    return null;
  }

  return payload
    .split(",")
    .map((token) => token.trim())
    .filter(Boolean)
    .filter((token) => /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(token));
}

function parseWriteArgs(line: string) {
  const normalizedLine = stripDiacritics(line);
  const trimmed = normalizedLine.trim();
  const firstSpace = trimmed.indexOf(" ");
  if (firstSpace === -1) {
    return null;
  }

  const command = trimmed.slice(0, firstSpace).toLowerCase();
  const payload = trimmed.slice(firstSpace + 1).trim();

  const isWriteCommand =
    command === "scrie" ||
    command === "afiseaza" ||
    command === "print" ||
    command === "write" ||
    command.endsWith("fiseaza");

  if (!isWriteCommand || !payload) {
    return null;
  }

  return payload
    .split(",")
    .map((token) => token.trim())
    .filter(Boolean);
}

function parseAssignment(line: string) {
  const assignMatch = line.match(/^\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*(?:<-|\u2190)(?!>)\s*(.+)$/);
  if (!assignMatch) {
    return null;
  }

  return {
    variable: assignMatch[1],
    expression: assignMatch[2],
  };
}

function parseSwap(line: string) {
  const swapMatch = line.match(/^\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*(?:<->|<=>)\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*$/);
  if (!swapMatch) {
    return null;
  }

  return {
    left: swapMatch[1],
    right: swapMatch[2],
  };
}

function parseInputValues(raw: string) {
  return raw
    .split(/[\s,;]+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

function currentIndent(level: number) {
  return INDENT.repeat(Math.max(level, 0));
}

export function extractReadVariables(input: string) {
  const normalizedPseudocode = normalizePseudocode(input);
  const lines = normalizedPseudocode.split("\n");
  const vars = new Set<string>();

  for (const line of lines) {
    const parsed = parseReadVariables(line.trim());
    if (!parsed) {
      continue;
    }
    for (const variable of parsed) {
      vars.add(variable);
    }
  }

  return [...vars];
}

function compileSingleInstructionJs(
  line: string,
  indentLevel: number,
  declaredVars: Set<string>,
  generated: string[],
): boolean {
  const swap = parseSwap(line);
  if (swap) {
    if (!declaredVars.has(swap.left)) {
      generated.push(`${currentIndent(indentLevel)}let ${swap.left} = 0;`);
      declaredVars.add(swap.left);
    }
    if (!declaredVars.has(swap.right)) {
      generated.push(`${currentIndent(indentLevel)}let ${swap.right} = 0;`);
      declaredVars.add(swap.right);
    }
    generated.push(`${currentIndent(indentLevel)}[${swap.left}, ${swap.right}] = [${swap.right}, ${swap.left}];`);
    return true;
  }

  const readVariables = parseReadVariables(line);
  if (readVariables) {
    for (const variable of readVariables) {
      const statement = declaredVars.has(variable)
        ? `${variable} = __read("${variable} = ");`
        : `let ${variable} = __read("${variable} = ");`;
      declaredVars.add(variable);
      generated.push(`${currentIndent(indentLevel)}${statement}`);
    }
    return true;
  }

  const writeArgs = parseWriteArgs(line);
  if (writeArgs) {
    generated.push(`${currentIndent(indentLevel)}__write(${writeArgs.map((arg) => normalizeOperatorsJs(arg)).join(", ")});`);
    return true;
  }

  const assignment = parseAssignment(line);
  if (assignment) {
    const expression = normalizeOperatorsJs(assignment.expression);
    const statement = declaredVars.has(assignment.variable)
      ? `${assignment.variable} = ${expression};`
      : `let ${assignment.variable} = ${expression};`;
    declaredVars.add(assignment.variable);
    generated.push(`${currentIndent(indentLevel)}${statement}`);
    return true;
  }

  return false;
}

export function compilePseudocode(input: string, options: CompileOptions = {}): CompileResult {
  const wildcardMode = options.wildcardMode ?? true;
  const normalizedPseudocode = normalizePseudocode(input);
  const lines = normalizedPseudocode.split("\n");

  const generated: string[] = [];
  const issues: CompileIssue[] = [];
  const declaredVars = new Set<string>();
  const stack: BlockEntry[] = [];

  let indentLevel = 0;

  generated.push("// Generated by pseudocode compiler");
  generated.push("const __outputs = [];");
  generated.push("const __inputs = Array.isArray(globalThis.__pseudoInputs) ? globalThis.__pseudoInputs : [];");
  generated.push("let __inputIndex = 0;");
  generated.push(
    "function __coerce(raw) { const value = Number(raw); return Number.isNaN(value) ? raw ?? '' : value; }",
  );
  generated.push(
    "function __read(label) { if (__inputIndex < __inputs.length) { const value = __inputs[__inputIndex++]; return __coerce(value); } const raw = typeof prompt === 'function' ? prompt(label) : '0'; return __coerce(raw); }",
  );
  generated.push("function __write(...values) { const chunk = values.map((value) => String(value)).join(''); __outputs.push(chunk); console.log(chunk); }");
  generated.push("");

  for (let i = 0; i < lines.length; i += 1) {
    const source = lines[i];
    const trimmed = source.trim();

    if (!trimmed) {
      generated.push("");
      continue;
    }

    const normalized = normalizeForMatch(trimmed);

    if (normalized.startsWith("//") || normalized.startsWith("#")) {
      generated.push(`${currentIndent(indentLevel)}// ${trimmed.replace(/^\s*(?:#|\/\/)+\s*/, "")}`);
      continue;
    }

    if (/^(altfel|else)$/.test(normalized)) {
      const top = stack[stack.length - 1];
      if (!top || top.type !== "if") {
        issues.push({ line: i + 1, message: "altfel fara daca corespunzator.", source });
        continue;
      }

      indentLevel -= 1;
      generated.push(`${currentIndent(indentLevel)}} else {`);
      indentLevel += 1;
      continue;
    }

    if (/^(sfarsit_daca|sfarsit daca|endif|end if)$/.test(normalized)) {
      const top = stack.pop();
      if (!top || top.type !== "if") {
        issues.push({ line: i + 1, message: "sfarsit_daca fara bloc daca deschis.", source });
        continue;
      }

      indentLevel -= 1;
      generated.push(`${currentIndent(indentLevel)}}`);
      continue;
    }

    if (/^(sfarsit_cat_timp|sfarsit cat timp|sfarsit_while|end while)$/.test(normalized)) {
      const top = stack.pop();
      if (!top || top.type !== "while") {
        issues.push({ line: i + 1, message: "sfarsit_cat_timp fara bloc cat timp deschis.", source });
        continue;
      }

      indentLevel -= 1;
      generated.push(`${currentIndent(indentLevel)}}`);
      continue;
    }

    if (/^(sfarsit_pentru|sfarsit pentru|end for)$/.test(normalized)) {
      const top = stack.pop();
      if (!top || top.type !== "for") {
        issues.push({ line: i + 1, message: "sfarsit_pentru fara bloc pentru deschis.", source });
        continue;
      }

      indentLevel -= 1;
      generated.push(`${currentIndent(indentLevel)}}`);
      continue;
    }

    const untilMatch = normalized.match(/^(pana\s+cand|until)\s+(.+)$/i);
    if (untilMatch) {
      const top = stack.pop();
      if (!top || top.type !== "repeat") {
        issues.push({ line: i + 1, message: "pana cand fara bloc repeta deschis.", source });
        continue;
      }

      indentLevel -= 1;
      const condition = normalizeOperatorsJs(untilMatch[2]);
      generated.push(`${currentIndent(indentLevel)}} while (!(${condition}));`);
      continue;
    }

    const ifInlineMatch = normalized.match(/^(daca|if)\s+(.+?)\s+(atunci|then)\s+(.+)$/i);
    if (ifInlineMatch) {
      const condition = normalizeOperatorsJs(ifInlineMatch[2]);
      generated.push(`${currentIndent(indentLevel)}if (${condition}) {`);
      const handledInline = compileSingleInstructionJs(ifInlineMatch[4], indentLevel + 1, declaredVars, generated);
      if (!handledInline) {
        generated.push(`${currentIndent(indentLevel + 1)}// [wildcard] ${ifInlineMatch[4]}`);
        issues.push({
          line: i + 1,
          message: "Instructiune inline dupa daca nerecunoscuta.",
          source,
        });
      }
      generated.push(`${currentIndent(indentLevel)}}`);
      continue;
    }

    const ifMatch = normalized.match(/^(daca|if)\s+(.+?)\s+(atunci|then)$/i);
    if (ifMatch) {
      const condition = normalizeOperatorsJs(ifMatch[2]);
      generated.push(`${currentIndent(indentLevel)}if (${condition}) {`);
      stack.push({ type: "if", line: i + 1 });
      indentLevel += 1;
      continue;
    }

    const whileMatch = normalized.match(/^(cat\s+timp|while)\s+(.+?)\s*(executa|do)?$/i);
    if (whileMatch) {
      const condition = normalizeOperatorsJs(whileMatch[2]);
      generated.push(`${currentIndent(indentLevel)}while (${condition}) {`);
      stack.push({ type: "while", line: i + 1 });
      indentLevel += 1;
      continue;
    }

    if (/^(repeta|repeat)$/.test(normalized)) {
      generated.push(`${currentIndent(indentLevel)}do {`);
      stack.push({ type: "repeat", line: i + 1 });
      indentLevel += 1;
      continue;
    }

    const parsedFor = parseForLine(trimmed);
    if (parsedFor) {
      const stepName = `__step_${parsedFor.variable}_${i + 1}`;
      const start = normalizeOperatorsJs(parsedFor.start);
      const end = normalizeOperatorsJs(parsedFor.end);
      const step = normalizeOperatorsJs(parsedFor.step);
      generated.push(`${currentIndent(indentLevel)}const ${stepName} = (${step});`);
      generated.push(
        `${currentIndent(indentLevel)}for (let ${parsedFor.variable} = (${start}); ${stepName} >= 0 ? ${parsedFor.variable} <= (${end}) : ${parsedFor.variable} >= (${end}); ${parsedFor.variable} += ${stepName}) {`,
      );
      declaredVars.add(parsedFor.variable);
      stack.push({ type: "for", line: i + 1 });
      indentLevel += 1;
      continue;
    }

    const handled = compileSingleInstructionJs(trimmed, indentLevel, declaredVars, generated);
    if (handled) {
      continue;
    }

    if (wildcardMode) {
      generated.push(`${currentIndent(indentLevel)}// [wildcard] ${trimmed}`);
      issues.push({
        line: i + 1,
        message: "Linie necunoscuta; pastrata ca comentariu in modul wildcard.",
        source,
      });
      continue;
    }

    issues.push({ line: i + 1, message: "Instructiune necunoscuta.", source });
  }

  while (stack.length > 0) {
    const open = stack.pop();
    if (!open) {
      break;
    }

    indentLevel -= 1;
    if (open.type === "repeat") {
      generated.push(`${currentIndent(indentLevel)}} while (true);`);
      issues.push({
        line: open.line,
        message: "Bloc repeta neinchis; s-a adaugat inchidere implicita.",
        source: lines[open.line - 1] ?? "",
      });
      continue;
    }

    generated.push(`${currentIndent(indentLevel)}}`);
    issues.push({
      line: open.line,
      message: `Bloc ${open.type} neinchis; s-a adaugat inchidere implicita.`,
      source: lines[open.line - 1] ?? "",
    });
  }

  generated.push("");
  generated.push("// Output captured during execution");
  generated.push("__outputs;");

  return {
    normalizedPseudocode,
    js: generated.join("\n"),
    issues,
  };
}

function compileSingleInstructionCpp(
  line: string,
  indentLevel: number,
  declaredVars: Set<string>,
  generated: string[],
): boolean {
  const swap = parseSwap(line);
  if (swap) {
    if (!declaredVars.has(swap.left)) {
      generated.push(`${currentIndent(indentLevel)}int ${swap.left} = 0;`);
      declaredVars.add(swap.left);
    }
    if (!declaredVars.has(swap.right)) {
      generated.push(`${currentIndent(indentLevel)}int ${swap.right} = 0;`);
      declaredVars.add(swap.right);
    }
    generated.push(`${currentIndent(indentLevel)}swap(${swap.left}, ${swap.right});`);
    return true;
  }

  const readVariables = parseReadVariables(line);
  if (readVariables) {
    for (const variable of readVariables) {
      if (!declaredVars.has(variable)) {
        generated.push(`${currentIndent(indentLevel)}int ${variable};`);
        declaredVars.add(variable);
      }
      generated.push(`${currentIndent(indentLevel)}cin >> ${variable};`);
    }
    return true;
  }

  const writeArgs = parseWriteArgs(line);
  if (writeArgs) {
    const parts = writeArgs.map((arg) => normalizeOperatorsCpp(arg));
    if (parts.length === 0) {
      return true;
    }

    const stream = parts.join(" << ");
    generated.push(`${currentIndent(indentLevel)}cout << ${stream};`);
    return true;
  }

  const assignment = parseAssignment(line);
  if (assignment) {
    const expression = normalizeOperatorsCpp(assignment.expression);
    if (declaredVars.has(assignment.variable)) {
      generated.push(`${currentIndent(indentLevel)}${assignment.variable} = ${expression};`);
    } else {
      generated.push(`${currentIndent(indentLevel)}int ${assignment.variable} = ${expression};`);
      declaredVars.add(assignment.variable);
    }
    return true;
  }

  return false;
}

export function transpilePseudocodeToCpp(input: string, options: CompileOptions = {}): CppResult {
  const wildcardMode = options.wildcardMode ?? true;
  const normalizedPseudocode = normalizePseudocode(input);
  const lines = normalizedPseudocode.split("\n");

  const generated: string[] = [];
  const issues: CompileIssue[] = [];
  const declaredVars = new Set<string>();
  const stack: BlockEntry[] = [];

  let indentLevel = 1;

  generated.push("#include <iostream>");
  generated.push("using namespace std;");
  generated.push("");
  generated.push("int main() {");

  for (let i = 0; i < lines.length; i += 1) {
    const source = lines[i];
    const trimmed = source.trim();

    if (!trimmed) {
      generated.push("");
      continue;
    }

    const normalized = normalizeForMatch(trimmed);

    if (normalized.startsWith("//") || normalized.startsWith("#")) {
      generated.push(`${currentIndent(indentLevel)}// ${trimmed.replace(/^\s*(?:#|\/\/)+\s*/, "")}`);
      continue;
    }

    if (/^(altfel|else)$/.test(normalized)) {
      const top = stack[stack.length - 1];
      if (!top || top.type !== "if") {
        issues.push({ line: i + 1, message: "altfel fara daca corespunzator.", source });
        continue;
      }

      indentLevel -= 1;
      generated.push(`${currentIndent(indentLevel)}} else {`);
      indentLevel += 1;
      continue;
    }

    if (/^(sfarsit_daca|sfarsit daca|endif|end if)$/.test(normalized)) {
      const top = stack.pop();
      if (!top || top.type !== "if") {
        issues.push({ line: i + 1, message: "sfarsit_daca fara bloc daca deschis.", source });
        continue;
      }

      indentLevel -= 1;
      generated.push(`${currentIndent(indentLevel)}}`);
      continue;
    }

    if (/^(sfarsit_cat_timp|sfarsit cat timp|sfarsit_while|end while)$/.test(normalized)) {
      const top = stack.pop();
      if (!top || top.type !== "while") {
        issues.push({ line: i + 1, message: "sfarsit_cat_timp fara bloc cat timp deschis.", source });
        continue;
      }

      indentLevel -= 1;
      generated.push(`${currentIndent(indentLevel)}}`);
      continue;
    }

    if (/^(sfarsit_pentru|sfarsit pentru|end for)$/.test(normalized)) {
      const top = stack.pop();
      if (!top || top.type !== "for") {
        issues.push({ line: i + 1, message: "sfarsit_pentru fara bloc pentru deschis.", source });
        continue;
      }

      indentLevel -= 1;
      generated.push(`${currentIndent(indentLevel)}}`);
      continue;
    }

    const untilMatch = normalized.match(/^(pana\s+cand|until)\s+(.+)$/i);
    if (untilMatch) {
      const top = stack.pop();
      if (!top || top.type !== "repeat") {
        issues.push({ line: i + 1, message: "pana cand fara bloc repeta deschis.", source });
        continue;
      }

      indentLevel -= 1;
      generated.push(`${currentIndent(indentLevel)}} while (!(${normalizeOperatorsCpp(untilMatch[2])}));`);
      continue;
    }

    const ifInlineMatch = normalized.match(/^(daca|if)\s+(.+?)\s+(atunci|then)\s+(.+)$/i);
    if (ifInlineMatch) {
      const condition = normalizeOperatorsCpp(ifInlineMatch[2]);
      generated.push(`${currentIndent(indentLevel)}if (${condition}) {`);
      const handledInline = compileSingleInstructionCpp(ifInlineMatch[4], indentLevel + 1, declaredVars, generated);
      if (!handledInline) {
        generated.push(`${currentIndent(indentLevel + 1)}// [wildcard] ${ifInlineMatch[4]}`);
        issues.push({ line: i + 1, message: "Instructiune inline dupa daca nerecunoscuta.", source });
      }
      generated.push(`${currentIndent(indentLevel)}}`);
      continue;
    }

    const ifMatch = normalized.match(/^(daca|if)\s+(.+?)\s+(atunci|then)$/i);
    if (ifMatch) {
      generated.push(`${currentIndent(indentLevel)}if (${normalizeOperatorsCpp(ifMatch[2])}) {`);
      stack.push({ type: "if", line: i + 1 });
      indentLevel += 1;
      continue;
    }

    const whileMatch = normalized.match(/^(cat\s+timp|while)\s+(.+?)\s*(executa|do)?$/i);
    if (whileMatch) {
      generated.push(`${currentIndent(indentLevel)}while (${normalizeOperatorsCpp(whileMatch[2])}) {`);
      stack.push({ type: "while", line: i + 1 });
      indentLevel += 1;
      continue;
    }

    if (/^(repeta|repeat)$/.test(normalized)) {
      generated.push(`${currentIndent(indentLevel)}do {`);
      stack.push({ type: "repeat", line: i + 1 });
      indentLevel += 1;
      continue;
    }

    const parsedFor = parseForLine(trimmed);
    if (parsedFor) {
      const stepName = `__step_${parsedFor.variable}_${i + 1}`;
      const start = normalizeOperatorsCpp(parsedFor.start);
      const end = normalizeOperatorsCpp(parsedFor.end);
      const step = normalizeOperatorsCpp(parsedFor.step);
      generated.push(`${currentIndent(indentLevel)}int ${stepName} = (${step});`);
      generated.push(
        `${currentIndent(indentLevel)}for (int ${parsedFor.variable} = (${start}); ${stepName} >= 0 ? ${parsedFor.variable} <= (${end}) : ${parsedFor.variable} >= (${end}); ${parsedFor.variable} += ${stepName}) {`,
      );
      declaredVars.add(parsedFor.variable);
      stack.push({ type: "for", line: i + 1 });
      indentLevel += 1;
      continue;
    }

    const handled = compileSingleInstructionCpp(trimmed, indentLevel, declaredVars, generated);
    if (handled) {
      continue;
    }

    if (wildcardMode) {
      generated.push(`${currentIndent(indentLevel)}// [wildcard] ${trimmed}`);
      issues.push({
        line: i + 1,
        message: "Linie necunoscuta; pastrata ca comentariu in modul wildcard.",
        source,
      });
      continue;
    }

    issues.push({ line: i + 1, message: "Instructiune necunoscuta.", source });
  }

  while (stack.length > 0) {
    const open = stack.pop();
    if (!open) {
      break;
    }

    indentLevel -= 1;
    if (open.type === "repeat") {
      generated.push(`${currentIndent(indentLevel)}} while (true);`);
      issues.push({
        line: open.line,
        message: "Bloc repeta neinchis; s-a adaugat inchidere implicita.",
        source: lines[open.line - 1] ?? "",
      });
      continue;
    }

    generated.push(`${currentIndent(indentLevel)}}`);
    issues.push({
      line: open.line,
      message: `Bloc ${open.type} neinchis; s-a adaugat inchidere implicita.`,
      source: lines[open.line - 1] ?? "",
    });
  }

  generated.push(`${currentIndent(1)}return 0;`);
  generated.push("}");

  return {
    normalizedPseudocode,
    cpp: generated.join("\n"),
    issues,
  };
}

export function executePseudocode(
  input: string,
  rawInputValues: string,
  options: CompileOptions = {},
): ExecutionResult {
  const compile = compilePseudocode(input, options);
  const parsedInputValues = parseInputValues(rawInputValues);

  try {
    const runner = new Function(
      "__providedInputs",
      [
        "globalThis.__pseudoInputs = __providedInputs;",
        `${compile.js}`,
        "const __result = __outputs;",
        "delete globalThis.__pseudoInputs;",
        "return __result;",
      ].join("\n"),
    ) as (providedInputs: string[]) => string[];

    const outputs = runner(parsedInputValues);
    return {
      compile,
      outputs: Array.isArray(outputs) ? outputs : [],
      runtimeError: null,
    };
  } catch (error) {
    return {
      compile,
      outputs: [],
      runtimeError: error instanceof Error ? error.message : "Eroare necunoscuta la executie.",
    };
  }
}

function denormalizeOperatorsToPseudocode(expression: string) {
  return expression
    .trim()
    .replace(/&&/g, " si ")
    .replace(/\|\|/g, " sau ")
    .replace(/!=/g, " != ")
    .replace(/>=/g, " >= ")
    .replace(/<=/g, " <= ")
    .replace(/==/g, " = ")
    .replace(/\s+/g, " ")
    .trim();
}

export function translateCppToPseudocode(cppCode: string) {
  const lines = cppCode.replace(/\r\n/g, "\n").split("\n");
  const output: string[] = [];
  const blockStack: BlockType[] = [];
  const stepMemory = new Map<string, string>();

  for (const rawLine of lines) {
    const line = rawLine.trim();
    if (!line) {
      continue;
    }

    if (
      /^#include\b/.test(line) ||
      /^using\s+namespace\s+std\s*;$/i.test(line) ||
      /^int\s+main\s*\(\s*\)\s*\{?$/i.test(line) ||
      /^return\s+0\s*;$/i.test(line)
    ) {
      continue;
    }

    if (/^\}\s*else\s*\{\s*$/.test(line)) {
      output.push("altfel");
      continue;
    }

    const doWhileMatch = line.match(/^\}\s*while\s*\(\s*!(?:\((.+)\)|(.+))\s*\)\s*;$/);
    if (doWhileMatch) {
      const condition = denormalizeOperatorsToPseudocode(doWhileMatch[1] ?? doWhileMatch[2] ?? "true");
      output.push(`pana cand ${condition}`);
      if (blockStack[blockStack.length - 1] === "repeat") {
        blockStack.pop();
      }
      continue;
    }

    if (/^\}\s*$/.test(line)) {
      const top = blockStack.pop();
      if (top === "if") {
        output.push("sfarsit_daca");
      } else if (top === "for") {
        output.push("sfarsit_pentru");
      } else if (top === "while") {
        output.push("sfarsit_cat_timp");
      }
      continue;
    }

    const ifMatch = line.match(/^if\s*\((.+)\)\s*\{\s*$/);
    if (ifMatch) {
      output.push(`daca ${denormalizeOperatorsToPseudocode(ifMatch[1])} atunci`);
      blockStack.push("if");
      continue;
    }

    const whileMatch = line.match(/^while\s*\((.+)\)\s*\{\s*$/);
    if (whileMatch) {
      output.push(`cat timp ${denormalizeOperatorsToPseudocode(whileMatch[1])} executa`);
      blockStack.push("while");
      continue;
    }

    if (/^do\s*\{\s*$/.test(line)) {
      output.push("repeta");
      blockStack.push("repeat");
      continue;
    }

    const stepDecl = line.match(/^int\s+(__step_[a-zA-Z_][a-zA-Z0-9_]*_[0-9]+)\s*=\s*\((.+)\)\s*;$/);
    if (stepDecl) {
      stepMemory.set(stepDecl[1], denormalizeOperatorsToPseudocode(stepDecl[2]));
      continue;
    }

    const forMatch = line.match(
      /^for\s*\(\s*int\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*\((.+)\)\s*;\s*([^;]+);\s*\1\s*\+=\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\)\s*\{\s*$/,
    );
    if (forMatch) {
      const variable = forMatch[1];
      const start = denormalizeOperatorsToPseudocode(forMatch[2]);
      const condition = forMatch[3];
      const stepName = forMatch[4];
      const step = stepMemory.get(stepName) ?? "1";

      let end = "?";
      const endMatch = condition.match(new RegExp(`\\b${variable}\\b\\s*(?:<=|>=)\\s*\\((.+)\\)`));
      if (endMatch) {
        end = denormalizeOperatorsToPseudocode(endMatch[1]);
      }

      output.push(`pentru ${variable} <- ${start}, ${end}, ${step} executa`);
      blockStack.push("for");
      continue;
    }

    const cinDecl = line.match(/^int\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*;$/);
    if (cinDecl) {
      // declarations are implicit in pseudocode, so skip plain declaration lines
      continue;
    }

    const cinMatch = line.match(/^cin\s*>>\s*(.+)\s*;$/);
    if (cinMatch) {
      const vars = cinMatch[1]
        .split(/>>/)
        .map((token) => token.trim())
        .filter(Boolean);
      output.push(`citeste ${vars.join(", ")}`);
      continue;
    }

    const coutMatch = line.match(/^cout\s*<<\s*(.+)\s*;$/);
    if (coutMatch) {
      const args = coutMatch[1]
        .split(/<</)
        .map((token) => token.trim())
        .filter((token) => token !== "" && token !== "\" \"" && token !== "\"\\n\"" && token !== "endl");
      output.push(`scrie ${args.join(", ")}`);
      continue;
    }

    const swapMatch = line.match(/^swap\s*\(\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*,\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\)\s*;$/);
    if (swapMatch) {
      output.push(`${swapMatch[1]} <-> ${swapMatch[2]}`);
      continue;
    }

    const assignDecl = line.match(/^int\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+)\s*;$/);
    if (assignDecl) {
      output.push(`${assignDecl[1]} <- ${denormalizeOperatorsToPseudocode(assignDecl[2])}`);
      continue;
    }

    const assignMatch = line.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.+)\s*;$/);
    if (assignMatch) {
      output.push(`${assignMatch[1]} <- ${denormalizeOperatorsToPseudocode(assignMatch[2])}`);
      continue;
    }
  }

  while (blockStack.length > 0) {
    const top = blockStack.pop();
    if (top === "if") {
      output.push("sfarsit_daca");
    } else if (top === "for") {
      output.push("sfarsit_pentru");
    } else if (top === "while") {
      output.push("sfarsit_cat_timp");
    }
  }

  return output.join("\n");
}
