// 문제 조건 랜덤생성
const lottoss = new Array(6).fill(0).map(() => Math.floor(Math.random() * 46));
let lottos = [...new Set(lottoss)]
lottos[5] = 0
lottos.sort(() => Math.random() - 0.5)

const win_numss = new Array(9).fill(0).map(() => Math.floor(Math.random() * 45)+1);
win_nums = [...new Set(win_numss)]
win_nums.length = 6
lottos=[-1,-1,-1,-1,-1,-1]

let answer = [7]
let zeros = 0

lottos.forEach(x => {
  if(win_nums.includes(x)||x === 0) {
    answer[0]--
    console.log("it happen",answer)
    if(x==0) {
      zeros++
      console.log("it has zero")
    }
  }
})
if (answer[0]>7) answer[0]=6
answer[1]=zeros+answer[0]>6?6:zeros+answer[0]

console.log(answer,zeros)


