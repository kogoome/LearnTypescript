import View from '../core/view'
import {NewsContentApi} from '../core/api'
import {NewsComment} from '../types'
import {contentUrl} from '../config'
import Store from '../store'

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
export default class NewsContentView extends View  {
  constructor(containerId:string) {
    super(containerId, template)
  }

  render() {
    const id = location.hash.slice(7)
    const api = new NewsContentApi(contentUrl.replace('@id', id))
    const { title, content, comments } = api.getContent()
    store.newsFeed.map(news => { if (news.id == Number(id)) { news.read = true } })
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
