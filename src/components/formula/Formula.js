import { ExcelComponent } from '../../core/ExcelComponent'
import { $ } from '../../core/dom'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
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
    super.init()
    this.$formula = this.$root.find('#formula')

    this.$on('cell:input', (text) => {
      this.$formula.text(text)
    })
    this.$on('cell:select', (text) => {
      this.$formula.text(text)
    })
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab']
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.$emit('formula:done')
    }
  }
}
