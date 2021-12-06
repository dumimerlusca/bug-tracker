import React, { useEffect, useState } from 'react';
import useUsersContext from '../../context/users/UsersContext';
import useProjectsContext from '../../context/projects/ProjectsContext';
import Loading from '../Loading';
import useAlertContext from '../../context/alert/AlertContext';
import useAuthContext from '../../context/auth/AuthContext';
import Alert from '../Alert';

const CreateProjectForm = () => {
  const { users } = useUsersContext();
  const { user } = useAuthContext();
  const {
    createProject,
    getProjects,
    getMyProjects,
    loading,
    alert,
    clearAlerts } = useProjectsContext();
  const { setAlert } = useAlertContext();

  const [project, setProject] = useState({
    name: '',
    description: '',
    users: []
  });

  useEffect(() => {
    if (alert) {
      setAlert(alert)
      clearAlerts();
    }

    // eslint-disable-next-line
  }, [alert])

  const handleOnChange = (e) => {
    setProject({ ...project, [e.target.id]: e.target.value })
  }

  const addUserToProject = (user) => {
    if (project.users.find(item => item._id === user._id)) {
      setAlert({ message: 'User already exists!', type: 'danger' });
      return
    }
    const newArr = [...project.users];
    newArr.push(user)
    setProject({ ...project, users: newArr })
  }

  const removeUserFromProject = (id) => {
    setProject({ ...project, users: project.users.filter(user => user._id !== id) })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!project.name.trim() || !project.description.trim()) {
      setAlert({ message: 'Please enter name and description', type: 'danger' });
      return
    }
    await createProject({ ...project, users: project.users.map(user => user._id) });
    getProjects()
    getMyProjects(user._id)
  }

  if (loading) {
    return <div className="w-full h-screen flex items-center justify-center">
      <Loading />
    </div>
  }

  return (
    <div className="mt-10">
      <h1 className="text-2xl p-5 font-thin">Create new project</h1>
      <Alert />
      <form className="py-10"
        onSubmit={(e) => { handleSubmit(e) }}>
        <div>
          <label htmlFor="name" className="form_label">Name</label>
          <input className="form_input"
            id="name"
            type="text"
            value={project.name}
            onChange={(e) => { handleOnChange(e) }}
          />
        </div>
        <div>
          <label htmlFor="description" className="form_label">Description</label>
          <input className="form_input"
            id="description"
            type="text"
            value={project.description}
            onChange={(e) => { handleOnChange(e) }}
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold m-5">Asign users</h2>
          <div className="flex md:flex-row flex-col shadow-sm gap-10">
            <div className="flex-1">
              <h3 className="text-md font-thin">All users</h3>
              <div className="overflow-x-auto w-full shadow-2xl">
                <table className="w-full text-left mt-5 shadow-md">
                  <thead className="table table-fixed">
                    <tr className="w-full table table-fixed bg-primary-500 text-white font-thin border-b-2 border-gray-800 border-opacity-50">
                      <th>Name</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody className="block overflow-auto table-fixed"
                    style={{ maxHeight: '300px' }}>
                    {users && users.map(user => {
                      const { name, _id, role } = user;
                      return (
                        <tr className="w-full table table-fixed border-b border-gray-400 border-opacity-50 cursor-pointer"
                          key={_id}
                          onClick={() => { addUserToProject(user) }}
                        >
                          <td>{name}</td>
                          <td className="ml-10 font-semibold">{role}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex-1">
              <h3 className="text-md font-thin">Users in project</h3>
              <div className="overflow-x-auto w-full shadow-2xl">
                <table className="w-full text-left mt-5 shadow-md">
                  <thead className="table table-fixed">
                    <tr className="w-full table table-fixed bg-secondary-500 text-white font-thin border-b-2 border-gray-800 border-opacity-50">
                      <th>Name</th>
                      <th>Role</th>
                    </tr>
                  </thead>
                  <tbody className="block overflow-auto table-fixed"
                    style={{ maxHeight: '300px' }}>
                    {project.users && project.users.map(user => {
                      const { name, _id, role } = user;
                      return (
                        <tr className="w-full table table-fixed border-b border-gray-400 border-opacity-50 cursor-pointer"
                          key={_id}
                          onClick={() => { removeUserFromProject(_id) }}
                        >
                          <td>{name}</td>
                          <td className="ml-10 font-semibold">{role}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <input className="py-2 px-10 bg-secondary-400 mt-5 mx-auto block text-white" type="submit" value="Submit" />
      </form>
    </div>
  )
}

export default CreateProjectForm
