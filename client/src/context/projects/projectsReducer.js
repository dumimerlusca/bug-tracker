import {
  GET_PROJECTS_FAIL,
  GET_PROJECTS_SUCCESS,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAIL,
  SET_LOADING,
  SET_ERROR
} from '../types'

const reducer = (state, action) => {
  switch (action.type) {
    case GET_PROJECTS_SUCCESS: {
      return {
        ...state,
        projects: action.payload,
        loading: false
      }
    }
    case GET_PROJECTS_FAIL: {
      return {
        ...state,
        projects: null,
        loading: false
      }
    }

    case GET_PROJECT_SUCCESS: {
      return {
        ...state,
        currentProject: action.payload,
        loading: false
      }
    }

    case GET_PROJECT_FAIL: {
      return {
        ...state,
        currentProject: null,
        loading: false
      }
    }

    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload
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
