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
  openDate: Date.now().toString(),
}

export const getInitialStateFromLocalstorage = (param) => {
  return storage(`excel:${param}`) || defaultState
}
