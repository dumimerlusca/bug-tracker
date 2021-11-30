import React from 'react';
import useAuthContext from '../../context/auth/AuthContext';
import useProjectsContext from '../../context/projects/ProjectsContext';
import AllProjects from './AllProjects';
import CreateProjectForm from './CreateProjectForm';


const MyProjects = () => {

  const { user, loading } = useAuthContext();
  const { showCreateProjectForm, setCreateProjectForm } = useProjectsContext();

  return (
    <div>
      {user.role === 'admin' &&
        <button className="py-2 px-4 bg-blue-200 rounded-md mt-10 ml-10"
          onClick={() => { setCreateProjectForm(true) }}
        >Create new project</button>
      }
      <div>
        {showCreateProjectForm &&
          <CreateProjectForm />
        }
        <AllProjects />
      </div>
    </div>
  )
}

export default MyProjects
