import { defaultStyles } from '../../constans'
import { parse } from '../../core/parse'
import { toInlineStyles } from '../../core/utils'

const CODES = {
  A: 65,
  Z: 90,
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

const getWidth = (state, idx) => {
  return `width:${state[idx] || DEFAULT_WIDTH}px`
}

const getHeight = (state, idx) => {
  return `height:${state[idx] || DEFAULT_HEIGHT}px`
}

const getCellInner = (dataState, id) => {
  return dataState[id] || ''
}

const createRow = (dataContent, rowIdx, rowSize) => {
  const resize = rowIdx
    ? '<div class="row-resize" data-resize="row"></div>'
    : ''
  const height = getHeight(rowSize, rowIdx)
  return `<div class="row" 
					data-type="resizable" 
					data-row-count=${rowIdx} 
					style=${height}>
            <div class="row-info">${rowIdx + 1 || ''}${resize}</div>
            <div class="row-data">
              ${dataContent}
            </div>
          </div>
	`
}

const toCell = (row, colSize, dataState, stylesState) => {
  return (_, col) => {
    const id = `${row}:${col}`
    //const defStyles = stylesState[id] || defaultStyles
    const styles = toInlineStyles({ ...defaultStyles, ...stylesState[id] })

    return `<div 
		class="cell"
		contenteditable
		data-col-count="${col}" 
		data-id="${id}"
		style="${styles}; ${getWidth(colSize, col)}"
		>${parse(getCellInner(dataState, id))}</div>`
  }
}

const toColumn = (colSize) => {
  return (content, idx) => {
    return `
		<div
		class="column"
		data-type="resizable"
		data-col-count="${idx}"
		style="${getWidth(colSize, idx)}">${content}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`
  }
}

const toChar = (_, idx) => String.fromCharCode(idx + CODES.A)

export const createTable = (
  rowCount = 15,
  { colSize, rowSize, dataState, stylesState }
) => {
  const colCount = CODES.Z - CODES.A + 1
  const rows = []
  const firstContentRow = new Array(colCount)
    .fill('')
    .map(toChar)
    .map(toColumn(colSize))
    .join('')

  rows.push(createRow(firstContentRow, -1, rowSize)) // -1 для пропуска порядкового номера строки заголовка

  for (let row = 0; row < rowCount; row++) {
    const rowContent = new Array(colCount)
      .fill('')
      .map(toCell(row, colSize, dataState, stylesState))
      .join('')

    rows.push(createRow(rowContent, row, rowSize))
  }

  return rows.join('')
}
