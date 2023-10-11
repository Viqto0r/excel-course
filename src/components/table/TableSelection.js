import { nextSelector } from './table.functions'

export default class TableSelection {
  static className = 'selected'

  constructor($root) {
    this.$root = $root
    this.group = []
    this.curentSelected = null
  }

  select($el) {
    this.clear()
    this.group.push($el)
    this.curentSelected = $el
    $el.addClass(TableSelection.className).focus()
  }

  selectGroup($elements = []) {
    this.clear()
    this.group = $elements

    $elements.forEach(($el) => {
      $el.addClass(TableSelection.className)
    })
  }

  switchCell(key, limits) {
    const { col, row } = this.curentSelected.id(true)
    const selector = nextSelector(key, col, row, limits)

    this.select(this.$root.find(selector))
  }

  clear() {
    this.group.forEach(($el) => $el.removeClass(TableSelection.className))
    this.group = []
  }
}
