import React, { Fragment } from 'react';
import SideMenu from '../components/SideMenu';
import DashboardHeader from '../components/DashboardHeader';
import { Outlet } from 'react-router';
import { useNavigate, Routes, Route } from 'react-router-dom';
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from 'react-icons/bs';
import DashboardHome from '../components/DashboardHome';

const Dashboard = () => {
  const navigate = useNavigate();
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
          <Routes>
            <Route path="/" element={<DashboardHome />} />
          </Routes>
          <Outlet />
        </div>
      </div>
    </Fragment>
  )
}

export default Dashboard
