import React, { useState, useEffect } from 'react';
import useAlertContext from '../../context/alert/AlertContext';
import useTicketsContext from '../../context/tickets/TicketsContext';
import Alert from '../Alert';
import useProjectsContext from '../../context/projects/ProjectsContext';
import useAuthContext from '../../context/auth/AuthContext';

const EditTicketForm = ({ ticket }) => {
  const [newTicket, setNewTicket] = useState({ ...ticket })
  const { setAlert } = useAlertContext();
  const { updateTicket, alert, getTickets, getTicket, getMyTickets } = useTicketsContext();
  const { getProject, currentProject } = useProjectsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    getProject(ticket.project._id);

    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (alert) {
      setAlert(alert)
    }
    // eslint-disable-next-line
  }, [alert])

  const handleOnChange = (e) => {
    setNewTicket({ ...newTicket, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateTicket(ticket._id, newTicket)
    getTickets()
    getTicket(ticket._id)
    getMyTickets(user._id)
  }

  const {
    name,
    description,
    priority,
    status,
    developer
  } = newTicket

  const canEditEverything = ['admin', 'project manager'].includes(user.role) ? true : false;
  const canEditStatus = ['admin', 'project manager', 'developer'].includes(user.role) ? true : false;
  const isTicketSubmitter = (ticket.submitter._id === user._id) ? true : false;

  return (
    <form onSubmit={(e) => { handleSubmit(e) }}>
      <Alert />
      {(canEditEverything || isTicketSubmitter) && (
        <div>
          <label htmlFor="name" className="form_label">Title</label>
          <input type="text"
            className="form_input"
            value={name}
            name='name'
            id="name"
            onChange={(e) => { handleOnChange(e) }}
          />
        </div>
      )}
      {(canEditEverything || isTicketSubmitter) && (
        <div>
          <label htmlFor="description" className="form_label">Description</label>
          <textarea rows="5"
            type="text"
            className="form_input"
            value={description}
            name='description'
            id="description"
            onChange={(e) => { handleOnChange(e) }}
          ></textarea>
        </div>
      )}
      {canEditEverything && (
        <div>
          <label htmlFor="developer" className="form_label">Developer</label>
          <select name="developer" id="developer"
            onChange={(e) => { handleOnChange(e) }}
            value={developer}>
            {currentProject && currentProject.users.map(user => {
              const { name, role, _id } = user
              return (
                <option key={_id} value={_id}>
                  {`${name}  ${role}`}
                </option>
              )
            })}
          </select>
        </div>
      )}
      {canEditEverything && (
        <div>
          <label htmlFor="priority" className="form_label">Priority</label>
          <select name="priority" id="priority"
            onChange={(e) => { handleOnChange(e) }}
            value={priority}>
            <option value="urgent">Urgent</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">low</option>
          </select>
        </div>
      )}
      {canEditStatus && (
        <div>
          <label htmlFor="status" className="form_label">Status</label>
          <select name="status" id="status"
            onChange={(e) => { handleOnChange(e) }}
            value={status}>
            <option value="submitted">Submitted</option>
            <option value="in progress">In progress</option>
            <option value="in review">In review</option>
            <option value="done">done</option>
          </select>
        </div>
      )}
      <input type="submit" value="Submit" className="py-2 px-10 bg-blue-300 m-5 hover:opacity-75" />
    </form>
  )
}

export default EditTicketForm
