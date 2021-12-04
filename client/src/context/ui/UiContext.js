import { createContext, useReducer, useContext } from "react";
import reducer from './UiReducer';
import {
  SHOW_SIDE_MENU,
  HIDE_SIDE_MENU
} from '../types'


const UiContext = createContext();

const UiProvider = ({ children }) => {
  const initialState = {
    isSideMenuVisible: true
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const showSideMenu = () => {
    dispatch({ type: SHOW_SIDE_MENU })
  }

  const hideSideMenu = () => {
    dispatch({ type: HIDE_SIDE_MENU })
  }

  return <UiContext.Provider value={{
    ...state,
    showSideMenu,
    hideSideMenu
  }}>
    {children}
  </UiContext.Provider>
}

const useUiContext = () => {
  return useContext(UiContext);
}

export { UiProvider }

export default useUiContext