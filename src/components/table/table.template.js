const CODES = {
  A: 65,
  Z: 90,
}

const createRow = (dataContent, infoContent = '') => {
  const resize = infoContent
    ? '<div class="row-resize" data-resize="row"></div>'
    : ''
  return `<div class="row" data-type="resizable">
            <div class="row-info">${infoContent}${resize}</div>
            <div class="row-data">
              ${dataContent}
            </div>
          </div>
	`
}
const toCell = (_, idx) => {
  return `<div class="cell" contenteditable data-col-count="${idx}"></div>`
}
const toColumn = (content, idx) => {
  return `
		<div
		class="column"
		data-type="resizable"
		data-col-count="${idx}">${content}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`
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
