import { defaultStyles, defaultTitle } from '../constans'

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
// Возвращем стейт или defaultState
export const normalizeInitialState = (state) => {
  return state || defaultState
}
