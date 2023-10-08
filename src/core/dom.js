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

  append(...nodes) {
    // Проверяем если nodes кастомные то преобразуем в стандартные
    const fixedNodes = nodes.map((node) =>
      node instanceof Dom ? node.$el : node
    )
    this.$el.append(...fixedNodes)
    return this
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
