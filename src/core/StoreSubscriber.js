import { isEqual } from './utils'

export class StoreSubscriber {
  constructor(store) {
    this.store = store
    this.sub = null // сохраняем подписку, чтобы потом отписаться
    this.prevState = {} // предыдущее стостояние стрейта
  }

  subscribeComponents(components) {
    this.prevState = this.store.getState() // получаем предыдущее состояние стейта

    // делаем подписку на изменение стейта
    this.sub = this.store.subscribe((state) => {
      // Перебираем ключи стейта
      Object.keys(state).forEach((key) => {
        // Если предыдущее значение по ключу key НЕ равно текущему значению стейта по ключу key - то стейт по текущему ключу изменился
        if (!isEqual(this.prevState[key], state[key])) {
          // Перебираем компоненты
          components.forEach((component) => {
            // Проверяем подписки компонента, если в массиве subscribe есть key
            if (component.isWatching(key)) {
              // Создаем объект с новыми данными
              const changes = {
                [key]: state[key],
              }
              // Уведомляем компонент, что данные на которые он подписан изменились.
              // 1)Компонент подписан на изменение данных - в массиве subscribe есть key
              // 2)Данные из предыдущего стейта prevState[key] отличаются от данных текущего стейта state[key]
              component.storeChanged(changes)
            }
          })
        }
      })
      // Обновляем предыдущий стейт свежими данными
      this.prevState = this.store.getState()
    })
  }
  // Отписываемся от получения данных
  unsubsrcibeFromStore() {
    this.sub.unsubscribe()
  }
}
