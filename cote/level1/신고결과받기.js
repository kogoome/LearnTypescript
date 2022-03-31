// 유져
id_list = ['muzi', 'frodo', 'apeach', 'neo']
report = [
  // 무지가 프로도 신고함
  'muzi frodo',
  // 어피치가 프로도 신고함
  'apeach frodo',
  'apeach frodo',
  'frodo neo',
  'muzi neo',
  'apeach muzi'
]
// 두명에게 신고먹으면 밴
k = 2

// 문제. 신고자가 타인을 신고하여서 밴당하면 밴처리 되었다고 신고자에게 메일이 발송된다.
// 유져별로 받은 메일 수를 배열에 담아 리턴하시오
const answer = []

const user = []
id_list.forEach(id => {
  // [신고 당한 횟수, 메일 받은 수]
  user[id] = [0, 0]
})
console.log(user)
// 신고 횟수를 잡아라
report.forEach(re => {
  const r = re.split(' ')
  if (user[r[0]].indexOf(r[1]) === -1) {
    user[r[0]].push(r[1])
    user[r[1]][0]++
  }
})
console.log(user)
// 밴닉 찾고 메일 수 증가
for (const id in user) {
  if (user[id][0] >= k) {
    // 밴당할 아이디 : id
    for (const name in user) {
      // user[name] : [신고당한수, 메일받은수, 신고정보 ... ] 배열
      // 배열 신고자 중 밴닉이 있으면 메일 카운팅 ++
      if (user[name].indexOf(id) !== -1) user[name][1]++
    }
  }
}
console.log(user)

for (const id in user) {
  // user[id][1] : 배열 정보중 메일 수
  answer.push(user[id][1])
}
console.log(answer)
