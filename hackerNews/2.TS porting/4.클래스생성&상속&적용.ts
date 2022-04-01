// interface
interface Store {
  newsFeed: NewsFeed[],
  currentPage: number,
  lastPage: number,
  pageSize: number
}
interface News {
  readonly id: number,
  readonly title: string,
  readonly content: string,
  readonly user: string,
  readonly url: string,
  readonly time_ago: string,
}
interface NewsFeed extends News {
  readonly comments_count: number,
  readonly points: number,
  read?: boolean
}
interface NewsContent extends News {
  readonly comments: []
}
interface NewsComment extends News {
  readonly comments: []
  readonly level: number
}
//---------------------------------------------------


const root : HTMLElement | null = document.getElementById("root")
const ajax : XMLHttpRequest = new XMLHttpRequest
const newsUrl : string = `https://api.hnpwa.com/v0/news/1.json`
const contentUrl : string = `https://api.hnpwa.com/v0/item/@id.json`
const store : Store = { currentPage: 1, pageSize: 5, newsFeed: [], lastPage: 1 }
//---------------------------------------------------


class Api {
  url:string
  ajax:XMLHttpRequest
  constructor(url:string) {
    this.url = url
    this.ajax = new XMLHttpRequest
  }
  // protected: 하위클래스를 통해서만 사용가능
  protected getRequest<AjaxResponse>():AjaxResponse {
    this.ajax.open('GET', this.url, false)
    this.ajax.send()
    return JSON.parse(this.ajax.response)
  }
}

class NewsFeedApi extends Api {
  getFeed():NewsFeed[] {
    return this.getRequest<NewsFeed[]>()
  }
}

class NewsContentApi extends Api {
  getContent():NewsContent {
    return this.getRequest<NewsContent>()
  }
}
//---------------------------------------------------


const initReadState = (feeds:NewsFeed[]):NewsFeed[] => {
  let i = 0
  for (i = 0; i < feeds.length; i++) {
    feeds[i].read = false
  }
  return feeds
}

const updateView = (html:string):void => {
  if (root) {
    root.innerHTML = html
  } else {
    console.error("root element not found")
  }
}

const newsFeed = ():void => {
  const api = new NewsFeedApi(newsUrl)
  let news :NewsFeed[] = store.newsFeed

  if (news.length == 0) {
    news = store.newsFeed = initReadState(api.getFeed())
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
  template = template.replace('@prev', String(store.currentPage > 1 ? store.currentPage - 1 : 1))
  template = template.replace('@next', String(store.currentPage < store.lastPage ? store.currentPage + 1 : store.lastPage))
  
  updateView(template)
}

const newsContent = ():void => {
  const id = location.hash.slice(7)
  const api = new NewsContentApi(contentUrl.replace('@id', id))
  store.newsFeed.map(news => {
    if (news.id == Number(id)) {
      news.read = true
    }
  })
  const { title, content, comments } = api.getContent()
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
  makeComment(comments)

  updateView(template.replace('@comments', makeComment(comments)))
}

const makeComment = (comments:NewsComment[]):string => {
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
      commentStr.push(makeComment(comments[i].comments))
    }
  }
  return commentStr.join('')
}

const router = ():void => {
  const routePath = location.hash
  if (routePath == '' || routePath == '#') {
    newsFeed()
    // 잘되는데 .startsWith() 문자열입력은 안받는다는 오류가 떠서 교체
  } else if (routePath.indexOf('#/page/')>=0) {
    store.currentPage = Number(routePath.slice(7))
    newsFeed()
  } else if (routePath.indexOf('#/show/')>=0) {
    newsContent()
  }
}

newsFeed()
window.addEventListener("hashchange", router)