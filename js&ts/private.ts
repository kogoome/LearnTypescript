// 타입스크립트의 프라이빗 필드는 클로져를 이용하는것을 알수있다
// js로 컴파일 해보면 나타난다
class Closer {
  private pri:number
  protected pro:number 
  public pub:number

  constructor(a:number, b:number, c:number) {
    this.pri = a
    this.pro = b
    this.pub = c
  }
}

let number = new Closer(1, 2, 3)
// number.pri = 4 //에러
// number.pro = 5 //에러
number.pub = 6