import { useContext, useReducer, createContext } from "react";
import reducer from './commentsReducer';
import axios from "axios";
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

const CommentsContext = createContext();

const CommentsProvider = ({ children }) => {
  const initialState = {
    comments: [],
    alert: null,
    loading: false
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  // Get all comments of specific ticket
  const getComments = async (ticketId) => {
    setLoading(true)
    try {
      const res = await axios.get(`/tickets/${ticketId}/comments`);
      dispatch({ type: GET_COMMENTS_SUCCESS, payload: res.data.data })
    } catch (error) {
      dispatch({ type: GET_COMMENTS_FAIL, payload: error.response.data.error })
    }
  }

  // Add comment
  const addComment = async (ticketId, comment) => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    try {
      await axios.post(`/tickets/${ticketId}/comments`, comment, config);
      dispatch({ type: ADD_COMMENT_SUCCESS })
    } catch (error) {
      dispatch({ type: ADD_COMMENT_FAIL, payload: error.response.data.error })
    }
  }

  // Delete comment
  const deleteComment = async (id) => {
    try {
      await axios.delete(`/comments/${id}`)
      dispatch({ type: DELETE_COMMENT_SUCCESS })
    } catch (error) {
      dispatch({ type: DELETE_COMMENT_FAIL, payload: error.response.data.error })
    }
  }

  // Update comment
  const updateComment = async (id, data) => {
    const config = {
      headers: {
        'Content-type': 'application/json'
      }
    }
    try {
      await axios.put(`/comments/${id}`, data, config)
      dispatch({ type: UPDATE_COMMENT_SUCCESS })
    } catch (error) {
      dispatch({ type: UPDATE_COMMENT_FAIL })
    }
  }

  // Clear alerts
  const clearAlerts = () => {
    dispatch({ type: CLEAR_ALERTS })
  }

  // Set loading
  const setLoading = (bool) => {
    dispatch({ type: SET_LOADING, payload: bool })
  }

  // Reset state
  const resetState = () => {
    dispatch({ type: RESET_STATE })
  }



  return <CommentsContext.Provider value={{
    ...state,
    getComments,
    addComment,
    deleteComment,
    updateComment,
    clearAlerts,
    resetState
  }}>
    {children}
  </CommentsContext.Provider>

}


const useCommentsContext = () => {
  return useContext(CommentsContext);
}

export { CommentsProvider, CommentsContext }
export default useCommentsContext
