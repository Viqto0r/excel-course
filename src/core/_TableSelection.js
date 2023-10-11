import {
  createAreaLayer,
  selectArea,
  selectCellsInArea,
} from '../components/table/table.functions'
import { $ } from './dom'

class TableSelection {
  select(element) {
    $(element).addClass('selected')
  }

  unSelect(element) {
    $(element.findAll('.selected')).removeClass('selected')
    $(element.findAll('.inArea')).removeClass('inArea')
  }

  selectGroup(element, $root) {
    document.querySelector('.selected-area')?.remove()

    let target = element
    const startTargetCoords = $(target).getCoords()
    const { top: rootTop } = $root.getCoords()

    const selectedAreaLayer = createAreaLayer($root)

    const moveHandler = (e) => {
      if (e.target === target) return
      target = e.target

      selectArea(e, startTargetCoords, rootTop, selectedAreaLayer, $root)
    }

    $root.on('mousemove', moveHandler)

    $root.on('mouseup', () => {
      selectCellsInArea($root)
      $root.off('mousemove', moveHandler)
    })
  }
}

export default new TableSelection()

//const selectLeftTop = (
//  { top: startTargetTop },
//  {
//    bottom: currentTargetBottom,
//    top: currentTargetTop,
//    height: currentTargetHeight,
//  },
//  rootTop,
//  shift
//) => {
//  if (currentTargetBottom < startTargetTop) {
//    console.log('left top')
//    shift.height =
//      Math.abs(currentTargetTop - startTargetTop - currentTargetHeight) + 'px'
//    shift.top = currentTargetTop - rootTop + 'px'
//  }
//}

//const selectLeftBottom = (
//  { top: startTargetTop },
//  { bottom: currentTargetBottom },
//  rootTop,
//  shift
//) => {
//  if (currentTargetBottom > startTargetTop) {
//    console.log('left bottom')

//    shift.height = Math.abs(currentTargetBottom - startTargetTop) + 'px'
//    shift.top = startTargetTop - rootTop + 'px'
//  }
//}

//export const selectRightTop = (
//  { top: startTargetTop },
//  {
//    bottom: currentTargetBottom,
//    top: currentTargetTop,
//    height: currentTargetHeight,
//  },
//  rootTop,
//  shift
//) => {
//  if (currentTargetBottom < startTargetTop) {
//    console.log('right top')
//    shift.height =
//      Math.abs(currentTargetTop - startTargetTop - currentTargetHeight) + 'px'
//    shift.top = currentTargetTop - rootTop + 'px'
//  }
//}

//export const selectRightBottom = (
//  { top: startTargetTop },
//  { bottom: currentTargetBottom },
//  rootTop,
//  shift
//) => {
//  if (currentTargetBottom > startTargetTop) {
//    console.log('right bottom')
//    shift.height = currentTargetBottom - startTargetTop + 'px'
//    shift.top = startTargetTop - rootTop + 'px'
//  }
//}

//const selectLeft = (
//  startTargetCoords,
//  currentTargetCoords,
//  rootTop,
//  border
//) => {
//  const { left: startTargetLeft } = startTargetCoords
//  const {
//    right: currentTargetRight,
//    width: currentTargetWidth,
//    left: currentTargetLeft,
//  } = currentTargetCoords

//  if (currentTargetRight <= startTargetLeft) {
//    const shift = {
//      left: currentTargetLeft + 'px',
//      width:
//        Math.abs(
//          currentTargetRight - startTargetLeft - currentTargetWidth * 2
//        ) + 'px',
//    }

//    selectLeftTop(startTargetCoords, currentTargetCoords, rootTop, shift)
//    selectLeftBottom(startTargetCoords, currentTargetCoords, rootTop, shift)

//    border.css(shift)
//  }
//}

//const selectRight = (
//  startTargetCoords,
//  currentTargetCoords,
//  rootTop,
//  border,
//  $root
//) => {
//  const { left: startTargetLeft } = startTargetCoords
//  const { right: currentTargetRight } = currentTargetCoords

//  if (currentTargetRight > startTargetLeft) {
//    const shift = {
//      width: currentTargetRight - startTargetLeft + 'px',
//      left: startTargetLeft + $root.$el.scrollLeft + 'px',
//    }
//    selectRightTop(startTargetCoords, currentTargetCoords, rootTop, shift)
//    selectRightBottom(startTargetCoords, currentTargetCoords, rootTop, shift)

//    border.css(shift)
//  }
//}

//export const selectArea = (e, startTargetCoords, rootTop, border, $root) => {
//  const currentTargetCoords = $(e.target).getCoords()

//  selectLeft(startTargetCoords, currentTargetCoords, rootTop, border)
//  selectRight(startTargetCoords, currentTargetCoords, rootTop, border, $root)
//}

//export const createAreaLayer = ($root) => {
//  const area = $.create('div', 'selected-area')
//  area.css({
//    position: 'absolute',
//    zIndex: 100,
//    outline: '1px solid #3c74ff',
//    pointerEvents: 'none',
//  })
//  $root.append(area)

//  return area
//}

//export const selectCellsInArea = ($root) => {
//  const selectArea = $('.selected-area')
//  const {
//    left: areaLeft,
//    right: areaRight,
//    top: areaTop,
//    bottom: areaBottom,
//  } = selectArea.getCoords()
//  const allCells = Array.from($root.findAll('.cell'))

//  allCells.forEach((cell) => {
//    const {
//      left: cellLeft,
//      right: cellRight,
//      top: cellTop,
//      bottom: cellBottom,
//    } = $(cell).getCoords()
//    if (
//      cellLeft >= areaLeft &&
//      cellRight <= areaRight &&
//      cellTop >= areaTop &&
//      cellBottom <= areaBottom
//    ) {
//      cell.classList.add('inArea')
//    }
//  })
//}
