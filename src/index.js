export let camelToConst = str => str.replace(/(?!^)([A-Z])/g, '_$1').toUpperCase()
export let prefixType = (prefix, type) => `${prefix}/${camelToConst(type)}`

export let getPrefixedTypes = (prefix, handlers) => {
  let types = Object.keys(handlers)
  return types.reduce(
    (obj, type) => {
      let prefixedType = prefixType(prefix, type)
      obj[prefixedType] = {
        originalType: type,
        prefixedType
      }
      return obj
    },
    {}
  )
}

export let getActionCreator = type => payload => ({ type, payload })
export let createActions = typesList => {
  let types = Object.keys(typesList).map(key => typesList[key])
  return types.reduce(
    (obj, { originalType, prefixedType }) => {
      obj[originalType] = getActionCreator(prefixedType)
      return obj
    },
    {}
  )
}

export let createReducer = (handlers, prefix, initialState = {}) => {
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

export default createReducer
