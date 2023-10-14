import { defaultStyles } from '../../constans'
import { ExcelStateComponent } from '../../core/ExcelStateComponent'
import { $ } from '../../core/dom'

import { createToolbar } from './toolbar.template'

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'], // слушатели событий
      subscribe: ['currentStyles'], // продписки на изменения конкретных полей в глобальном стейте
      ...options,
    })
  }

  // Подготавливаем компонент перед рендером
  prepare() {
    // инициализируем начальное состояние локального стейта
    this.initState(defaultStyles)
  }

  // Возвращает вёрстку компонента
  get template() {
    // Создает вёрстку на основе данных из локального стейта
    return createToolbar(this.state)
  }

  // Получаем новые данные из глобального стейта. Только те, на которые подписан компонент -  хранятся в массиве subscribe
  storeChanged({ currentStyles }) {
    // Записываем новые данные из глобального стейта в локальный стейт
    this.setState(currentStyles)
  }

  // Рендерит вёрстку
  toHTML() {
    return this.template
  }

  onClick(event) {
    // Получаем кнопку
    const target = $(event.target).closest('[data-type="button"]')
    if (target) {
      // Получаем data атрибут из нажатой кнопки
      const value = JSON.parse(target.data.value)

      // Запускаем событие toolbar:applyStyle после выбора стиля
      this.$emit('toolbar:applyStyle', value)
    }
  }
}
