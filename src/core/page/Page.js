export class Page {
  constructor(params) {
    // Получаем параметры маршрута - #hash/"Параметры". Если #excel/без параметров, то генерируем их Date.now()
    this.params = params || Date.now()
  }

  getRoot() {
    throw new Error('Method "getRoot" should be implemented')
  }

  afterRender() {}

  destroy() {}
}
