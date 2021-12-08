import { useContext, useReducer, createContext } from "react";
import reducer from './projectsReducer';
import axios from "axios";
import {
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_FAIL,
  GET_PROJECT_FAIL,
  GET_PROJECT_SUCCESS,
  GET_MY_PROJECTS_FAIL,
  GET_MY_PROJECTS_SUCCESS,
  CREATE_PROJECT_SUCCESS,
  CREATE_PROJECT_FAIL,
  UPDATE_PROJECT_SUCCESS,
  UPDATE_PROJECT_FAIL,
  CLEAR_ALERTS,
  SET_LOADING,
  RESET_STATE,
} from '../types'

const ProjectsContext = createContext();

const ProjectsProvider = ({ children }) => {
  const initialState = {
    projects: null,
    myProjects: null,
    currentProject: null,
    loading: false,
    alert: null
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

  // GET all projects of specific user
  const getMyProjects = async (userId) => {
    setLoading(true);
    try {
      const res = await axios.get(`/projects?user=${userId}`);
      dispatch({ type: GET_MY_PROJECTS_SUCCESS, payload: res.data.data })
    } catch (error) {
      console.error(error)
    }
  }

  // Create project
  const createProject = async (project) => {
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }
    try {
      const res = await axios.post('/projects', project, config);
      dispatch({ type: CREATE_PROJECT_SUCCESS })
      getProjects();
    } catch (error) {
      dispatch({ type: CREATE_PROJECT_FAIL, payload: error.response.data.error })
    }
  }

  // GET single project
  const getProject = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`/projects/${id}`);
      dispatch({ type: GET_PROJECT_SUCCESS, payload: res.data.data })
    } catch (error) {
      console.log(error.response)
      dispatch({ type: GET_PROJECT_FAIL })
    }
  }

  // Delete project
  const deleteProject = async (id) => {
    try {
      await axios.delete(`/projects/${id}`)
    } catch (error) {
      console.error(error)
    }
  }

  // Update project
  const updateProject = async (id, data) => {
    setLoading(true)
    const config = {
      headers: {
        "Content-type": "application/json"
      }
    }
    try {
      const res = await axios.put(`/projects/${id}`, data, config);
      dispatch({ type: UPDATE_PROJECT_SUCCESS })
      getProject(id);
    } catch (error) {
      dispatch({ type: UPDATE_PROJECT_FAIL, payload: error.response.data.error })
    }
  }

  // Set loading
  const setLoading = (bool) => {
    dispatch({ type: SET_LOADING, payload: bool })
  }

  // Clear alerts
  const clearAlerts = () => {
    dispatch({ type: CLEAR_ALERTS })
  }

  // Reset state on logout
  const resetState = () => {
    dispatch({ type: RESET_STATE })
  }


  return <ProjectsContext.Provider value={{
    ...state,
    getProjects,
    getProject,
    getMyProjects,
    resetState,
    createProject,
    clearAlerts,
    deleteProject,
    updateProject
  }}>
    {children}
  </ProjectsContext.Provider>

}


const useProjectsContext = () => {
  return useContext(ProjectsContext);
}

export { ProjectsProvider, ProjectsContext }
export default useProjectsContext
