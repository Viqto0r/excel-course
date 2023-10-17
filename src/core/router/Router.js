import { Loader } from '../../components/Loader'
import { $ } from '../dom'
import { ActiveRoute } from './ActiveRoute'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is non provided in Router')
    }

    this.placeholder = $(selector) // Контейнер для всего приложения
    this.routes = routes // Объект с маршрутами
    this.loader = new Loader() // Сохраняем loader
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

  async pageChangeHandler() {
    // Уничтожаем текущий отрендеренный компонент
    if (this.page) {
      this.page.destroy()
    }

    // Очищаем контейнер (placeholder) и добавляем loader
    this.placeholder.clear().append(this.loader)

    // Получаем класс компонента в зависимости от маршрута.
    // Если в маршруте есть слово 'excel', то получаем класс Excel, иначе Dashboard
    const Page = ActiveRoute.path.includes('excel')
      ? this.routes.excel
      : this.routes.dashboard
    // Создаем инстанс полученного класса
    this.page = await new Page(ActiveRoute.param)
    // получаем текущую страницу
    const root = await this.page.getRoot()
    // Убираем loader и добавляем в контейнер html текущей страницы
    this.placeholder.clear().append(root)
    // после отрисовки компонента запускаем хук инициализации компонента
    this.page.afterRender()
  }

  destroy() {
    // Удаляем обработчик события на изменение хэша
    window.removeEventListener('hashchange', this.pageChangeHandler)
  }
}
