//아스키코드
let new_id = "123_.def"
let answer = ""
possibleASK = [45, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 95, 46, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122]

const str = new_id.toLowerCase()// 1. 소문자
  .split("").filter(s => {
    if (possibleASK.includes(s.charCodeAt(0))) return s
  }).join("") // 2. 특수문자 제거
  .split(".").filter(str => {
    if (str.length > 0) return str
  }).join(".") // 3. 마침표 여러개 하나로, 4. 처음 마지막 마침표 제거
  .slice(0, 15) // 5. 최대 15글자

if (str.length == 0) {
  answer = "aaa"
} else if (str.length == 1) {
  answer = str + str + str
} else if (str.length == 2) {
  answer = str + str[1]
} else if (str.length > 15) {
  str[14] == "." ? answer = str.slice(0, 14) : answer = str.slice(0, 15)
} else {
  answer = str
}
console.log(answer)