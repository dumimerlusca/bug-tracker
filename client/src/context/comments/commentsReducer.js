import {
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
  CLEAR_ALERTS,
  SET_LOADING
} from '../types'

const reducer = (state, action) => {
  switch (action.type) {
    case GET_COMMENTS_SUCCESS: {
      return {
        ...state,
        comments: action.payload,
        loading: false,
      }
    }
    case GET_COMMENTS_FAIL: {
      return {
        ...state,
        comments: null,
        loading: false
      }
    }

    case ADD_COMMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        alert: { message: 'Comment added!', type: 'success' }
      }
    }
    case ADD_COMMENT_FAIL: {
      return {
        ...state,
        loading: false,
        alert: { message: action.payload, type: 'danger' }
      }
    }

    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }

    case CLEAR_ALERTS: {
      return {
        ...state,
        alert: null
      }
    }

    default: {
      return {
        ...state
      }
    }
  }
}

export default reducer
