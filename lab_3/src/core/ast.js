export function TokenType(name, regex) {
  this.name = name
  this.regex = regex
}

export function Token(value, type) {
  this.value = value
  this.type = type
}

export function TreeNodeType(name) {
  this.name = name
}

export function TreeNode(token, type, children = []) {
  this.token = token
  this.type = type
  this.chidlren = children
}

export const TOKEN_TYPES = {
  num: new TokenType("num", new RegExp("([0-9]*[.])?[0-9]+")),
  id: new TokenType("id", new RegExp("([A-Za-z0-9\_]+)")),
  lpar: new TokenType("lpar", new RegExp("\\(")),
  rpar: new TokenType("rpar", new RegExp("\\)")),
  plus_op: new TokenType("plus_op", new RegExp("\\+")),
  minus_op: new TokenType("minus_op", new RegExp("\\-")),
  multiply_op: new TokenType("multiply_op", new RegExp("\\*")),
  division_op: new TokenType("division_op", new RegExp("\\/")),
  pow_op: new TokenType("pow_op", new RegExp("\\^")),
  EOF: new TokenType("EOF", "")
}

export const TREE_NODE_TYPES = {
  number: new TreeNodeType("number"),
  const: new TreeNodeType("const"),
  binop: new TreeNodeType("binop"),
  unop: new TreeNodeType("unop"),
  funccall: new TreeNodeType("funccall")
}