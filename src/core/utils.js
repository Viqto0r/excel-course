// Преобразует первую букву строки в заглавную
export const capitalize = (string) => {
  if (typeof string !== 'string') return ''
  return string[0].toUpperCase() + string.slice(1)
}

export const range = (start, end) => {
  start > end && ([start, end] = [end, start])

  return Array(end - start + 1)
    .fill('')
    .map((_, idx) => idx + start)
}

export const storage = (key, data = null) => {
  if (!data) {
    return JSON.parse(localStorage.getItem(key))
  } else {
    localStorage.setItem(key, JSON.stringify(data))
  }
}

export const isEqual = (a, b) => {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}

export const camelToDashCase = (str) => {
  return str.replace(/[A-Z]/g, (letter) => '-' + letter.toLocaleLowerCase())
}

export const toInlineStyles = (styles) => {
  return Object.keys(styles)
    .map((key) => `${camelToDashCase(key)}:${styles[key]}`)
    .join('; ')
}

export const debounce = function (fn, wait) {
  let timeout // id таймера для очистки
  return function (...args) {
    // возвращаем функцию
    const later = () => {
      clearTimeout(timeout) // очищаем предыдущий id

      //eslint-disable-next-line
      fn.apply(this, args) // выполняем функцию
    }

    clearTimeout(timeout) // очищаем id, чтобы сбросить последний вызов функции
    timeout = setTimeout(later, wait)
  }
}
