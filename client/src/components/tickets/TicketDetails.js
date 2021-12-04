import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useTicketsContext from '../../context/tickets/TicketsContext';
import Loading from '../Loading';
import EditTicketForm from './EditTicketForm';
import useAuthContext from '../../context/auth/AuthContext';
import useAlertContext from '../../context/alert/AlertContext';
import Alert from '../Alert';
import { useNavigate } from 'react-router';

const TicketDetails = () => {
  const [edit, setEdit] = useState(false);

  const { currentTicket, loading, getTicket, getTickets, getMyTickets, deleteTicket, clearAlerts, alert } = useTicketsContext();
  const { user } = useAuthContext();
  const { setAlert } = useAlertContext();

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    getTicket(id)
  }, [])

  useEffect(() => {
    if (alert) {
      setAlert(alert);
      clearAlerts();
    }
  }, [alert])

  if (loading) {
    return <Loading />
  }

  if (!currentTicket && !loading) {
    return <h1>Ticket not found</h1>
  }

  const {
    name,
    description,
    project,
    submitter,
    priority,
    status,
    type,
    developer,
    createdAt
  } = currentTicket;

  const rolesThatCanEdit = ['admin', 'project manager', 'developer'];
  const canEdit = (rolesThatCanEdit.includes(user.role) || submitter._id === user._id) ? true : false;

  const handleDelete = async () => {
    if (window.confirm('Are you sure?')) {
      await deleteTicket(id)
      navigate(-1)
      getTickets();
      getMyTickets(user._id)
    }
  }

  return (
    <div>
      <div>
        <button className="inline-block m-5 text-2xl py-2 px-5 font-thin"
          onClick={() => { setEdit(false) }}
        >Details for ticket
        </button>
        {canEdit && (
          <div className='inline-flex gap-5'>
            <button className='py-2 px-4 bg-blue-100 hover:opacity-75'
              onClick={() => { setEdit(true) }}
            >Edit</button>
            <button className='py-2 px-4 bg-red-400 text-white hover:opacity-75'
              onClick={handleDelete}
            >Delete</button>
          </div>

        )}
        {edit ? <EditTicketForm ticket={currentTicket} /> : (
          <div className="grid grid-cols-1 gap-5 shadow-xl rounded-md p-10
          sm:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold">Title</h2>
              <p className="font-thin">{name}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="font-thin">{description}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Assigned developer</h2>
              <p className="font-thin">{developer ? developer.name : '-'}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Submitter</h2>
              <p className="font-thin">{submitter.name}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Project</h2>
              <p className="font-thin">{project.name}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Ticket priority</h2>
              <p className="font-thin">{priority}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Ticket status</h2>
              <p className="font-thin">{status}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Created att</h2>
              <p className="font-thin">{createdAt}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TicketDetails
