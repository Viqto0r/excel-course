import { Excel } from './components/excel/Excel'
import { Formula } from './components/formula/Formula'
import { Header } from './components/header/Header'
import { Table } from './components/table/Table'
import { Toolbar } from './components/toolbar/Toolbar'
import { createStore } from './core/createStore'
import { debounce, storage } from './core/utils'
import { initialState } from './redux/initialState'
import { rootReducer } from './redux/rootReducer'
//import { Store } from './core/createStore'
import './scss/index.scss'

//const store = new Store(rootReducer, { colSize: {}, rowSize: {} })
const store = createStore(rootReducer, initialState)

const stateLater = debounce((state) => {
  storage('excel-table', state)
}, 300)

store.subscribe(stateLater)

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
})

excel.render()
