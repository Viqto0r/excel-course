import { DomListener } from './DomListener'

export class ExcelComponent extends DomListener {
  // Возвращает шаблон компонента
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.unsubscribers = []
  }

  toHTML() {
    return ''
  }
  // Подготавливаем компонент перед инциализацией  - init()
  prepare() {}

  $emit(event, ...data) {
    this.emitter.emit(event, ...data)
  }

  $on(event, fn) {
    const unsubscriber = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsubscriber)
  }
  // Инициализируем компонент
  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach((unsubscriber) => {
      unsubscriber()
    })
  }
}
