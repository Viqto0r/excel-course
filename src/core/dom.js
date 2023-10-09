class Dom {
  constructor(selector) {
    this.$el =
      typeof selector === 'string' ? document.querySelector(selector) : selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  clear() {
    this.html('')
  }

  on(event, callback) {
    this.$el.addEventListener(event, callback)
  }

  off(event, callback) {
    this.$el.removeEventListener(event, callback)
  }

  get data() {
    return this.$el.dataset
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  append(...nodes) {
    // Проверяем если nodes кастомные то преобразуем в стандартные
    const fixedNodes = nodes.map((node) =>
      node instanceof Dom ? node.$el : node
    )
    this.$el.append(...fixedNodes)
    return this
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  css(styles = {}) {
    for (const style in styles) {
      if (Object.prototype.hasOwnProperty.call(styles, style)) {
        this.$el.style[style] = styles[style]
      }
    }
  }
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)

  if (classes) {
    el.classList.add(classes)
  }

  return $(el)
}

export function $(selector) {
  return new Dom(selector)
}
