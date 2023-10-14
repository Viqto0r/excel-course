import { ExcelComponent } from '../../core/ExcelComponent'
import { $ } from '../../core/dom'
//import * as actions from '../../redux/actions'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'], // слушатели событий
      subscribe: ['currentText'], // подписка на НУЖНЫЕ поля в  стейте
      ...options,
    })
    this.$formula = null
  }

  toHTML() {
    return `
			<div class="info">fx</div>
			<div id="formula"
			class="input"
			onInput="1"
			contenteditable
			spellcheck="false"></div>
		`
  }

  init() {
    // инициализация компонента
    super.init()

    // Получаем элемент формулы из DOM дерева при инициализации компонента
    this.$formula = this.$root.find('#formula')

    // Подписываемся на событие выбора ячейки cell:select, для отображения данных ячейки в формуле
    this.$on('cell:select', ($cell) => {
      //this.$formula.text(text)
      this.$formula.text($cell.text())
    })
  }
  storeChanged(data) {
    // Получаем новые данные из стейта. Только те, на которые подписан компонент -  хранятся в массиве subscribe
    this.$formula.text(data.currentText)
  }

  onInput(event) {
    // Отправляем событие formula:input при вводе в формулу, для отображения данных в ячейке

    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      // Отправляем событие formula:done при Нажатии клавиш Enter и Tab - потеря фокуса на формуле
      this.$emit('formula:done')
    }
  }
}
