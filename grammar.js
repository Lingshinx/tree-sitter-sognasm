/**
 * @file solyrc's one language you're creating
 * @author lingshin <yokaringx@outlook.com>
 * @license MIT
 */

import { bracket, separatedBy, parent, quote, singleQuote } from './grammar/util.js'

export default grammar({
  name: "sognasm",

  extras: $ => [' ', '\t', '\r', $.comment],

  confilict: $ => [[$.Num, $.offset]],

  rules: {
    source_file: $ => $._block,
    _block: $ => seq(/\n*/, separatedBy(/\n+/)($.stmt)),

    comment: _ => /;[^\n]*/,

    stmt: $ => choice(
      $.function,
      seq(
        $.label,
        /\n*/,
        $._content
      ),
      $._content
    ),

    function: $ => seq(
      field("name", $.identifier),
      "{", $._block, "}"
    ),

    label: $ => seq(
      $.identifier,
      ":"
    ),

    identifier: _ => /[a-z_]+/,

    _content: $ => repeat1(
      choice(
        $.Call,
        $.Cmd,
        $.Local,
        $.Push,
        $.Capped,
        $.PushCapped,
        $.Capture,
        $.CapFromCapped,
        $.Num,
        $.String,
        $.Byte,
        $.Func,
        $.Char,
      ),
    ),

    Call: $ => $.identifier,

    Cmd: _ => /[A-Z][a-zA-Z]+/,

    Local: $ => parent($.Push),
    Push: $ => seq("$", $.offset),

    Capped: $ => parent($.PushCapped),
    PushCapped: $ => seq("#", $.offset),

    offset: _ => /\d+/,

    Capture: $ => seq("$", bracket(separatedBy(/ +/)($.offset))),

    CapFromCapped: $ => seq("#", bracket(separatedBy(/ +/)($.offset))),

    Func: $ => parent($.identifier),

    Byte: _ => /(0[a-fA-F]|\d)[a-fA-F0-9]H/,

    Num: _ => /[\d']+(\.[\d'])?([eE][+-]?\d+)?/,

    String: $ => quote(repeat(choice(
      /[^"\\\n]/,
      '\\"',
      $.escape_sequence
    ))),

    Char: $ => singleQuote(choice(
      /[^'\\]/,
      "\\'",
      $.escape_sequence
    )),

    escape_sequence: _ => choice(
      /\\[\\bfnrtv]/,
      /\\u[0-9a-fA-F]{4}/,
      /\\x[0-9a-fA-F]{2}/
    )
  }
});
