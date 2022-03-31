// 1478 → "one4seveneight"
// 234567 → "23four5six7"
// 10203 → "1zerotwozero3"

// 영어를 숫자로 바꿔서리턴하라


let s = "23fourfour5six7"

const num = { "zero":0, "one":1, "two":2, "three":3, "four":4, "five":5, "six":6, "seven":7, "eight":8, "nine":9, }

// for (let en in num) {
//   while (s.includes(en)) {
//     s= s.replace(en,num[en])
//   }
// }
for (let [en,n] of Object.entries(num)) {
  while (s.includes(en)) {
    s= s.replace(en,n)
  }
}
console.log(s)