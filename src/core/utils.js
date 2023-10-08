// Преобразует первую букву строки в заглавную
export const capitalize = (string) => {
  if (typeof string !== 'string') return ''
  return string[0].toUpperCase() + string.slice(1)
}
