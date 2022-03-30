const ajax = new XMLHttpRequest

const newsUrl = `https://api.hnpwa.com/v0/news/1.json`
const contentUrl = `https://api.hnpwa.com/v0/item/@id.json`
const store = {
  currentPage: 1,
  pageSize: 5,
  newsFeed: [],
  lastPage: 1
}
const root = document.getElementById("root")
//---------------------------------------------------


const getData = (url) => {
  ajax.open("GET", url, false)
  ajax.send()
  return JSON.parse(ajax.response)
}

const initReadState = (feeds) => {
  let i = 0
  for (i = 0; i < feeds.length; i++) {
    feeds[i].read = false
  }
  return feeds
}

const newsFeed = () => {
  let news = store.newsFeed

  if (news.length == 0) {
    news = store.newsFeed = initReadState(getData(newsUrl))
    store.lastPage = Math.ceil(news.length / store.pageSize)
  }

  const newsList = []
  let template = `
    <div class="bg-gray-600 min-h-screen">
      <div class="bg-white text-xl">
        <div class="mx-auto px-4">
          <div class="flex justify-between items-center py-6">
            <div class="flex justify-start">
              <h1 class="font-extrabold">Hacker News</h1>
            </div>
            <div class="items-center justify-end">
              <a href="#/page/@prev" class="text-gray-500">
                Previous
              </a>
              <a href="#/page/@next" class="text-gray-500 ml-4">
                Next
              </a>
            </div>
          </div> 
        </div>
      </div>
      <div class="p-4 text-2xl text-gray-700">
        @news       
      </div>
    </div>
  `

  for (let i = (store.currentPage - 1) * store.pageSize; i < (store.currentPage) * store.pageSize; i++) {
    const { id, title, comments_count, user, points, time_ago, read } = news[i]
    newsList.push(`
      <div class="read p-6 ${read ? 'bg-gray-500' : 'bg-white'} mt-6 rounded-lg shadow-md transition-colors duration-500 hover:bg-green-100">
        <div class="flex">
          <div class="flex-auto">
            <a href="#/show/${id}">${title}</a>  
          </div>
          <div class="text-center text-sm">
            <div class="w-10 text-white bg-green-300 rounded-lg px-0 py-2">${comments_count}</div>
          </div>
        </div>
        <div class="flex mt-3">
          <div class="grid grid-cols-3 text-sm text-gray-500">
            <div><i class="fas fa-user mr-1"></i>${user}</div>
            <div><i class="fas fa-heart mr-1"></i>${points}</div>
            <div><i class="far fa-clock mr-1"></i>${time_ago}</div>
          </div>  
        </div>
      </div>    
    `)
  }

  template = template.replace('@news', newsList.join(''))
  template = template.replace('@prev', store.currentPage > 1 ? store.currentPage - 1 : 1)
  template = template.replace('@next', store.currentPage < store.lastPage ? store.currentPage + 1 : store.lastPage)

  root.innerHTML = template
}

const newsContent = () => {
  const id = location.hash.slice(7)

  store.newsFeed.map(news => {
    if (news.id == Number(id)) {
      news.read = true
    }
  })

  const { title, content, comments } = getData(contentUrl.replace("@id", id))
  let template = `
    <div class="bg-gray-600 min-h-screen pb-8">
      <div class="bg-white text-xl">
        <div class="mx-auto px-4">
          <div class="flex justify-between items-center py-6">
            <div class="flex justify-start">
              <a href="#/page/${store.currentPage}" class="font-extrabold">Hacker News</a>
            </div>
            <div class="items-center justify-end">
              <a href="#/page/${store.currentPage}" class="text-gray-500">
                <i class="fa fa-times"></i>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div class="h-full border rounded-xl bg-white m-6 p-4 ">
        <h2>${title}</h2>
        <div class="text-gray-400 h-20">
          ${content}
        </div>
        @comments
      </div>
    </div>
  `
  const makeComment = (comments) => {
    const commentStr = []

    for (let i = 0; i < comments.length; i++) {
      const { user, content, time_ago, level } = comments[i]
      commentStr.push(`
        <div style="padding-left: ${level * 20}px;" class="mt-4">
          <div class="text-gray-400">
            <i class="fa fa-sort-up mr-2"></i>
            <strong>${user}</strong> ${time_ago}
          </div>
          <p class="text-gray-700">${content}</p>
        </div>
      `)

      if (comments[i].comments) {
        // 재귀함수를 통해 대댓글을 만들어준다.
        commentStr.push(makeComment(comments[i].comments))
      }
    }

    return commentStr.join('')
  }
  root.innerHTML = template.replace('@comments', makeComment(comments))
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