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

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
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

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  findAll(selector) {
    return $(this.$el.querySelectorAll(selector))
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

  id(parse) {
    if (parse) {
      const [row, col] = this.id().split(':').map(Number)
      return {
        row,
        col,
      }
    }
    return this.data.id
  }

  addClass(className) {
    $(this.$el.classList.add(className))
    return this
  }

  removeClass(className) {
    $(this.$el.classList.remove(className))
    return this
  }

  focus() {
    this.$el.focus()
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
