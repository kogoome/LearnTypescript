const { resolveTripleslashReference } = require("typescript")


console.time('재귀함수')
function factorial(n) {
  console.log(n)
  return result = n === 1 ? 1 : n * factorial(n - 1)
}
console.log(factorial(10))
console.timeEnd('재귀함수')


console.time('for문')
function fact(n) {
  let result = 1
  for (let i = 1; i < n + 1; i++) {
    console.log(i)
    result = result * i
  }
  return result
}
console.log(fact(10))
console.timeEnd('for문')
