/* eslint-disable no-undef */
const createStore = window.Redux.createStore
const applyMiddleware = window.Redux.applyMiddleware
const compose = window.Redux.compose
const thunk = window.ReduxThunk.default

// load reducers      from ./redux/reducers.js
// load actions types from ./redux/actionTypes.js
const allReducers = reducers

/**
 *  Setup a Redux store
 */
var initialState = {
  books: [],
  isRead: false
}

/**
 * Curried Error Middleware
 * @param  {ReduxStore}
 * @param  {next}
 * @param  {action}
 */
const errorHandler = (store) => (next) => (action) => {
  try {
    next(action)
  } catch (err) {
    console.warn(err)
    console.warn('store :', store.getState())
    console.warn('action :', action)
  }
}

/**
 * Curried Logger Middleware
 * @param  {ReduxStore}
 * @param  {next}
 * @param  {action}
 */
const logger = (store) => (next) => (action) => {
  console.info('action :', action)
  next(action)
}

/* Create Store */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = applyMiddleware(thunk, errorHandler, logger)
const store = createStore(allReducers, initialState, composeEnhancers(middleware))
const ReduxMixin = PolymerRedux(store)

store.dispatch(fetchBooks())
