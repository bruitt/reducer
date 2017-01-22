import test from 'tape'
import createReducer, * as utils from '../src/reducer'

let identity = (value) => value

test('transform names to types', (t) => {
  let { getTypesMap } = utils
  let handlers = {
    addTodo: identity,
    removeTodo: identity
  }

  let result = getTypesMap('@todo', handlers)
  let expectedResult = {
    '@todo/addTodo': {
      name: 'addTodo',
      type: '@todo/addTodo'
    },

    '@todo/removeTodo': {
      name: 'removeTodo',
      type: '@todo/removeTodo'
    }
  }

  t.deepEqual(expectedResult, result)
  t.end()
})


test('returns action', (t) => {
  let { getActionCreator } = utils
  let addTodo = getActionCreator('@todo/addTodo')
  let payload = {
    id: 0,
    text: 'test'
  }

  let action = addTodo(payload)
  let expectedAction = {
    type: '@todo/addTodo',
    meta: undefined,
    payload
  }

  t.deepEqual(expectedAction, action)
  t.end()
})


test('generate actions from types', (t) => {
  let { createActions, getTypesMap } = utils
  let handlers = {
    push: identity,
    pull: identity
  }
  let typesMap = getTypesMap('@todo', handlers)
  let actions = createActions('@todo', handlers)

  let pushAction = actions.push(1)
  let pullAction = actions.pull(1)

  t.deepEqual({
    type: '@todo/push',
    meta: undefined,
    payload: 1
  }, pushAction, 'successful push')

  t.deepEqual({
    type: '@todo/pull',
    meta: undefined,
    payload: 1
  }, pullAction, 'successful pull')

  t.equal('@todo/push', pushAction.type, 'push type is valid')
  t.equal('@todo/pull', pullAction.type, 'pull type is valid')

  t.end()
})


test('create reducer', (t) => {
  let { createReducer } = utils
  let reducer = createReducer({
    add: payload => state => state + payload,
    multiply: payload => state => state * payload
  }, '@calc', 0)

  let state = null
  state = reducer(state, reducer.add(5))
  t.equals(5, state, 'add action -> 5')

  state = reducer(state, reducer.multiply(2))
  t.equals(10, state, 'multiply action -> 10')

  t.end()
})
