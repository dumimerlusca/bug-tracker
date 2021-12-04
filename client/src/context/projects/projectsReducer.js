import {
  GET_PROJECTS_FAIL,
  GET_PROJECTS_SUCCESS,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAIL,
  SET_LOADING,
  SET_ERROR,
  GET_MY_PROJECTS_SUCCESS,
  GET_MY_PROJECTS_FAIL,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAIL,
  RESET_STATE,
  CLEAR_ALERTS,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAIL
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
    case GET_MY_PROJECTS_SUCCESS: {
      return {
        ...state,
        myProjects: action.payload,
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

    case CREATE_PROJECT_FAIL: {
      return {
        ...state,
        alert: { message: action.payload, type: 'danger' },
        loading: false
      }
    }

    case CREATE_PROJECT_SUCCESS: {
      return {
        ...state,
        alert: { message: 'Project created', type: 'success' },
        loading: false
      }
    }

    case UPDATE_PROJECT_SUCCESS: {
      return {
        ...state,
        alert: { message: 'Project updated!', type: 'success' },
        loading: false
      }
    }

    case UPDATE_PROJECT_FAIL: {
      return {
        ...state,
        alert: { message: action.payload, type: 'danger' },
        loading: false
      }
    }

    case CLEAR_ALERTS: {
      return {
        ...state,
        alert: null
      }
    }

    case SET_LOADING: {
      return {
        ...state,
        loading: action.payload
      }
    }

    case RESET_STATE: {
      return {
        ...state,
        projects: null,
        myProjects: null,
        currentProject: null,
        loading: true,
        error: null
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
