// 사용 모듈
const ajax = new XMLHttpRequest
// 주소
const newsUrl = `https://api.hnpwa.com/v0/news/1.json`
const contentUrl = `https://api.hnpwa.com/v0/item/@id.json`
// 최소돔
const root = document.getElementById("root")


const getData = (url) => {
  ajax.open("GET", url, false)
  ajax.send()
  return JSON.parse(ajax.response)
}

const newsFeed = () => {
  const newsList = []
  const news = getData(newsUrl)
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
}


const newsContent = () => {
  const id = location.hash.slice(1)
  const content = getData(contentUrl.replace("@id", id))

  root.innerHTML = `
    <h1>${content.title}</h1>
    <div><a href="/">목록으로</a></div>
  `
}

newsFeed()
window.addEventListener("hashchange", newsContent)