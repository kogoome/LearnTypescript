import {NewsFeed, NewsContent} from '../types'

export class Api {
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

export class NewsFeedApi extends Api {
  getFeed():NewsFeed[] {
    return this.getRequest<NewsFeed[]>()
  }
}

export class NewsContentApi extends Api {
  getContent():NewsContent {
    return this.getRequest<NewsContent>()
  }
}