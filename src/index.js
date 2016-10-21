import R from 'ramda'

let camelToConst = R.pipe(
  R.replace(/([A-Z])/g, '_$1'),
  R.toUpper
)

let prefixType = (prefix, type) => `${prefix}/${camelToConst(type)}`

let getPrefixedTypes = (prefix, handlers) => {
  let types = R.keys(handlers)
  return R.reduce(
    (obj, type) => {
      let prefixedType = prefixType(prefix, type)
      return R.assoc(prefixedType, {
        originalType: type,
        prefixedType
      }, obj)
    },
    {},
    types
  )
}

let getActionCreator = type => payload => ({ type, payload })
let createActions = R.pipe(
  R.values,
  R.reduce(
    (obj, { originalType, prefixedType }) =>
      R.assoc(originalType, getActionCreator(prefixedType), obj),
    {}
  )
)

let createReducer = (handlers, prefix, initialState = {}) => {
  let prefixedTypes = getPrefixedTypes(prefix, handlers)
  let actions = createActions(prefixedTypes)

  let reducer = (state = initialState, dispatchedAction) => {
    let { originalType } = prefixedTypes[dispatchedAction.type] || {}
    let handler = handlers[originalType]

    if (handler) {
      return handler(dispatchedAction.payload)(state)
    }

    return state
  }

  return Object.assign(reducer, actions)
}
