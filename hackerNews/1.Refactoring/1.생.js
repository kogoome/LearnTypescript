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


// 제목 데이터 수신
ajax.open("GET", newsUrl, false)
ajax.send()
const news = JSON.parse(ajax.response)
console.log(news)

// 링크에 리스트 추가
for (let i = 0; i < 5; i++) {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = `#${news[i].id}`
  a.innerHTML = `${news[i].title} 💬${news[i].comments_count}`
  li.appendChild(a)
  ul.appendChild(li)
}

// 해쉬리스너로 컨텐츠 데이터 수신
window.addEventListener("hashchange", () => {
  const id = location.hash.slice(1)
  ajax.open("GET", contentUrl.replace("@id", id), false)
  ajax.send()
  const content = JSON.parse(ajax.response)

  // 제목 추가
  h1.innerHTML = content.title
  div.appendChild(h1)
})

// 구조 결합
root.innerHTML = "<h1>Hacker News</h1>"
root.appendChild(ul)
root.appendChild(div)