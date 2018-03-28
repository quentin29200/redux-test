'use strict'
/* eslint-disable no-undef,no-unused-vars,no-eval */

/**
 * Public thunk action creator :
 *  - fetch books array
 * @return {ThunkActionCreator}
 */
var fetchBooks = () => {
  console.log("yolo")
  
  return async (dispatch, getState) => {
    try {
      dispatch({ type: FETCH_BOOKS_REQUEST })
      const books = await (await fetch(`${config.back.books}`)).json()

      dispatch({
        type: FETCH_BOOKS_SUCCESS,
        books: books,
        isRead: true,
      })
    } catch (e) {
      _logError(e, FETCH_BOOKS_FAILURE, getState())
      dispatch({
        type: FETCH_BOOKS_FAILURE,
        errorMsg: e,
      })
    }
  }
}

/**
 * LogError
 * @param       {Error} err
 * @param       {String} action Type
 * @param       {ReduxState} state
 * @return      void
 */
const _logError = (err, actionType, state) => {
  console.warn(err)
  console.warn('action :', actionType)
  console.warn('state :', state)
}
