function salePrice(discountRate, price) {
  return price - (price*(discountRate*0.01))
}
console.log('summer sale - ' +salePrice(30,567000))
console.log('winter sale - ' +salePrice(10,567000))

function discountPrice(discountRate) {
  return function(price){
    return price - (price*(discountRate*0.01))
  }
}

console.log('summer sale - ' +discountPrice(30)(567000))
console.log('winter sale - ' +discountPrice(10)(567000))

let summerPrice = discountPrice(30)
let winterPrice = discountPrice(10)

console.log('summer sale - ' +summerPrice(567000))
console.log('winter sale - ' +winterPrice(567000))
