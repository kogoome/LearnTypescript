export default abstract class View {
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
    //this.renderTemplate = this.renderTemplate.replace(`@${key}`, value) 
    //이건 하나만 변경한다 여러개 변경하려면 for문을 돌리거나 아래처럼 스플릿을 사용한다.
    this.renderTemplate = this.renderTemplate.split(`@${key}`).join(value)
  }
  private clearHtmlList():void { this.htmlList = [] }
  abstract render():void
}