import { useContext, useReducer, createContext } from "react";
import reducer from './ticketsReducer';
import axios from "axios";
import {
  GET_TICKETS_SUCCESS,
  GET_TICKETS_FAIL,
  GET_MY_TICKETS_SUCCESS,
  GET_MY_TICKETS_FAIL,
  ADD_TICKET_SUCCESS,
  ADD_TICKET_FAIL,
  CLEAR_ALERTS,
  SET_LOADING,
  GET_TICKET_SUCCESS,
  GET_TICKET_FAIL,
  UPDATE_TICKET_SUCCESS,
  UPDATE_TICKET_FAIL,
  DELETE_TICKET_SUCCESS,
  DELETE_TICKET_FAIL
} from '../types'

const TicketsContext = createContext();

const TicketsProvider = ({ children }) => {
  const initialState = {
    tickets: null,
    loading: false,
    currentTicket: null,
    myTickets: null,
    alert: null
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  // Get all tickets
  const getTickets = async () => {
    setLoading(true)
    try {
      const res = await axios.get('/tickets')
      dispatch({ type: GET_TICKETS_SUCCESS, payload: res.data.data })
    } catch (error) {
      dispatch({ type: GET_TICKETS_FAIL, payload: error.response.data.error })
    }
  }

  // Get my tickets
  const getMyTickets = async (userId) => {
    setLoading(true)
    try {
      const res = await axios.get(`/tickets?user=${userId}`)
      dispatch({ type: GET_MY_TICKETS_SUCCESS, payload: res.data.data })
    } catch (error) {
      dispatch({ type: GET_MY_TICKETS_FAIL })
    }
  }

  // Get single ticket
  const getTicket = async (id) => {
    setLoading(true)
    try {
      const res = await axios.get(`/tickets/${id}`)
      dispatch({ type: GET_TICKET_SUCCESS, payload: res.data.data })
    } catch (error) {
      dispatch({ type: GET_TICKET_FAIL, payload: error.response.data.error })
    }
  }

  // Add new ticket
  const addTicket = async (project, ticket) => {
    setLoading(true)
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }
    try {
      const res = await axios.post(`/projects/${project}/tickets`, ticket, config);
      getTickets();
      dispatch({ type: ADD_TICKET_SUCCESS })
    } catch (error) {
      dispatch({ type: ADD_TICKET_FAIL, payload: error.response.data.error })
    }
  }

  // Update ticket
  const updateTicket = async (id, data) => {
    setLoading(true)
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }
    try {
      const res = await axios.put(`/tickets/${id}`, data, config)
      dispatch({ type: UPDATE_TICKET_SUCCESS })
    } catch (error) {
      dispatch({ type: UPDATE_TICKET_FAIL, payload: error.response.data.error })
    }
  }

  // Delete ticket
  const deleteTicket = async (id) => {
    setLoading(true)
    try {
      await axios.delete(`/tickets/${id}`);
      dispatch({ type: DELETE_TICKET_SUCCESS })
    } catch (error) {
      dispatch({ type: DELETE_TICKET_FAIL, payload: error.response.data.error })
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



  return <TicketsContext.Provider value={{
    ...state,
    getTickets,
    addTicket,
    clearAlerts,
    getMyTickets,
    getTicket,
    updateTicket,
    deleteTicket
  }}>
    {children}
  </TicketsContext.Provider>

}


const useTicketsContext = () => {
  return useContext(TicketsContext);
}

export { TicketsProvider, TicketsContext }
export default useTicketsContext
