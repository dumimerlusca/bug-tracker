import { useContext, useReducer, createContext } from "react";
import reducer from './commentsReducer';
import axios from "axios";
import {
  GET_COMMENTS_SUCCESS,
  GET_COMMENTS_FAIL,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAIL,
  CLEAR_ALERTS,
  SET_LOADING
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

  // Clear alerts
  const clearAlerts = () => {
    dispatch({ type: CLEAR_ALERTS })
  }

  // Set loading
  const setLoading = (bool) => {
    dispatch({ type: SET_LOADING, payload: bool })
  }



  return <CommentsContext.Provider value={{
    ...state,
    getComments,
    addComment,
    clearAlerts
  }}>
    {children}
  </CommentsContext.Provider>

}


const useCommentsContext = () => {
  return useContext(CommentsContext);
}

export { CommentsProvider, CommentsContext }
export default useCommentsContext
