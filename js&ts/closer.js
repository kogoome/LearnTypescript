// 함수1 내부에서 함수2를 만들고 함수1의 변수를 참조하면 
function increment(bool) {
  let n = 1
  return bool ?
    function () { return ++n } :
    function () { return n }
}
// 클로져 생성, 중단점 두고
let inc = increment(true)
let con = increment(false)

// 클로져 사용
console.log(inc())//2
console.log(inc())//3
console.log(con())//1 , con 클로져에 최초 삽입된 변수 1을 사용
console.log(inc())//4

// 메모리에서 클로져 제거, 가비지컬렉터는 클로져 제거 ㄴㄴ
inc = null
con = null


// 사례적용예
// 사람 데이터를 저장하는 클로저를 생성하는 함수
const Person = (name, age) => {
  let _name = name;
  let _age = age;
  return {
    getName: () => { return _name; },
    getAge: () => { return _age; },
    setAge: (x) => { _age = x; }
  }
}
let siwan = Person("Siwan", 26);
let wojin = Person("Wojin", 17);

console.log(siwan.getName()); // Siwan
console.log(siwan.getAge()); // 26
siwan.setAge(27);
console.log(siwan.getAge()); // 27
console.log(wojin.getName()); // 17
console.log(wojin.getAge()); // 17
siwan = null
wojin = null
// 위에서 했던 카운터 함수를 응용하여 여러개의 내부 상태와 메서드를 가진 클로저를 생성하는 함수를 만들 수 있다. 이것으로 여러 메서드를 가진 객체를 반환하는 함수를 만들며 구현할 수 있다.