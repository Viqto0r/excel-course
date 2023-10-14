import { capitalize } from './utils'

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) throw new Error('No $root provided for DomListener')
    this.$root = $root // корень компонента, контейнер
    this.listeners = listeners // массив слушателей событий
  }

  // инициализируем слушатели
  initDOMListeners() {
    this.listeners.forEach((listener) => {
      // получаем название метода с приставкой "on"
      const method = getMethodName(listener)
      if (!this[method]) {
        // Если в классе не создан метод, а в массиве listeners он есть, то будет ошибка
        throw new Error(
          `Method ${method} is not implemented in ${this.name} Component`
        )
      }
      // Привязываем контекст к методу, при передаче метода контекст this теряется
      this[method] = this[method].bind(this)

      this.$root.on(listener, this[method])
    })
  }
  // удаление всех слушателей
  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener)

      this.$root.off(listener, this[method])
    })
  }
}
// Преобразует наазвание события из input в onInput
const getMethodName = (eventName) => {
  return 'on' + capitalize(eventName)
}
