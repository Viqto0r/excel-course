import { ExcelComponent } from '../../core/ExcelComponent'
import { $ } from '../../core/dom'
import { ActiveRoute } from '../../core/router/ActiveRoute'
import { changeTitle } from '../../redux/actions'
import { createHeader } from './header.template'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options,
    })
  }

  toHTML() {
    return createHeader(this.store.getState())
  }

  onInput(e) {
    this.$dispatch(changeTitle($(e.target).text()))
  }

  onClick(e) {
    const button = $(e.target).closest('[data-type="btn"]')
    if (button) {
      if (button.data.btnType === 'delete') {
        const decision = confirm('Вы уверены, что хотите удалить таблицу?')
        if (decision) {
          localStorage.removeItem(`excel:${ActiveRoute.param}`)
          ActiveRoute.navigate('')
        }
      }
      if (button.data.btnType === 'exit') {
        ActiveRoute.navigate('')
      }
    }
  }
}
