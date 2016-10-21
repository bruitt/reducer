import test from 'tape'
import createReducer, * as utils from '../src/index'

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
