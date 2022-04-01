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



const newsUrl : string = `https://api.hnpwa.com/v0/news/1.json`
const contentUrl : string = `https://api.hnpwa.com/v0/item/@id.json`
const store : Store = { currentPage: 1, pageSize: 5, newsFeed: [], lastPage: 1 }
//---------------------------------------------------

function applyApiMixins(targetClass:any, baseClasses:any[]):void {
  baseClasses.forEach((baseClass:{prototype:{[x:string]:any}})=> {
    Object.getOwnPropertyNames(baseClass.prototype).forEach(name => {
      const descriptor = Object.getOwnPropertyDescriptor(baseClass.prototype, name)
      if (descriptor) { Object.defineProperty(targetClass.prototype, name, descriptor) }
    })
  })
}
class Api {
  getRequest<AjaxResponse>(url:string):AjaxResponse {
    const ajax = new XMLHttpRequest
    ajax.open('GET', url, false)
    ajax.send()
    return JSON.parse(ajax.response)
  }
}
interface NewsFeedApi extends Api {}
interface NewsContentApi extends Api {}
class NewsFeedApi {
  getFeed():NewsFeed[] {
    return this.getRequest<NewsFeed[]>(newsUrl)
  }
}

class NewsContentApi {
  getContent(id:string):NewsContent {
    return this.getRequest<NewsContent>(contentUrl.replace('@id', id))
  }
}

applyApiMixins(NewsFeedApi, [Api])
applyApiMixins(NewsContentApi, [Api])
//---------------------------------------------------
abstract class View {
  private template:string
  private renderTemplate:string
  private container:HTMLElement
  private htmlList:string[]
  constructor(containerId:string, template:string) {
    const containerElement = document.getElementById(containerId)
    if (!containerElement) { throw new Error("container element not found") }
    this.container = containerElement
    this.template = template
    this.renderTemplate = template
    this.htmlList = []
  }
  protected updateView ():void { 
    this.container.innerHTML = this.renderTemplate 
    this.renderTemplate = this.template
  }
  protected addHtml(html:string):void { this.htmlList.push(html) }
  protected getHtml():string { 
    const snapshot = this.htmlList.join('')
    this.clearHtmlList()
    return snapshot
  }
  protected setTemplateData(key:string, value:string) {
    this.renderTemplate = this.renderTemplate.replace(`@${key}`, value)
  }
  private clearHtmlList():void { this.htmlList = [] }
  abstract render():void
}
class NewsFeedView extends View {
  private api:NewsFeedApi
  private feeds:NewsFeed[]
  constructor(containerId:string) {
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
    super(containerId, template)
    this.api = new NewsFeedApi()
    this.feeds = store.newsFeed
    if (this.feeds.length == 0) {
      this.feeds = store.newsFeed = (this.api.getFeed())
      this.initReadState()
      store.lastPage = Math.ceil(this.feeds.length / store.pageSize)
    }
  }

  render () {
    store.currentPage = Number(location.hash.substring(7)||1)
    for (let i = (store.currentPage - 1) * store.pageSize; i < (store.currentPage) * store.pageSize; i++) {
      const { id, title, comments_count, user, points, time_ago, read } = this.feeds[i]
      this.addHtml(`
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
  
    this.setTemplateData('news', this.getHtml())
    this.setTemplateData('prev', String(store.currentPage > 1 ? store.currentPage - 1 : 1))
    this.setTemplateData('next', String(store.currentPage < store.lastPage ? store.currentPage + 1 : store.lastPage))
    
    this.updateView()
  }

  initReadState():void { for (let i = 0; i < this.feeds.length; i++) { this.feeds[i].read = false } }
}

class NewsContentView extends View  {
  constructor(containerId:string) {
    let template = `
      <div class="bg-gray-600 min-h-screen pb-8">
        <div class="bg-white text-xl">
          <div class="mx-auto px-4">
            <div class="flex justify-between items-center py-6">
              <div class="flex justify-start">
                <a href="#/page/@currentPage" class="font-extrabold">Hacker News</a>
              </div>
              <div class="items-center justify-end">
                <a href="#/page/@currentPage" class="text-gray-500">
                  <i class="fa fa-times"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
  
        <div class="h-full border rounded-xl bg-white m-6 p-4 ">
          <h2>@title</h2>
          <div class="text-gray-400 h-20">
            @content
          </div>
          @comments
        </div>
      </div>
    `
    super(containerId, template)
  }

  render() {
    const id = location.hash.slice(7)
    const api = new NewsContentApi()
    const { title, content, comments } = api.getContent(id)
    store.newsFeed.map(news => {
      if (news.id == Number(id)) {
        news.read = true
      }
    })
    this.setTemplateData('comments', this.makeComment(comments))
    this.setTemplateData('currentPage',String(store.currentPage))
    this.setTemplateData('title', title)
    this.setTemplateData('content', content)
    this.updateView()
  }

  private makeComment(comments:NewsComment[]):string {
    for (let i = 0; i < comments.length; i++) {
      const { user, content, time_ago, level } = comments[i]
      this.addHtml(`
        <div style="padding-left: ${level * 20}px;" class="mt-4">
          <div class="text-gray-400">
            <i class="fa fa-sort-up mr-2"></i>
            <strong>${user}</strong> ${time_ago}
          </div>
          <p class="text-gray-700">${content}</p>
        </div>
      `)
      if (comments[i].comments) {
        this.addHtml(this.makeComment(comments[i].comments))
      }
    }
    return this.getHtml()
  }

}

interface RouteInfo {
  path:string
  page:View
}
class Router {
  routeTable:RouteInfo[]
  defaultRoute:RouteInfo|null
  constructor(){
    // bind 함수는 함수 객체를 감싸는 함수이다.
    // function1.bind(thisArg, thisArr)
    // bindfunction(thisArg, thisArr){
    //  function1(){
    //   ... this <- thisArg
    //  }
    // }
    // 위처럼 전달한 this값을 바인딩한 함수내부에서 사용가능하게 만들어준다.
    // 만약 바인딩을 안하고 이벤트리스너안에서 fn(){this}를 사용하면
    // this는 이벤트리스너 객체의 this를 가리키게 된다.
    window.addEventListener("hashchange", this.route.bind(this))
    this.routeTable = []
    this.defaultRoute = null
  }

  setDefaultPage(page:View):void {
    this.defaultRoute = {path:'',page}
  }
  addRoutePath(path:string, page:View):void {
    this.routeTable.push({ path, page })
  }
  route():void {
    console.log(this)
    const routePath = location.hash
    if (routePath==='' && this.defaultRoute) {
      this.defaultRoute.page.render()
    }
    
    for (const RouteInfo of this.routeTable) {
      if (routePath.indexOf(RouteInfo.path) >= 0) {
        RouteInfo.page.render()
        break
      }
    }
  }
}
//-----------------------------------------------------------

// 클래스를 작성하는 두번째 방법
// 사용먼저 해보고 사용할때 필요한것을 추적해 클래스에 등록한다.

// 생성하고
const router:Router = new Router() 
const newsFeedView:NewsFeedView = new NewsFeedView('root')
const newsContentView:NewsContentView = new NewsContentView('root')
// 라우터 추가함수 작동하게끔
router.addRoutePath('/page/', newsFeedView)
router.addRoutePath('/show/', newsContentView)
router.setDefaultPage(newsFeedView)
router.route()