// container
function ul(child: string): string {
  return `<ul>${child}</ul>`
}
function ol(child: string): string {
  return `<ol>${child}</ol>`
}
function div(child: string): string {
  return `<div>${child}</div>`
}

// list into container 
function makeLI(
  container:(child:string)=>string,
  contents:string[]
):string {
  const liList=[]

  for (const content of contents){
    liList.push(`<li>${content}</li>`)
  }
  return container(liList.join(''))
}

const htmlUL = makeLI(ul,['월','화','수','목','금','토','일'])
const htmlOL = makeLI(ol,['봄','여름','가을','겨울'])
const htmlDIV = makeLI(div,['김','나','박','이'])

console.log(htmlUL)
console.log(htmlOL)
console.log(htmlDIV)