import { Emitter } from '../../core/Emitter'
import { $ } from '../../core/dom'
import { StoreSubscriber } from '../../core/StoreSubscriber'
import { updateOpenData } from '../../redux/actions'

export class Excel {
  constructor(options = []) {
    this.components = options.components
    this.store = options.store
    this.emitter = new Emitter()
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    const componentOptions = {
      emitter: this.emitter,
      store: this.store,
    }

    this.components = this.components.map((Component) => {
      // создаем корневой элемент
      const $el = $.create('div', Component.className)
      // Получаем инстанс компонента
      const component = new Component($el, componentOptions)
      // Отправляем в корневой компонент верстку текущего компонента
      $el.html(component.toHTML())
      // Отправляем коревой элемент компонента в корневой элемент страницы
      $root.append($el)
      // Возвращаем инстанс компонента
      return component
    })
    // Возвращаем корневой элемент страницы
    return $root
  }

  init() {
    //Обновляем время полсднего открытия
    this.store.dispatch(updateOpenData())
    // Подписываем компоненты на обновление глобального стора
    this.subscriber.subscribeComponents(this.components)
    // Инициализируем компоненты
    this.components.forEach((Component) => Component.init())
  }

  destroy() {
    // Удаляем все подписки
    this.subscriber.unsubsrcibeFromStore()
    this.components.forEach((Component) => Component.destroy())
  }
}
