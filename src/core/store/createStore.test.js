import { createStore } from './createStore'

const initialState = {
  count: 0,
}

const reducer = (state = initialState, action) => {
  if (action.type === 'ADD') {
    return { ...state, count: state.count + 1 }
  }
  return state
}

// Объединяем тесты в группые
describe('createStore:', () => {
  let store
  let handler
  let unsub

  beforeEach(() => {
    // Вызывается перед каждым запуском теста
    store = createStore(reducer, initialState)
    handler = jest.fn()
  })

  // Описываем тест. Функция test Принимает 2 параметра - описание и callback
  test('should return store object', () => {
    expect(store).toBeDefined()
    expect(store.subscribe).toBeDefined()
    expect(store.dispatch).toBeDefined()
    expect(store.getState).not.toBeUndefined()
  })

  // Описываем тест. Функция test Принимает 2 параметра - описание и callback
  test('should return object as a state', () => {
    expect(store.getState()).toBeInstanceOf(Object)
  })

  test('should return default state', () => {
    expect(store.getState()).toEqual(initialState)
  })

  test('should change state if action exist', () => {
    store.dispatch({ type: 'ADD' })
    expect(store.getState().count).toBe(1)
  })

  test("should NOT change state if action don't unexist", () => {
    store.dispatch({ type: 'NOT_EXISTING_ACTION' })
    expect(store.getState().count).toBe(0)
  })

  test('should call subscriber function', () => {
    store.subscribe(handler)
    store.dispatch({ type: 'ADD' })

    expect(handler.mock.calls.length).toBe(1)
    expect(handler).toHaveBeenCalled()
    expect(handler).toHaveBeenCalledWith(store.getState())
  })

  test('should NOT call sub if unsubscribe', () => {
    const sub = store.subscribe(handler)
    sub.unsubscribe()
    store.dispatch({ type: 'ADD' })

    expect(handler).not.toHaveBeenCalled()
    expect(handler).not.toHaveBeenCalledWith(store.getState())
  })

  test('should dispatch in async way', () => {
    new Promise((resolve) => {
      setTimeout(() => {
        store.dispatch({ type: 'ADD' })
        resolve()
      }, 500)
    }).then(() => {
      setTimeout(() => {
        expect(store.getState().count).toBe(1)
      }, 500)
    })
  })
})
