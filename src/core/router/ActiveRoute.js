export class ActiveRoute {
  // получем #hash без #
  static get path() {
    return window.location.hash.slice(1)
  }
  // получаем параметры после hash
  static get param() {
    return this.path.split('/')[1] || ''
  }

  static navigate(path) {
    window.location.hash = path
  }
}
