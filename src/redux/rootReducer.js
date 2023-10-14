import {
  APPLY_STYLE,
  CHANGE_STYLES,
  CHANGE_TITLE,
  CHANGE_TEXT,
  TABLE_RESIZE,
} from './types'

export function rootReducer(state, action) {
  let key
  let newDataState
  let newResizeValue
  let styleData

  switch (action.type) {
    case TABLE_RESIZE:
      key = `${action.payload.resizeType}Size`
      newResizeValue = { ...state[key], ...action.payload.data }

      return { ...state, [key]: newResizeValue }

    case CHANGE_TEXT:
      newDataState = {
        ...state.dataState,
        [action.payload.id]: action.payload.currentText,
      }
      return {
        ...state,
        currentText: action.payload.currentText,
        dataState: newDataState,
      }

    case CHANGE_STYLES:
      return {
        ...state,
        currentStyles: { ...state.currentStyles, ...action.payload },
      }

    case APPLY_STYLE:
      styleData = action.payload.ids.reduce((acc, id) => {
        acc[id] = { ...acc[id], ...action.payload.value }
        return acc
      }, {})

      return {
        ...state,
        stylesState: { ...state.stylesState, ...styleData },
        currentStyles: { ...state.currentStyles, ...action.payload.value },
      }

    case CHANGE_TITLE:
      return { ...state, title: action.payload }

    default:
      return state
  }
}
