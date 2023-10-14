import { range } from '../../core/utils'

export const shouldResize = (event) => event.target.dataset.resize
export const isCell = (event) => event.target.dataset.id
export const shouldSwitchCell = (event) =>
  /(ArrowRight|ArrowLeft|ArrowUp|ArrowDown|Tab|Enter)/.test(event.key) &&
  !event.shiftKey

export const matrix = ($current, $target) => {
  const current = $current.id(true)
  const target = $target.id(true)
  const rows = range(current.row, target.row)
  const cols = range(current.col, target.col)

  return rows.reduce((acc, row) => {
    cols.forEach((col) => {
      acc.push(`${row}:${col}`)
    })
    return acc
  }, [])
}

export const increaseSwitch = (num, limit) => {
  return num >= limit ? limit : num + 1
}

export const decreaseSwitch = (num) => {
  return num <= 0 ? 0 : num - 1
}

export const nextSelector = (key, col, row, limits) => {
  switch (key) {
    case 'ArrowRight':
    case 'Tab':
      col = increaseSwitch(col, limits.cols - 1)
      break

    case 'ArrowDown':
    case 'Enter':
      row = increaseSwitch(row, limits.rows - 1)
      break
    case 'ArrowLeft':
      col = decreaseSwitch(col)
      break
    case 'ArrowUp':
      row = decreaseSwitch(row)
      break
  }

  return `[data-id="${row}:${col}"]`
}

export const setCursorInEndText = ($el) => {
  if (!$el.text()) return

  const range = document.createRange()
  const select = window.getSelection()

  range.setStart($el.$el, 1)
  range.collapse(true)

  select.removeAllRanges()
  select.addRange(range)
}
