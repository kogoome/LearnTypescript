const ajax = new XMLHttpRequest

const newsUrl = `https://api.hnpwa.com/v0/news/1.json`
const contentUrl = `https://api.hnpwa.com/v0/item/@id.json`
const store = {
  currentPage: 1,
  pageSize: 5
}
const root = document.getElementById("root")
//---------------------------------------------------

const getData = (url) => {
  ajax.open("GET", url, false)
  ajax.send()
  return JSON.parse(ajax.response)
}

const newsFeed = () => {
  const news = getData(newsUrl)
  const lastPage = Math.ceil(news.length / store.pageSize)
  const newsList = []
  let template = `
    <div class="container m-auto p-4">
      <h1 class="text-3xl">Hacker News</h1>
      <div>
        <a href="#/page/@prev">이전</a>
        <a href="#/page/@next">다음</a>
      </div>
      <ul>
        @news
      </ul>
    </div>
  `
  // 단점 : html 자동완성을 써먹을 수 없다.

  for (let i = (store.currentPage - 1) * store.pageSize; i < (store.currentPage) * store.pageSize; i++) {
    newsList.push(
      `<li>
        <a href="#/show/${news[i].id}">
          ${news[i].title} 💬${news[i].comments_count}
        </a>
      </li>`
    )
  }

  template = template.replace('@news', newsList.join(''))
  template = template.replace('@prev', store.currentPage > 1 ? store.currentPage - 1 : 1)
  template = template.replace('@next', store.currentPage < lastPage ? store.currentPage + 1 : lastPage)
  // 단점 : 마크업된 수 만큼 리플레이스를 사용한다.

  root.innerHTML = template
}

const newsContent = () => {
  const id = location.hash.slice(7)
  const content = getData(contentUrl.replace("@id", id))

  root.innerHTML = `
    <h1>${content.title}</h1>
    <div><a href="#">목록으로</a></div>
  `
}

const router = () => {
  const routePath = location.hash
  if (routePath == '' || routePath == '#') {
    newsFeed()
  } else if (routePath.startsWith('#/page/')) {
    store.currentPage = Number(routePath.slice(7))
    newsFeed()
  } else if (routePath.startsWith('#/show/')) {
    newsContent()
  }
}

newsFeed()
window.addEventListener("hashchange", router)