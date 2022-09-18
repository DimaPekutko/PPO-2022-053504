import { Token, TreeNode, TreeNodeType, TOKEN_TYPES, TREE_NODE_TYPES } from "./ast"
import { BUILTIN_FUNCS, BUILTIN_CONSTS } from "./builtins"

let IS_SCEINCE_MODE = false

function CalcError(msg) {
  this.message = msg
}

const lex = (str) => {
  let tokens = []
  for (let i = 0; i < str.length; i++) {
    let token_parsed = false
    for (const type_key in TOKEN_TYPES) {
      let token_type = TOKEN_TYPES[type_key]
      let res = (str.substring(i, str.length)).match(token_type.regex)
      if (res !== null) {
        if (res.index === 0 && res[0].length > 0) {
          tokens.push(new Token(res[0], token_type))
          i += res[0].length - 1
          token_parsed = true
          break
        }
      }
    }
    if( !token_parsed ) {
      throw new Error("Cannot parse expression.")
    }
  }
  tokens.push(new Token("EOF", TOKEN_TYPES.EOF))
  return tokens
}

const parse = (tokens) => {

  const eat = (token_type = undefined) => {
    if (tokens.length > 0) {
      let token = tokens.shift()
      if (token.type.name === token_type?.name || token_type == undefined) {
        return token
      }
      throw new CalcError(`Invalid token (${token.value})`)
    }
  }

  const peek = (idx = 0) => {
    if (tokens.length > idx) {
      return tokens[idx]
    }
  }

  const parse_funccall = () => {
    let token = eat(TOKEN_TYPES.id)
    eat(TOKEN_TYPES.lpar)
    let node = new TreeNode(
      token,
      TREE_NODE_TYPES.funccall
    )
    // if call with arguments
    if (peek().type.name !== TOKEN_TYPES.rpar.name) {
      node.chidlren = [parse_expr()]
    }
    eat(TOKEN_TYPES.rpar)
    return node
  }

  const parse_factor = () => {
    let token = peek()
    if (token.type.name === TOKEN_TYPES.num.name) {
      eat(TOKEN_TYPES.num)
      return new TreeNode(
        token,
        TREE_NODE_TYPES.number
      )
    }
    else if (token.type.name === TOKEN_TYPES.lpar.name) {
      eat(TOKEN_TYPES.lpar)
      let node = parse_expr()
      eat(TOKEN_TYPES.rpar)
      return node
    }
    else if (token.type.name === TOKEN_TYPES.plus_op.name) {
      eat(TOKEN_TYPES.plus_op)
      return new TreeNode(
        token,
        TREE_NODE_TYPES.unop,
        [parse_factor()]
      )
    }
    else if (token.type.name === TOKEN_TYPES.minus_op.name) {
      eat(TOKEN_TYPES.minus_op)
      return new TreeNode(
        token,
        TREE_NODE_TYPES.unop,
        [parse_factor()]
      )
    }
    else if (token.type.name === TOKEN_TYPES.id.name) {
      let next_token = peek(1)
      // function call case
      if (next_token.type.name === TOKEN_TYPES.lpar.name) {
        return parse_funccall()
      }
      // constant case
      else {
        eat(TOKEN_TYPES.id)
        return new TreeNode(token, TREE_NODE_TYPES.const)
      }
    }
  }

  const parse_pow = () => {
    let node = parse_factor()
    let token = peek()
    while (token.type.name === TOKEN_TYPES.pow_op.name) {
      token = eat()
      node = new TreeNode(
        token,
        TREE_NODE_TYPES.binop,
        [node, parse_factor()]
      )
      token = peek()
    }
    return node
  }

  const parse_term = () => {
    let node = parse_pow()
    let token = peek()
    while (
      token.type.name === TOKEN_TYPES.multiply_op.name ||
      token.type.name === TOKEN_TYPES.division_op.name
    ) {
      token = eat()
      node = new TreeNode(
        token,
        TREE_NODE_TYPES.binop,
        [node, parse_pow()]
      )
      token = peek()
    }
    return node
  }

  const parse_expr = () => {
    let node = parse_term()
    let token = peek()
    while (
      token.type.name === TOKEN_TYPES.plus_op.name ||
      token.type.name === TOKEN_TYPES.minus_op.name
    ) {
      token = eat()
      node = new TreeNode(
        token,
        TREE_NODE_TYPES.binop,
        [node, parse_term()]
      )
      token = peek()
    }
    return node
  }

  return parse_expr()

}

const calc_result = (node) => {
  let children = node.chidlren
  if (node.type.name === TREE_NODE_TYPES.binop.name) {
    let left = calc_result(children[0])
    let right = calc_result(children[1])
    if (node.token.value === "+") {
      return left + right
    }
    if (node.token.value === "-") {
      return left - right
    }
    else if (node.token.value === "*") {
      return left * right
    }
    else if (node.token.value === "/") {
      return left / right
    }
    else if (node.token.value === "^") {
      return left ** right 
    }
  }
  else if (node.type.name === TREE_NODE_TYPES.unop.name) {
    let child = calc_result(children[0])
    if (node.token.value === "+") {
      return child
    }
    else if (node.token.value === "-") {
      return -child
    }
  }
  else if (node.type.name === TREE_NODE_TYPES.funccall.name) {
    if (IS_SCEINCE_MODE) {
      let func_name = node.token.value
      for (const builtin_func in BUILTIN_FUNCS) {
        if (func_name === builtin_func) {
          let func = BUILTIN_FUNCS[func_name]
          // call with args
          if (children.length > 0) {
            let arg = calc_result(children[0])
            return func(arg)
          }
          else {
            return func()
          }
        }
      }

      throw new CalcError(`Undefined function "${func_name}".`)
    }
    else {
      throw new CalcError(`You cannot use functions in non science mode.`)
    }
  }
  else if (node.type.name === TREE_NODE_TYPES.const.name) {
    if (IS_SCEINCE_MODE) {
      let const_name = node.token.value
      for (const builtin_const in BUILTIN_CONSTS) {
        if (const_name === builtin_const) {
          return BUILTIN_CONSTS[const_name]
        }
      }

      throw new CalcError(`Undefined constant "${const_name}".`)
    }
    else {
      throw new CalcError(`You cannot use constants in non science mode.`)
    }
  }
  else if (node.type.name === TREE_NODE_TYPES.number.name) {
    return parseFloat(node.token.value)
  }
}

export const calculate = (expr, science_mode = false) => {
  IS_SCEINCE_MODE = science_mode
  try {
    let tokens = lex(expr)
    let ast = parse(tokens)
    return calc_result(ast)
  }
  catch (err) {
    if (err instanceof CalcError) {
      return err.message
    }
    return "Cannot evaluate expression 🥲"
  }
}