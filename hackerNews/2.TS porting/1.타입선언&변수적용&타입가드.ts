// type alias

type Store = {
  newsFeed: NewsFeed[],
  currentPage: number,
  lastPage: number,
  pageSize: number
}

type NewsFeed = {
  id: number,
  title: string,
  comments_count: number,
  url: string,
  user: string,
  // 좋아요 수
  points: number,
  time_ago: string,
  // 이 데이터는 있을 수 도 있고 없을 수 도 있기 때문에 ? 상태표기를 해준다
  read?: boolean
}


//---------------------------------------------------


const root : HTMLElement | null = document.getElementById("root")
const ajax : XMLHttpRequest = new XMLHttpRequest
const newsUrl : string = `https://api.hnpwa.com/v0/news/1.json`
const contentUrl : string = `https://api.hnpwa.com/v0/item/@id.json`
const store : Store = { currentPage: 1, pageSize: 5, newsFeed: [], lastPage: 1 }
//---------------------------------------------------


const getData = (url :string) => {
  ajax.open("GET", url, false)
  ajax.send()
  return JSON.parse(ajax.response)
}

const initReadState = (feeds:NewsFeed[]) => {
  let i = 0
  for (i = 0; i < feeds.length; i++) {
    feeds[i].read = false
  }
  return feeds
}

// 이렇게 널에러가 방지할 경우를 타입스크립트에서 미리 말해주며 이를 방어하기 위한코드를
// 타입 가드라고 함
const updateView = (html:string) => {
  if (root) {
    root.innerHTML = html
  } else {
    console.error("root element not found")
  }
}

const newsFeed = () => {
  let news :NewsFeed[] = store.newsFeed

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
  
  updateView(template)
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

  updateView(template.replace('@comments', makeComment(comments)))
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