# @bruitt/reducer

```
import createReducer from '@bruitt/reducer'

let initialState = {
  data: null,
  loading: false,
  error: {
    code: 0,
    message: '',
    value: false
  }
}

let putData = R.assoc('data')
let putLoading = R.assoc('loading')
let putError = R.assoc('error')

export default createReducer({
  takeData: null,
  takeEffect: {
    nil: doStuff,
    start: ...,
    success: ...,
    failure: ...,
    finish: ...
  },
  putData,
  putLoading,
  putError
}, 'ns/domain', initialState)
```
