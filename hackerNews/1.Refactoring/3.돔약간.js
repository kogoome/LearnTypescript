// 사용 모듈
const ajax = new XMLHttpRequest

// 주소
const newsUrl = `https://api.hnpwa.com/v0/news/1.json`
const contentUrl = `https://api.hnpwa.com/v0/item/@id.json`

// 구조 생성
const root = document.getElementById("root")
// 제목 링크 돔
const ul = document.createElement("ul")
// 컨텐츠 돔
const div = document.createElement("div") // 틀
const h1 = document.createElement("h1") // 제목

const getData = (url) => {
  ajax.open("GET", url, false)
  ajax.send()
  return JSON.parse(ajax.response)
}

// 제목 데이터 수신
const news = getData(newsUrl)
console.log(news)

// 링크에 리스트 추가
const newsList = []
newsList.push('<ul>')
for (let i = 0; i < 5; i++) {
  newsList.push(
    `<li>
      <a href="#${news[i].id}">
        ${news[i].title} 💬${news[i].comments_count}
      </a>
    </li>`
  )
}
newsList.push('</ul>')
root.innerHTML = newsList.join('')

// 해쉬리스너로 컨텐츠 데이터 수신
window.addEventListener("hashchange", () => {
  const id = location.hash.slice(1)
  const content = getData(contentUrl.replace("@id", id))

  root.innerHTML = `
    <h1>${content.title}</h1>
    <div><a href="#">목록으로</a></div>
  `
})