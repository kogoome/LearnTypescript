import View from "../core/view"

export interface NewsStore {
  getAllfeeds:()=>NewsFeed[]
  getFeed:(position:number)=>NewsFeed
  setFeeds:(feeds:NewsFeed[])=>void
  makeRead:(id:number)=>void
  hasFeed:boolean
  currentPage: number
  numberOfFeed:number
  nextPage:number
  prevPage:number
  lastPage:number
}
export interface News {
  readonly id: number
  readonly title: string
  readonly content: string
  readonly user: string
  readonly url: string
  readonly time_ago: string
}
export interface NewsFeed extends News {
  readonly comments_count: number
  readonly points: number
  read?: boolean
}
export interface NewsContent extends News {
  readonly comments: []
}
export interface NewsComment extends News {
  readonly comments: []
  readonly level: number
}
export interface RouteInfo {
  path:string
  page:View
}

