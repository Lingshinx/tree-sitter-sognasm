export { maybeNewline, separatedBy, separatedByComma, surround, parent, bracket, brace, quote, singleQuote, newline, }

const maybeNewline = optional('\n')

const separatedBy = sep => rule => seq(
  rule,
  repeat(seq(
    sep,
    rule
  )),
  optional(sep),
)


const surround = sur => rule => seq(
  sur[0],
  maybeNewline,
  rule,
  sur[1],
)

const parent = surround('()')
const bracket = surround('[]')
const brace = surround('{}')
const quote = surround('""')
const singleQuote = surround("''")

const newline = rule => seq(rule, maybeNewline)
const separatedByComma = separatedBy(newline(','))
