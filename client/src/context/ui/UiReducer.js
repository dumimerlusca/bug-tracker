import {
  SHOW_SIDE_MENU,
  HIDE_SIDE_MENU
} from '../types'

const reducer = (state, action) => {
  switch (action.type) {
    case SHOW_SIDE_MENU: {
      return {
        ...state,
        isSideMenuVisible: true
      }
    }
    case HIDE_SIDE_MENU: {
      return {
        ...state,
        isSideMenuVisible: false
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