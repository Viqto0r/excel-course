import {
  APPLY_STYLE,
  CHANGE_STYLES,
  CHANGE_TITLE,
  CHANGE_TEXT,
  TABLE_RESIZE,
} from './types'

export const resizeTable = (payload) => ({ type: TABLE_RESIZE, payload })
export const changeText = (payload) => ({ type: CHANGE_TEXT, payload })
export const changeStyles = (payload) => ({ type: CHANGE_STYLES, payload })
export const applyStyles = (payload) => ({ type: APPLY_STYLE, payload })
export const changeTitle = (payload) => ({
  type: CHANGE_TITLE,
  payload,
})
