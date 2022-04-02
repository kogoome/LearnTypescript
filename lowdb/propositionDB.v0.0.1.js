/**
 * a는 b이다
 * 위 형식의 문장은 포함관계를 의미한다.
 * 문장으로부터 디비를 구성하게 하기 위한 아이디어를 기록한다.
 *
 * 1. 개념 등록
 * 2. 개념 사이의 명제 등록
 * 3. 명제의 반례가 존재하지 않거나 참이 될 경우
 * 4. 관계 등록
 */
/**
 * 관계의 목록을 만들고 만들 수 있는 논리를 기록한다.
*/
// type Edge = {
//   name: string,
//   hash: number,
// }
// const color:Edge = {
//   name: "color",
//   hash: 1116,
// }
var apple = {
    name: "apple",
    hash: 1063
};
var fruit = {
    name: "fruit",
    hash: 1127
};
var tree = {
    name: "tree",
    hash: 619
};
var food = {
    name: "food",
    hash: 633
};
var hashTable = {
    619: tree,
    633: food,
    1063: apple,
    1127: fruit
};
var conceptTable = {
    "tree": tree,
    "food": food,
    "apple": apple,
    "fruit": fruit
};
var hashPath = {
    subset: [
        [1063, 1127, 633],
        [],
        []
    ],
    include: [
        [619, 1127]
    ]
};
/**
 * 무슨 함수를 만들어야 할까
 * 1. 개념 검색
 * 2. 개념 입력
 * 3. 명제 입력
 * 4. 명제 출력
 */
function isSubset(subset, set) {
    // path.subset 에서 set과 subset의 해시데이터를 검색
    // 검색 결과가 있으면 boolean true
    var hashPath_subset = hashPath.subset;
    var subsetPath = hashPath_subset.filter(function (path) {
        return path.indexOf(subset.hash) < path.indexOf(set.hash);
    });
    var path = subsetPath[0].map(function (hash) {
        return hashTable[hash].name;
    });
    return subsetPath ?
        subset.name + " is " + set.name + ". and path : " + path.join(" -> ") :
        subset.name + " is not " + set.name;
}
console.log(isSubset(apple, fruit));
