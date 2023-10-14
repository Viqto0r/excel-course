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
import * as actions from '../../redux/actions'
import { defaultStyles } from '../../constans'
import { parse } from '../../core/parse'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  static size = { rows: 20, cols: 26 }

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'], // слушатели событий
      ...options,
    })
    this.prepare()
  }

  prepare() {
    // Создаем объект класса селектора
    this.selector = new TableSelection(this.$root)
  }

  // Инициализация компонента
  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    // Выделяем ячейку
    this.selectCell($cell)

    // Подписываемся на событие formula:input, для изменения данных в ячейке при изменении данных в формуле
    this.$on('formula:input', (text) => {
      this.selector.curentSelected.attr('data-value', text).text(parse(text))
      this.updateTextInStore(text)
    })

    // Подписываемся на событие formula:done, для переключения форкуса на ячейку после нажатия клавиш Enter и Tab в формуле
    this.$on('formula:done', () => {
      this.selector.curentSelected.focus()

      // Позиционируем курсор в конце текста при фокусе
      setCursorInEndText(this.selector.curentSelected)
    })

    // Подписываемся на событие изменение стиля ячейки в toolbar
    this.$on('toolbar:applyStyle', (value) => {
      // Применяем стиль из toolbar к выбранным ячейкам группы в UI
      this.selector.applyStyles(value)

      // Изменяем состояние выбранных ячеек в глобальном стейте
      this.$dispatch(
        actions.applyStyles({
          ids: this.selector.selectedIds,
          value,
        })
      )
    })
  }

  // Выбирает ячейку и запускает событие выбора в Formula
  selectCell($cell) {
    this.selector.select($cell)

    // Отправляем событие cell:select, для отображения данных ячейки в формуле
    this.$emit('cell:select', $cell)
    // Получаем стили выбранной ячейки
    const styles = $cell.getStyles(Object.keys(defaultStyles))
    // Меняем стили тулбара в стейте, в зависимости от стилей выбранной ячейки
    this.$dispatch(actions.changeStyles(styles))

    // Позиционируем курсор в конце текста при фокусе
    setCursorInEndText(this.selector.curentSelected)
  }

  // Создание верстки из шаблона
  toHTML() {
    return `${createTable(Table.size.rows, this.$state)}`
  }

  // Изменение размеров таблицы
  tableResize(event) {
    resizeHandler(event, this.$root).then((data) => {
      this.$dispatch(actions.resizeTable(data))
    })
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.tableResize(event)
    } else if (isCell(event)) {
      if (event.shiftKey) {
        // Если при клике зажата клавиша shift
        // Создаем матрицу с индексами и переобразуем в массив с ячейками по этим индексам
        const cells = matrix(this.selector.curentSelected, $(event.target)).map(
          (id) => this.$root.find(`[data-id="${id}"]`)
        )
        // Выделяем группу ячеек
        this.selector.selectGroup(cells)
      } else {
        // Выделяем ячейку
        this.selectCell($(event.target))
      }
    }
  }

  onKeydown(event) {
    if (shouldSwitchCell(event)) {
      event.preventDefault()
      // Переключаем ячейку
      this.selector.switchCell(event.key, Table.size)
      // Выделяем ячейку
      this.selectCell(this.selector.curentSelected)
    }
  }

  updateTextInStore(currentText) {
    console.log(currentText)
    this.$dispatch(
      actions.changeText({
        id: this.selector.curentSelected.id(),
        currentText,
      })
    )
  }

  onInput(event) {
    // При вводе в ячейку изменяем текст в формуле
    //const text = $(event.target).text()
    //this.$emit('cell:input', text)
    this.updateTextInStore($(event.target).text())
  }
}
