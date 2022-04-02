// 타입스크립트의 프라이빗 필드는 클로져를 이용하는것을 알수있다
// js로 컴파일 해보면 나타난다
var Closer = /** @class */ (function () {
    function Closer(a, b, c) {
        this.pri = a;
        this.pro = b;
        this.pub = c;
    }
    return Closer;
}());
var number = new Closer(1, 2, 3);
number.pub = 6;

