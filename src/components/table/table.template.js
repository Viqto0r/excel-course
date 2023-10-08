const CODES = {
  A: 65,
  Z: 90,
}

const createRow = (dataContent, infoContent = '') => {
  return `<div class="row">
            <div class="row-info">${infoContent}</div>
            <div class="row-data">
              ${dataContent}
            </div>
          </div>
	`
}
const toCell = () => {
  return `<div class="cell" contenteditable></div>`
}
const toColumn = (content) => {
  return `<div class="column">${content}</div>`
}

const toChar = (_, idx) => String.fromCharCode(idx + CODES.A)

export const createTable = (rowCount = 15) => {
  const colCount = CODES.Z - CODES.A + 1
  const rows = []
  const firstContentRow = new Array(colCount)
    .fill('')
    .map(toChar)
    .map(toColumn)
    .join('')

  rows.push(createRow(firstContentRow))

  for (let i = 0; i < rowCount; i++) {
    const rowContent = new Array(colCount).fill('').map(toCell).join('')

    rows.push(createRow(rowContent, i + 1))
  }

  return rows.join('')
}
