let left = 16, right = 17


var sum = 0;
let n = left
// left <= n <= right인 n을 하나씩 크게 해서 r보다 커지기 전까지
while(n<=right) {
    console.log("n :", n)
    let even = true // 약수의 갯수가 짝수 상태
    for (let i=1;i<=n;i++) { // 1과 자기자신은 위에 반영 제외
        if (n%i==0) {
          even=!even // 약수가 존재하면 상태전환
          console.log("i",i, "even", even)
        }
    }
    sum=even?sum+n:sum-n // 짝수면 더하고 아니면 뺌
    console.log("sum :",sum)
    n++ //n 1 증가
}
