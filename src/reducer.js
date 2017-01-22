export let getTypesMap = (prefix, handlers) => {
  return Object.keys(handlers).reduce(
    (obj, name) => {
      let type = `${prefix}/${type}`
      obj[type] = { name, type }
      return obj
    },
    {}
  )
}

export let getActionCreator = (type) => (payload, meta) => ({ type, payload, meta })

export let createActions = (handlers) => {
  return Object.keys(handlers).reduce(
    (obj, name) => {
      let type = `${prefix}/${name}`
      obj[name] = Object.assign(getActionCreator(type), { type })
      return obj
    },
    {}
  )
}

export let createReducer = (handlers, prefix, initialState = {}) => {
  let typesMap = getTypesMap(prefix, handlers)

  let reducer = (state = initialState, dispatchedAction) => {
    let { name } = typesMap[dispatchedAction.type] || {}
    let handler = handlers[name]
    if (handler) {
      return handler(dispatchedAction.payload, dispatchedAction.meta)(state)
    }

    return state
  }

  return Object.assign(reducer, createActions(handlers))
}

export default createReducer
