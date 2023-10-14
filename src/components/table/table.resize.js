import { $ } from '../../core/dom'

export const resizeHandler = (event, $root) => {
  return new Promise((resolve) => {
    const $resizer = $(event.target)
    const resizeType = $resizer.data.resize
    const resizerCoords = $resizer.getCoords()
    const resizeProp = resizeType === 'col' ? 'right' : 'bottom'
    let delta
    let value

    event.target.classList.add('active')
    document.onmousemove = (e) => {
      if (resizeType === 'col') {
        delta = e.pageX - resizerCoords.right
        value = resizerCoords.width + delta
      }
      if (resizeType === 'row') {
        delta = e.pageY - resizerCoords.bottom
        value = resizerCoords.height + delta
      }
      $resizer.css({ [resizeProp]: -value + 'px' })
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null
      const $parent = $resizer.closest('[data-type="resizable"]')
      const parentCoords = $parent.getCoords()
      let idx
      if (resizeType === 'col') {
        idx = $parent.data.colCount
        const col = $root.findAll(`[data-col-count="${idx}"]`)
        col.$el.forEach((cell) => {
          value = parentCoords.width + delta + resizerCoords.width
          $(cell).css({ width: value + 'px' })
        })
      }
      if (resizeType === 'row') {
        idx = $parent.data.rowCount
        value = parentCoords.height + delta + resizerCoords.height
        $parent.css({ height: value + 'px' })
      }

      resolve({ data: { [idx]: value }, resizeType })
      $resizer.css({ [resizeProp]: 0 })
      $resizer.$el.classList.remove('active')
    }
  })
}
