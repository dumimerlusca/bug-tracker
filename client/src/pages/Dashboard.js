import React, { Fragment, useEffect, useState } from 'react';
import SideMenu from '../components/SideMenu';
import DashboardHeader from '../components/DashboardHeader';
import { Outlet } from 'react-router';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import useUsersContext from '../context/users/UsersContext';
import useProjectsContext from '../context/projects/ProjectsContext';
import useTicketsContext from '../context/tickets/TicketsContext';
import Loading from '../components/Loading';
import useAuthContext from '../context/auth/AuthContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { getUsers } = useUsersContext();
  const { getProjects, getMyProjects } = useProjectsContext();
  const { getTickets, getMyTickets } = useTicketsContext();
  const { user } = useAuthContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [])

  const fetchData = async () => {
    await getUsers();
    await getProjects();
    await getTickets();
    await getMyTickets(user._id);
    await getMyProjects(user._id);
    setLoading(false)
  }

  if (loading) {
    return <div className="flex items-center justify-center w-full h-screen">
      <Loading />
    </div>
  }
  return (
    <Fragment>
      <SideMenu />
      <div className="main_container">
        <DashboardHeader />
        <div className='flex gap-2 m-2'>
          <button onClick={() => { navigate(-1) }}>
            <BsFillArrowLeftCircleFill className="text-2xl hover:opacity-75" />
          </button>
          <button onClick={() => { navigate(1) }}>
            <BsFillArrowRightCircleFill className="text-2xl hover:opacity-75" />
          </button>
        </div>
        <div className="container">
          <Outlet />
        </div>
      </div>
    </Fragment>
  )
}

export default Dashboard
