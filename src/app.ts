import Router from "./core/router"
import { NewsContentView,NewsFeedView } from "./page"
import Store from "./store"

const store = new Store()
const router:Router = new Router() 
const newsFeedView:NewsFeedView = new NewsFeedView('root', store)
const newsContentView:NewsContentView = new NewsContentView('root', store)

router.addRoutePath('/page/', newsFeedView)
router.addRoutePath('/show/', newsContentView)
router.setDefaultPage(newsFeedView)
router.route()