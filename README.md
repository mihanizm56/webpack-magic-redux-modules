# @mihanizm56/webpack-magic-redux-modules

## Webpack loader to magically incapsulate your actions with the your module-name (folder name) prefix

### Redux actions, sagas and reducers must be written in the example below (according to the RegExps below)

### Files that are watched by replacers

```javascript
// for actions
const actionsRegExp = /actions\.[jt]s$/;
// for reducers
const reducersRegExp = /reducer\.[jt]s$/;
// for sagas
const sagasRegExp = /saga\.[jt]s$/;
// for constants
const constantsRegExp = /_?constants\.[jt]s$/;
```

### Example of usage

```javascript
// actions.js (or .ts) in dir /some-module/actions.js
export const FETCH_PAYMENTS_ACTION_SAGA = 'FETCH_PAYMENTS_ACTION_SAGA';
// 'FETCH_PAYMENTS_ACTION_SAGA' transforms to 'some-module_FETCH_PAYMENTS_ACTION_SAGA'
export const fetchPaymentsActionSaga = payload => ({
  type: FETCH_PAYMENTS_ACTION_SAGA,
  payload,
});

export const SET_PAYMENTS_LOADING_START = 'SET_PAYMENTS_LOADING_START';
// 'SET_PAYMENTS_LOADING_START' transforms to 'some-module_SET_PAYMENTS_LOADING_START'
export const setPaymentsLoadingStartAction = () => ({
  type: SET_PAYMENTS_LOADING_START,
});
```

```javascript
// reducer.js (or .ts) in dir /some-module/reducer.js
export const REPORT_INFO_REDUCER_NAME = 'REPORT_INFO_REDUCER_NAME';
// 'REPORT_INFO_REDUCER_NAME' transforms to 'some-module_REPORT_INFO_REDUCER_NAME'
```

```javascript
// load-details-list-table-watcher-saga.js (or .ts) in dir /some-module/load-details-list-table-watcher-saga.js.js
export const LOAD_DETAILS_LIST_TABLE_WATCHER_SAGA =
  'LOAD_DETAILS_LIST_TABLE_WATCHER_SAGA';
// 'LOAD_DETAILS_LIST_TABLE_WATCHER_SAGA' transforms to 'some-module_LOAD_DETAILS_LIST_TABLE_WATCHER_SAGA'
```

```javascript
// webpack.config.js
const ActionsLoaderConfig = require('@mihanizm56/@mihanizm56/webpack-magic-redux-modules/lib/loader-config');

module.exports = {
  // your config ...
  module: {
    rules: [
      // your rules ...
      ActionsLoaderConfig()
    ]
  }
};
```

