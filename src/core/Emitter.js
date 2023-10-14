export class Emitter {
  constructor() {
    this.listeners = []
  }

  // Вызываем событие с данными
  // Аналогичные названия dipatch, trigger
  emit(event, ...data) {
    // Если нет подписки на событие event прерываем работу функции
    if (!Array.isArray(this.listeners[event])) return false

    // Ищем событие по ключу event в объекте с событиями
    // и вызываем все функции для этого события с data
    this.listeners[event].forEach((listener) => {
      listener(...data)
    })

    return true
  }

  // Подписываемся на событие.
  // Добавляем в объект listeners функцию-callback по ключу event
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    // Если нет ключа event создаем пустой массив,
    // иначе возвращаем уже созданный массив
    this.listeners[event].push(fn)

    // Возвращаем функцию для отписки от события
    // Удаляем callback из массива callbacks для события event
    return () => {
      this.listeners[event] = this.listeners[event].filter(
        (listener) => listener !== fn
      )
    }
  }
}
