import { useContext, useReducer, createContext } from "react";
import reducer from './projectsReducer';
import axios from "axios";
import useAuthContext from "../auth/AuthContext";
import {
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAIL,
  GET_PROJECT_FAIL,
  GET_PROJECT_SUCCESS,
  SET_LOADING,
  SET_ERROR
} from '../types'

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const initialState = {
    projects: null,
    currentProject: null,
    loading: true,
    error: null
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  // GET all project
  const getProjects = async () => {
    setLoading(true);
    try {
      const res = await axios.get('/projects');
      dispatch({ type: GET_PROJECTS_SUCCESS, payload: res.data.data })
    } catch (error) {
      console.error(error)
    }
  }

  // GET single project
  const getProject = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`/projects/${id}`);
      dispatch({ type: GET_PROJECT_SUCCESS, payload: res.data.data })
    } catch (error) {
      dispatch({ type: GET_PROJECT_FAIL })
    }
  }

  // Set loading
  const setLoading = (bool) => {
    dispatch({ type: SET_LOADING, payload: bool })
  }



  return <ProjectsContext.Provider value={{
    ...state,
    getProjects,
    getProject,
  }}>
    {children}
  </ProjectsContext.Provider>

}


const useProjectsContext = () => {
  return useContext(ProjectsContext);
}

export { ProjectsProvider, ProjectsContext }
export default useProjectsContext
