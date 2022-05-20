// ! 에러가 발생했음에도 연산을 수행하는 방법
// * try, option(컨테이너 반환), Either
// 이 방법은 npm에서 설치하여 사용하여야 한다.
// 이번 절에서는 option만을 다룬다.
// option 은 하스켈 오캐멀 스칼라 러스트 등의 언어에서 가져온 개념으로
// 특정 값을 반환하는 대신, 값이 있거나 없거나 상관없는 컨테이너를 반환하는것이 옵션의 핵심
// 컨테이너 자체적으로 메서드를 갖고 잇고, 값이 없어도 연산 수행이가능
// 이런 컨테이너는 객체나 배열로도 만들수 있다.

// * NOTE 배열 옵션 컨테이너
function parse(birthday: string): Date[] {
	let date = new Date(birthday)
	if (!isValid(date)) {
		return []
	}
	return [date]
}
let date = parse(ask())
date.map((_) => _.toISOString()).forEach((_) => console.info('Date is', _))
// * 옵션 컨테이너도 널반환과 마찬가지로 에러 이유를 설명해주지 않음

function ask() {
	let result = prompt('Enter your birthday')
	return result ? [result] : []
}

// ask()// 배열리턴
// 	.map(parse) // 배열 각 값을 파싱하여 배열에 중첩
// 	.map((_) => _.toISOString()) // todo 중첩된 배열 처리 안되서 오류
// 	.forEach((_) => console.info('Date is', _))

// * 중첩된 배열을 처리하기 위해 평탄화 함수를 작성
function flatten<T>(array: T[][]): T[] {
	return array.reduce((acc, cur) => acc.concat(cur), [])
	// return Array.prototype.concat.apply([], array)
}

flatten(ask().map(parse)) // 배열 각 값을 파싱하여 배열에 중첩
	.map((_) => _.toISOString())
	.forEach((_) => console.info('Date is', _))
