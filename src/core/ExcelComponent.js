import { DomListener } from './DomListener'

export class ExcelComponent extends DomListener {
  // Возвращает шаблон компонента
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || '' // Имя компонента
    this.emitter = options.emitter // инстанс класса Emmiter
    this.store = options.store // store
    this.subscribe = options.subscribe || [] // массив подписок StoreSubscriber
    this.unsubscribers = [] // массив отписок от слушателя emitter

    this.prepare() // Вызываем перед рендором компонента
  }

  // Возвращаем верстку по шаблону
  toHTML() {
    return ''
  }

  // Подготавливаем компонент перед инциализацией  - init()
  prepare() {}

  // Оборачиваем методы emitter для обращения к $emit вместо this.emitter.emit
  $emit(event, ...data) {
    this.emitter.emit(event, ...data)
  }

  // Оборачиваем методы emitter для обращения к $on вместо this.emitter.subscribe
  $on(event, fn) {
    const unsubscriber = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsubscriber)
  }

  // Оборачиваем методы stora для обращения к $dispatch вместо this.store.dispatch
  $dispatch(action) {
    this.store.dispatch(action)
  }

  // Проверяем подписал ли компонент на данное поле в стейте по ключу key
  isWatching(key) {
    return this.subscribe.includes(key)
  }

  //Уведомляем компонент об изменении данных по нужному для него полю
  storeChanged() {}

  get $state() {
    return this.store.getState()
  }

  // Инициализируем компонент
  init() {
    this.initDOMListeners()
  }

  // Уничтожаем компонент
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach((unsubscriber) => {
      unsubscriber()
    })
  }
}
