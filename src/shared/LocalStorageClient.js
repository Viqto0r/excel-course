import { storage } from '../core/utils'

const storageName = (param) => {
  return `excel:${param}`
}

export class LocalStorageClient {
  constructor(name) {
    // получаем параметры для поиска по ключу в state
    this.name = storageName(name)
  }

  save(state) {
    // Асинхронно сохраняем стейт
    storage(this.name, state)
    return Promise.resolve()
  }
  get() {
    //return Promise.resolve(storage(this.name))
    // Асинхронно получаем стейт
    return new Promise((resolve) => {
      const state = storage(this.name)
      setTimeout(() => {
        resolve(state)
      }, 1000)
    })
  }
}
