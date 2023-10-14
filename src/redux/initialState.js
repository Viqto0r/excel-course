import { defaultStyles, defaultTitle } from '../constans'
import { storage } from '../core/utils'

const defaultState = {
  rowSize: {},
  colSize: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  title: defaultTitle,
  currentStyles: defaultStyles,
}

export const initialState = storage('excel-table') || defaultState
