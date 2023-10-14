export const parse = (text = '') => {
  try {
    if (text.startsWith('=')) {
      return eval(text.slice(1))
    }
    return text
  } catch (e) {
    return text
  }
}
