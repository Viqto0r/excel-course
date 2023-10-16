import { $ } from '../dom'
import { ActiveRoute } from './ActiveRoute'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is non provided in Router')
    }

    this.placeholder = $(selector) // Контейнер для всего приложения
    this.routes = routes // Объект с маршрутами

    this.pageChangeHandler = this.pageChangeHandler.bind(this) // привязываем контекст к методу

    this.init()
    // Сохраняем текущую отрендеренную страницу
    this.page = null
  }

  init() {
    // Вешаем обработчик события на изменения хэша в адресной строке
    window.addEventListener('hashchange', this.pageChangeHandler)
    this.pageChangeHandler()
  }

  pageChangeHandler() {
    // Уничтожаем текущий отрендеренный компонент
    if (this.page) {
      this.page.destroy()
    }

    // Очищаем контейнер (placeholder)
    this.placeholder.clear()
    // Получаем класс компонента в зависимости от маршрута.
    // Если в маршруте есть слово 'excel', то получаем класс Excel, иначе Dashboard

    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard
    // Создаем инстанс полученного класса
    this.page = new Page(ActiveRoute.param)
    // добавляем в контейнер html текущей страницы

    this.placeholder.append(this.page.getRoot())
    // после отрисовки компонента запускаем хук инициализации компонента
    this.page.afterRender()
  }

  destroy() {
    // Удаляем обработчик события на изменение хэша
    window.removeEventListener('hashchange', this.pageChangeHandler)
  }
}
