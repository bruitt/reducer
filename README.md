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
  putData,
  putLoading,
  putError
}, 'ns/domain', initialState)
```
