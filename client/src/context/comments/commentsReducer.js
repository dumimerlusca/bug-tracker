import {
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_FAIL,
  UPDATE_COMMENT_SUCCESS,
  UPDATE_COMMENT_FAIL,
  CLEAR_ALERTS,
  SET_LOADING,
  RESET_STATE
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

    case UPDATE_COMMENT_FAIL:
    case DELETE_COMMENT_FAIL:
    case ADD_COMMENT_FAIL: {
      return {
        ...state,
        loading: false,
        alert: { message: action.payload, type: 'danger' }
      }
    }

    case DELETE_COMMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        alert: { message: 'Comment deleted!', type: 'success' }
      }
    }

    case UPDATE_COMMENT_SUCCESS: {
      return {
        ...state,
        loading: false,
        alert: { message: 'Comment deleted!', type: 'success' }
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

    case RESET_STATE: {
      return {
        ...state,
        comments: [],
        alert: null,
        loading: false
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
