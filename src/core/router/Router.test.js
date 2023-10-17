import { Router } from './Router'
import { Page } from '../page/Page'

class Dashboard extends Page {
  getRoot() {
    const root = document.createElement('div')
    root.innerHTML = 'dashboard'
    return root
  }
}
class ExcelPage extends Page {}

describe('Router', () => {
  let router
  let $root
  beforeEach(() => {
    $root = document.createElement('div')
    router = new Router($root, {
      dashboard: Dashboard,
      excel: ExcelPage,
    })
  })

  test('should be defind', () => {
    expect(router).toBeDefined()
  })

  test('should render dashboard page', () => {
    router.pageChangeHandler()
    expect($root.innerHTML).toBe('<div>dashboard</div>')
  })
})
