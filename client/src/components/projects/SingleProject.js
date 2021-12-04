import React, { useEffect } from 'react';
import useProjectsContext from '../../context/projects/ProjectsContext';
import useAuthContext from '../../context/auth/AuthContext';
import { useParams } from 'react-router-dom';
import Loading from '../Loading';
import { useNavigate, Link, Routes, Route } from 'react-router-dom';
import ProjectDetails from './ProjectDetails';
import ManageUsersInProject from './ManageUsersInProject';
import EditProject from './EditProject';
import AdminAndProjectManagerOnly from '../routing/AdminAndProjectManagerOnly'
import AddTicketForm from '../tickets/AddTicketForm';
import useTicketsContext from '../../context/tickets/TicketsContext';


const SingleProject = () => {
  const {
    getProject,
    loading,
    currentProject,
    deleteProject,
    getProjects
  } = useProjectsContext();
  const { getTickets } = useTicketsContext();
  const { user } = useAuthContext();
  const { id } = useParams();


  const navigate = useNavigate();

  useEffect(() => {
    if (!currentProject) {
      getProject(id)
    }
  }, [])

  const handleDeleteProject = async () => {
    if (window.confirm('Are you sure?')) {
      await deleteProject(id);
      getProjects();
      getTickets();
      navigate('/dashboard/projects');
    }
  }

  const handleEditProject = () => {
    console.log('Edit project')
    navigate(`/dashboard/projects/${id}/edit`)
  }

  if (!currentProject && loading) {
    return <div className="w-full h-screen flex justify-center items-center">
      <Loading />
    </div>
  }

  if (!currentProject && !loading) {
    return <p>Project not found</p>
  }

  const {
    name,
    createdAt,
    createdBy,
    description,
    _id
  } = currentProject;

  return (
    <div className="mt-10">
      <div className="flex p-5 shadow-md">
        <div className="flex-1">
          <h3 className="text-xl font-semibold">Project Name</h3>
          <p className="font-thin text-lg">{name}</p>
          <Link to={`/dashboard/projects/${_id}`}
            className="underline">
            Details</Link>
        </div>

        <div className="flex-1">
          <h3 className="text-xl font-semibold">Project Description</h3>
          <p className="font-thin text-lg">{description}</p>
        </div>
      </div>

      <div className="flex gap-3 mt-2">
        <button className="py-2 px-7 bg-green-200"
          onClick={handleEditProject}
        >Edit</button>
        {user.role === 'admin' && (
          <button className="py-2 px-7 bg-red-200"
            onClick={handleDeleteProject}
          >Delete</button>
        )}
        <Link to={`/dashboard/projects/${_id}/manageUsers`} className="py-2 px-7 bg-red-200"
        >Manage users</Link>
        <Link to={`/dashboard/projects/${_id}/addTicket`} className="py-2 inline-block px-4 bg-blue-200 hover:opacity-75">Add new ticket</Link>
      </div>


      <Routes>
        <Route path="/" element={<ProjectDetails />} />
        <Route path="/manageUsers" element={
          <AdminAndProjectManagerOnly>
            <ManageUsersInProject />
          </AdminAndProjectManagerOnly>} />
        <Route path="/edit" element={
          <AdminAndProjectManagerOnly>
            <EditProject />
          </AdminAndProjectManagerOnly>} />
        <Route path="/addTicket" element={<AddTicketForm />} />
      </Routes>
    </div>
  )
}

export default SingleProject
