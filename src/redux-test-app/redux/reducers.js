'use strict'
/* eslint-disable no-undef,no-unused-vars */
// Constants [FETCH_BOOKS_REQUEST, FETCH_BOOKS_SUCCESS, ...] come from actionTypes.js file

/**
 * bookNewProps
 * @param  {ReduxActionObject} action
 * @return {Object}        new props to merge. ex. : { isRead: true }
 */
const bookNewProps = action => {
  return {
    FETCH_BOOKS_REQUEST: { isRead: true },
    FETCH_BOOKS_SUCCESS: {
        books: action.books,
        isRead: action.isRead,
        errorMsg: '',
    },
    FETCH_BOOKS_FAILURE: {
        isRead: false,
        errorMsg: action.errorMsg + '',
    },
  }[action.type]
}


/**
 * Redux Reducer
 * @param  {ReduxState} Old State
 * @param  {ReduxAction}
 * @return {ReduxState} New state
 */
var reducers = (state, action) => {
  state = state || initialState
  const setInImmutable = (state, prop) => Object.assign({}, state, prop)

  let newProps = (
    bookNewProps(action)
  )


  if (newProps) {
    return setInImmutable(state, newProps)
  } else {
    // Others reducers
    return state
  }
}
