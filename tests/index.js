import test from 'tape'
import createReducer, * as utils from '../src/index'

let identity = (value) => value

test('transform camel case to standard flux type const', (t) => {
  let { camelToConst } = utils
  let cases = {
    check: 'CHECK',
    checkCamelCase: 'CHECK_CAMEL_CASE',
    CheckCapitalizedString: 'CHECK_CAPITALIZED_STRING'
  }

  Object.keys(cases).forEach((key) => {
    let value = cases[key]
    t.equal(value, camelToConst(key), `${key} -> ${value}`)
  })

  t.end()
})


test('prefix type', (t) => {
  let { prefixType } = utils
  t.equal('@test/TEST_ACTION', prefixType('@test', 'testAction'), 'testAction -> @test/TEST_ACTION')
  t.end()
})


test('transform types to prefixed types', (t) => {
  let { getPrefixedTypes } = utils
  let handlers = {
    addTodo: identity,
    removeTodo: identity
  }

  let result = getPrefixedTypes('@todo', handlers)
  let expectedResult = {
    '@todo/ADD_TODO': {
      originalType: 'addTodo',
      prefixedType: '@todo/ADD_TODO'
    },

    '@todo/REMOVE_TODO': {
      originalType: 'removeTodo',
      prefixedType: '@todo/REMOVE_TODO'
    }
  }

  t.deepEqual(expectedResult, result)
  t.end()
})


test('returns action', (t) => {
  let { getActionCreator } = utils
  let addTodo = getActionCreator('@todo/ADD_TODO')
  let payload = {
    id: 0,
    text: 'test'
  }

  let action = addTodo(payload)
  let expectedAction = {
    type: '@todo/ADD_TODO',
    payload
  }

  t.deepEqual(expectedAction, action)
  t.end()
})


test('generate actions from prefixed types', (t) => {
  let { createActions, getPrefixedTypes } = utils
  let handlers = {
    push: identity,
    pull: identity
  }
  let prefixedTypes = getPrefixedTypes('@todo', handlers)
  let actions = createActions(prefixedTypes)

  let pushAction = actions.push(1)
  let pullAction = actions.pull(1)

  t.deepEqual({
    type: '@todo/PUSH',
    payload: 1
  }, pushAction, 'successful push')

  t.deepEqual({
    type: '@todo/PULL',
    payload: 1
  }, pullAction, 'successful pull')

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
