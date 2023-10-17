// Принимает  чистую функцию для обработки состояния rootReducer и начальное состояние initialState
export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer(initialState, { type: '__INIT__' }) // Прогоняем начальное сосотояние через reducer для инициализации состояния
  let listeners = [] // массив с подписчиками, callback функции, которые вызовутся при изменении стейта

  return {
    // Функция подписки на изменение состояния. Принимает callback функцию, которая будет вызвана при изменении состояния.
    // Функции callback отправляются в массив подписчиков
    subscribe(callback) {
      listeners.push(callback)

      // Возвращает объект с функцией отписки от обновления состояния, для предотвращения  утечек памяти
      return {
        // Убираем из массива подписок callback, подписаный на изменение состояния
        unsubscribe() {
          listeners = listeners.filter((listener) => listener !== callback)
        },
      }
    },

    // функция, которая принимает action - {type: 'ТИП_СОБЫТИЯ', payload: 'полезная нагрузка - необязательное поле'}
    dispatch(action) {
      // отправляем состояние и action в редьюсер, для получения нового актуального состояния
      state = rootReducer(state, action)
      // уведомляем подписчиков о новом состоянии. Отправляем в callback функции новое состояние
      listeners.forEach((listener) => {
        listener(state)
      })
    },

    // Функция возвращающая актуальынй стейт
    getState() {
      return JSON.parse(JSON.stringify(state))
      //return state
    },
  }
}

export class Store {
  constructor(rootReducer, initialState = {}) {
    this.rootReducer = rootReducer
    this.state = this.rootReducer(initialState, { type: '__INIT__' })
    this.listeners = []
  }

  subscribe(callback) {
    this.listeners.push(callback)

    return {
      unsubscribe() {
        this.listeners = this.listeners.filter(
          (listener) => listener !== callback
        )
      },
    }
  }

  dispatch(action) {
    this.state = this.rootReducer(this.state, action)

    this.listeners.forEach((listener) => listener(this.state))
  }

  getState() {
    return this.state
  }
}
