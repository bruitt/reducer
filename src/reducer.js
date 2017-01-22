export let getTypesMap = (prefix, handlers) => {
  return Object.keys(handlers).reduce(
    (obj, name) => {
      let type = `${prefix}/${name}`
      obj[type] = { name, type }
      return obj
    },
    {}
  )
}

export let getActionCreator = (type) => (payload, meta) => ({ type, payload, meta })

export let createActions = (prefix, handlers) => {
  return Object.keys(handlers).reduce(
    (obj, name) => {
      let type = `${prefix}/${name}`
      obj[name] = Object.assign(getActionCreator(type), { type })
      return obj
    },
    {}
  )
}

let isFunction = obj => Object.prototype.toString.call(obj) === '[object Function]'
let isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'

export let createReducer = (handlers, prefix, initialState = {}) => {
  let typesMap = getTypesMap(prefix, handlers)

  let reducer = (state = initialState, { type, payload, meta }) => {
    let { name } = typesMap[type] || {}
    let handler = handlers[name]

    if (isFunction(handler)) {
      return handler(payload, meta)(state)
    }

    if (isObject(handler)) {
      let metaKey = meta || 'nil'
      handler = handler[metaKey]

      if (isFunction(handler)) {
        return handler(payload, meta)(state)
      }
    }

    return state
  }

  return Object.assign(reducer, createActions(prefix, handlers))
}

export default createReducer
