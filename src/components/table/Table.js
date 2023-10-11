import { ExcelComponent } from '../../core/ExcelComponent'
import { $ } from '../../core/dom'
import TableSelection from './TableSelection'
import {
  shouldResize,
  isCell,
  matrix,
  shouldSwitchCell,
  setCursorInEndText,
} from './table.functions'
import { resizeHandler } from './table.resize'
import { createTable } from './table.template'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  static size = { rows: 20, cols: 26 }

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    })
    this.prepare()
  }

  prepare() {
    this.selector = new TableSelection(this.$root)
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)

    this.$on('formula:input', (text) => {
      this.selector.curentSelected.text(text)
    })

    this.$on('formula:done', () => {
      this.selector.curentSelected.focus()

      // Позиционируем курсор в конце текста при фокусе
      setCursorInEndText(this.selector.curentSelected)
    })
  }

  // Выбирает ячейку и запускает событие выбора в Formula
  selectCell($el) {
    this.selector.select($el)
    this.$emit('cell:select', $el.text())
    // Позиционируем курсор в конце текста при фокусе
    setCursorInEndText(this.selector.curentSelected)
  }

  toHTML() {
    return `${createTable(Table.size.rows)}`
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$root)
    } else if (isCell(event)) {
      if (event.shiftKey) {
        const cells = matrix(this.selector.curentSelected, $(event.target)).map(
          (id) => this.$root.find(`[data-id="${id}"]`)
        )
        this.selector.selectGroup(cells)
      } else {
        this.selectCell($(event.target))
      }
    }
  }

  onKeydown(event) {
    if (shouldSwitchCell(event)) {
      event.preventDefault()
      this.selector.switchCell(event.key, Table.size)
      this.selectCell(this.selector.curentSelected)
    }
  }

  onInput(event) {
    const text = $(event.target).text()
    this.$emit('cell:input', text)
  }
}
