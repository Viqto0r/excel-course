import { storage } from '../core/utils'

const toHTML = (key) => {
  const state = storage(key)
  const timestamp = getTimestamp(key)

  return `<li class="db__record">
            <a href="#excel/${timestamp}">${state.title}</a>
            <strong>${getTimeFromStorageKey(state.openDate)}</strong>
          </li>`
}

// Перебирает все ключи в localstorage.
// Возвращает ключи, которые содержат в названии строку excel
const getAllKeys = () => {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (!key.includes('excel')) {
      continue
    }

    keys.push(key)
  }
  return keys
}

const getTimestamp = (key) => {
  return key.replace('excel:', '')
}

const getTimeFromStorageKey = (timestamp) => {
  const formater = new Intl.DateTimeFormat('ru', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return formater.format(new Date(timestamp))
}

export const createRecordsTable = () => {
  // Получаем все ключи содержащие в названии строку excel
  const keys = getAllKeys()
  if (!keys.length) {
    // Если нет ни одной созданной таблицы
    return 'Вы не создали ни одной таблицы'
  }

  return `<div class="db__list-header">
            <span>Название</span>
            <span>Дата открытия</span>
          </div>
          <ul class="db__list">${keys.map(toHTML).join('')}</ul>`
}
