import View from '../core/view'
import {NewsFeedApi} from '../core/api'
import {NewsFeed} from '../types'
import {newsUrl} from '../config'
import Store from '../store'

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
export default class NewsFeedView extends View {
  private api:NewsFeedApi
  private feeds:NewsFeed[]
  private store:NewsStore

  constructor(containerId:string, store:NewsStore) {
    super(containerId, template)
    this.store = store
    this.api = new NewsFeedApi(newsUrl)
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
