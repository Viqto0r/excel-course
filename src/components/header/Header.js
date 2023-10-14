import { ExcelComponent } from '../../core/ExcelComponent'
import { $ } from '../../core/dom'
import { changeTitle } from '../../redux/actions'
import { createHeader } from './header.template'

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    })
  }

  toHTML() {
    return createHeader(this.store.getState())
  }

  onInput(e) {
    this.$dispatch(changeTitle($(e.target).text()))
  }
}
