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

//1. 중복 제거(Set), 스플릿
let reports = [...new Set(report)].map(a => { return a.split(' ') })
let counts = new Map();
for (const bad of reports) {
  // bad[0]: 신고자, bad[1]: 피신고자
  //신고값이 있다면 1을 더하고, 없다면 신고값이 1을 넣어줌
  counts.set(bad[1], counts.get(bad[1]) + 1 || 1)
}
console.log(counts)

let good = new Map();
for (const report of reports) {
  if (counts.get(report[1]) >= k) {
    good.set(report[0], good.get(report[0]) + 1 || 1)
  }
}
console.log(good)
let answer = id_list.map(a => good.get(a) || 0)
