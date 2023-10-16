import { Excel } from '../components/excel/Excel'
import { Toolbar } from '../components/toolbar/Toolbar'
import { Header } from '../components/header/Header'
import { Formula } from '../components/formula/Formula'
import { Table } from '../components/table/Table'
import { debounce, storage } from '../core/utils'
import { Page } from './Page'
import { createStore } from '../core/createStore'
import { rootReducer } from '../redux/rootReducer'
import { getInitialStateFromLocalstorage } from '../redux/initialState'

const storageName = (param) => {
  return `excel:${param}`
}

export class ExcelPage extends Page {
  getRoot() {
    // Получаем параметры маршрута - #hash/"Параметры". Если #excel/без параметров, то генерируем их Date.now()
    const params = this.params || Date.now()
    // Получаем начальное состояние из localstorage в зависимости от параметров
    const initialState = getInitialStateFromLocalstorage(params)
    // Создаем стор на основе initialState
    const store = createStore(rootReducer, initialState)
    // Обновляем localstorage с задержкой для оптимизации производительности. Прогоняем через функцию debounce
    const stateLater = debounce((state) => {
      storage(storageName(params), state)
    }, 300)
    store.subscribe(stateLater)
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
  }
}
