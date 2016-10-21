import test from 'tape'
import createReducer, * as utils from '../src/index'

test('transform camel case to standard flux type const', (t) => {
  let { camelToConst } = utils
  let cases = {
    check: 'CHECK',
    checkCamelCase: 'CHECK_CAMEL_CASE'
  }

  Object.keys(cases).forEach((key) => {
    let value = cases[key]
    t.equal(value, camelToConst(key), `${key} -> ${value}`)
  })

  t.end()
})
