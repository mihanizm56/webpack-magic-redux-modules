# @mihanizm56/webpack-magic-redux-actions

## Webpack loader to magically incapsulate your actions

### Redux actions must be written in the example below

### Example of usage

```javascript
// actions.js (or actions.ts) in dir /some-module/actions.js
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
// webpack.config.js
const ActionsLoaderConfig = require('@mihanizm56/webpack-magic-redux-actions/lib/loader-config');

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

