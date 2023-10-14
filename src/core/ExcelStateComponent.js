import { ExcelComponent } from './ExcelComponent'

export class ExcelStateComponent extends ExcelComponent {
  constructor(...args) {
    super(...args)
  }
  // Компонент возвращающий вёрстку.
  // !!! Нужно переписать у каждого наследуюмого класса, чтобы возвращалась верстка для компонента.
  // Так как метод генерации вёрстки каждого компонента называется по-разному
  get template() {
    return JSON.stringify(this.state, null, 2)
  }

  // Инициализируем локальный стейт компонента
  initState(initialState = {}) {
    this.state = { ...initialState }
  }

  // Обновляем локальный стейт компонента
  setState(newState) {
    this.state = { ...this.state, ...newState }
    // Обновляем верстку компонента
    // Отправляем новый шаблон созданный на основе локального стейта в innerHTML контейнера
    // Вызывается переопределенный геттер компонента template

    this.$root.html(this.template)
  }
}
