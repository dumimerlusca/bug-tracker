import {
  GET_TICKETS_FAIL,
  GET_TICKETS_SUCCESS,
  ADD_TICKET_SUCCESS,
  ADD_TICKET_FAIL,
  CLEAR_ALERTS,
  GET_MY_TICKETS_FAIL,
  GET_MY_TICKETS_SUCCESS,
  GET_TICKET_SUCCESS,
  GET_TICKET_FAIL,
  SET_LOADING,
  UPDATE_TICKET_SUCCESS,
  UPDATE_TICKET_FAIL,
  DELETE_TICKET_FAIL,
  DELETE_TICKET_SUCCESS,
  RESET_STATE
} from '../types'

const reducer = (state, action) => {
  switch (action.type) {
    case GET_TICKETS_SUCCESS: {
      return {
        ...state,
        tickets: action.payload.data,
        currentPage: action.payload.page,
        totalPages: action.payload.totalPages,
        loading: false,
        alert: null
      }
    }
    case GET_TICKETS_FAIL: {
      return {
        ...state,
        tickets: null,
        loading: false,
        currentPage: 1,
        totalPages: null,
        alert: action.payload
      }
    }
    case GET_TICKET_SUCCESS: {
      return {
        ...state,
        currentTicket: action.payload,
        loading: false,
        alert: null
      }
    }
    case GET_TICKET_FAIL: {
      return {
        ...state,
        currentTicket: null,
        loading: false,
        alert: action.payload
      }
    }

    case GET_MY_TICKETS_SUCCESS: {
      return {
        ...state,
        myTickets: action.payload.data,
        myTicketsCurrentPage: action.payload.page,
        myTicketsTotalPages: action.payload.totalPages,
        loading: false,
        alert: null
      }
    }

    case GET_MY_TICKETS_FAIL: {
      return {
        ...state,
        myTickets: null,
        myTicketsCurrentpage: 1,
        myTicketsTotalPages: null,
        loading: false,
        alert: null
      }
    }

    case ADD_TICKET_SUCCESS: {
      return {
        ...state,
        loading: false,
        alert: { message: 'Ticket added!', type: 'success' }
      }
    }

    case ADD_TICKET_FAIL: {
      return {
        ...state,
        loading: false,
        alert: { message: action.payload, type: 'danger' }
      }
    }

    case UPDATE_TICKET_SUCCESS: {
      return {
        ...state,
        loading: false,
        alert: { message: 'Ticket updated!', type: 'success' }
      }
    }

    case UPDATE_TICKET_FAIL: {
      return {
        ...state,
        loading: false,
        alert: { message: action.payload, type: 'danger' }
      }
    }

    case DELETE_TICKET_SUCCESS: {
      return {
        ...state,
        loading: false,
        alert: { message: 'Ticket deleted!', type: 'success' }
      }
    }

    case DELETE_TICKET_FAIL: {
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

    case RESET_STATE: {
      return {
        ...state,
        tickets: null,
        loading: false,
        currentTicket: null,
        currentPage: 1,
        totalPages: null,
        myTickets: null,
        myTicketsCurrentPage: 1,
        myTIcketsTotalPages: null,
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
