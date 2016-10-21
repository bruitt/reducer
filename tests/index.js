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
