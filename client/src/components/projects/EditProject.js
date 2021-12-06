import React, { useState, useEffect } from 'react';
import useProjectsContext from '../../context/projects/ProjectsContext';
import Loading from '../Loading';
import useAlertContext from '../../context/alert/AlertContext';
import Alert from '../Alert';
import { useParams } from 'react-router-dom';

const EditProject = () => {
  const { updateProject, loading, alert, clearAlerts, currentProject } = useProjectsContext();
  const { setAlert } = useAlertContext();
  const { id } = useParams();
  const [project, setProject] = useState({
    name: currentProject.name,
    description: currentProject.description
  })

  useEffect(() => {
    if (alert) {
      setAlert(alert);
      clearAlerts();
    }

    // eslint-disable-next-line
  }, [alert])

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProject(id, project)
  }

  const handleOnChange = (e) => {
    setProject({ ...project, [e.target.id]: e.target.value })
  }

  if (loading) {
    return <div className="flex h-screen justify-center items-center">
      <Loading />
    </div>
  }

  return (
    <div className="mt-10">
      <form onSubmit={(e) => { handleSubmit(e) }}>
        <Alert />
        <div>
          <label htmlFor="name" className="form_label">Project name</label>
          <input type="text"
            id="name"
            className="form_input"
            value={project.name}
            onChange={(e) => { handleOnChange(e) }}
          />
        </div>
        <div className="mt-5">
          <label htmlFor="description" className="form_label">Project Description</label>
          <input type="text"
            id="description"
            className="form_input"
            value={project.description}
            onChange={(e) => { handleOnChange(e) }}
          />
        </div>
        <input type="submit" className="m-10 py-2 px-5 bg-secondary-500 text-white hover:opacity-75" value="Submit changes" />
      </form>
    </div>
  )
}

export default EditProject
