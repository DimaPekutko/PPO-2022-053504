
export const BUILTIN_FUNCS = {
  "sqrt": (arg) => Math.sqrt(arg),
  "ln":   (arg) => Math.log(arg),
  "sin":  (arg) => Math.sin(arg),
  "cos":  (arg) => Math.cos(arg),
  "tan":  (arg) => Math.tan(arg),
  "ctg":  (arg) => 1 / Math.tan(arg),
  // "exp":  (arg) => Math.exp(arg),

}

export const BUILTIN_CONSTS = {
  "pi": Math.PI,
  "e": Math.E   
}