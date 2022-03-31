// 핸폰 전화번호를 입력하려고 한다.
// 엄지 손가락의 초기 위치는 왼손 오른손 각각 왼쪽 오른쪽 하단에 위치한다. 
// 1,4,7,*은 왼손만 움직이고, 3,6,9,#는 오른손만 움직이며, 2,5,8,0은 둘다 움직인다.
// 이때 가운데 줄은 엄지손가락의 현재위치에서 가까운 거리의 손가락을 움직인다.
// 만약 두 손가락과의 거리가 같다면 자주쓰는 손가락을 움직인다.
// 입력번호가 주어졌을 때 LRRLR 이런식으로 오른손 왼손을 움직이는 순서로 출력하라.

numbers = [1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5]
hand = "right"
//function solution(numbers, hand) {
var answer = []
const d = "147*2580369#"

let pose = { l: 3, r: 3 }; // 왼손 오른손 위치

numbers.forEach(s => {
  // 입력해야 할 번호를 문자로 바꿔서 왼쪽, 중립, 오른쪽을 판단한다.
  let h = d.indexOf(s)
  if (h < 4) {
    pose["l"] = h
    answer.push("L")
  } else if (h < 8) {
    h = h - 4
    if (Math.abs(pose["l"] - h) < Math.abs(pose["r"] - h)) {
      pose["l"] = h
      answer.push("L")
    } else if (Math.abs(pose["l"] - h) > Math.abs(pose["r"] - h)) {
      pose["r"] = h
      answer.push("R")
    } else {
      if (hand == "right") {
        pose["r"] = h
        answer.push("R")
      } else {
        pose["l"] = h
        answer.push("L")
      }
    }
  } else {
    h = h - 8
    pose["r"] = h
    answer.push("R")
  }
})
console.log(answer.join(""))
//   return answer;
// }

//틀렷다 틀렷어
