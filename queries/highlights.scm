; highlight.scm

[
  "("
  ")"
  "}"
  "{"
  "["
  "]"
] @punctuation.bracket

(label (identifier) @label) 

[(Call) (Func)] @function

(Cmd) @Keyword

((Cmd) @keyword.operator
  (#any-of? @keyword.operator
     "Add"
     "Sub"
     "SubBy"
     "Div"
     "DivBy"
     "Mul"
     "Mod"
     "ModBy"
     "Xor"
     "BitOr"
     "BitAnd"
     "And"
     "Or"
     "Not"
     "Lt"
     "Gt"
     "Eq"
     "Le"
     "Ge"
     "New"
     "Collect"))

((Cmd) @function.builtin
  (#any-of? @function.builtin
    "Collect"
    "Insert"
    "Append"
    "Concat"
    "Length"
    "Empty"
    "Head"
    "Rest"
    "Input"
    "Output"
    "Print"
    "Flush"))

((Cmd) @boolean
  (#any-of? @boolean
    "True"
    "False"))

((Cmd) @keyword.conditional
  (#eq? @keyword.conditional "If"))

((Cmd) @keyword.return
  (#any-of? @keyword.return "Ret" "End"))

(Push) @variable
(PushCapped) @variable.parameter

[
 (Num)
 (Byte)
] @number

(Capture (offset) @number)
(CapFromCapped (offset) @number)

(escape_sequence) @string.escape
(Char ("\'") @string.escape)
(String ("\\\"") @string.escape)
(Char) @character
(String) @string

(comment) @comment
