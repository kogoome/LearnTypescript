import { NewsFeed, NewsStore } from "./types"

export default class Store implements NewsStore {
  private _feeds: NewsFeed[]
  private _currentPage: number
  private _pageSize: number
  private _lastPage: number

  constructor() {
    this._feeds = []
    this._currentPage = 1
    this._pageSize = 5
    this._lastPage = 1
  }

  get currentPage() { return this._currentPage } 
  get pageSize() { return this._pageSize }
  get lastPage() { return this._lastPage }
  set currentPage(currentPage: number) { this._currentPage = currentPage }
  set pageSize(pageSize: number) { this._pageSize = pageSize }
  set lastPage(lastPage: number) { this._lastPage = lastPage }
  get nextPage():number { return this._currentPage<this._lastPage?this._currentPage + 1:this._lastPage }
  get prevPage():number { return this._currentPage>1?this._currentPage - 1:1 }
  get numberOfFeed():number { return this._feeds.length }
  get hasFeed():boolean { return this._feeds.length > 0 }

  getAllFeeds():NewsFeed[] { return this._feeds }

  getFeed(position:number):NewsFeed { return this._feeds[position] }
  setFeeds(feeds:NewsFeed[]) { this._feeds=feeds.map(feed=>({...feed,read:false})) }
  makeRead(id:number):void {
    const feed = this._feeds.find((feed:NewsFeed)=>feed.id===id)
    if (feed) feed.read = true
  }
}