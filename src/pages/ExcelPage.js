import { Excel } from '../components/excel/Excel'
import { Toolbar } from '../components/toolbar/Toolbar'
import { Header } from '../components/header/Header'
import { Formula } from '../components/formula/Formula'
import { Table } from '../components/table/Table'
import { Page } from '../core/page/Page'
import { createStore } from '../core/store/createStore'
import { rootReducer } from '../redux/rootReducer'
import { normalizeInitialState } from '../redux/initialState'
import { StateProcessor } from '../core/page/StateProcessor'
import { LocalStorageClient } from '../shared/LocalStorageClient'

export class ExcelPage extends Page {
  constructor(param) {
    super(param)

    this.storeSub = null // подписка на хранилище
    this.processor = new StateProcessor(new LocalStorageClient(this.params)) // Инициализируем обработчик хранилища
  }

  async getRoot() {
    // Получаем начальное состояние из localstorage или БАЗЫ ДАННЫХ в зависимости от клиента
    const state = await this.processor.get()
    // Обрабатываем стейт. Если его не было в хранилище === null, то делаем его defaultState
    const initialState = normalizeInitialState(state)
    // Создаем стор на основе initialState
    const store = createStore(rootReducer, initialState)
    // Сохраняем подписку на стор, для дальнейшей отписки
    this.storeSub = store.subscribe(this.processor.listen)
    // Создаем инстанс класса Excel
    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    })
    // Возвращаем разметку
    return this.excel.getRoot()
  }

  afterRender() {
    this.excel.init()
  }

  destroy() {
    this.excel.destroy()
    this.storeSub.unsubscribe()
  }
}
