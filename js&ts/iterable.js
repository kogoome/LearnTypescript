const myIterable = {}

myIterable[Symbol.iterator] = function* () {
  let i =0
  while(i < 5) {
    yield i++
  }
}

console.log(myIterable)

for (let n of myIterable) {
  console.log(n)
}

var mySymbol = Symbol();
console.log('mySymbol', mySymbol);



