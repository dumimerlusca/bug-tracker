import React, { useState, useEffect } from 'react';
import useTicketsContext from '../../context/tickets/TicketsContext';
import { useParams } from 'react-router';
import Alert from '../Alert';
import useAlertContext from '../../context/alert/AlertContext';
import useProjectsContext from '../../context/projects/ProjectsContext';
import useAuthContext from '../../context/auth/AuthContext';

const AddTicketForm = () => {
  const {
    addTicket,
    alert,
    getTickets,
    getMyTickets } = useTicketsContext();
  const { getProject } = useProjectsContext();
  const { user } = useAuthContext();
  const { setAlert } = useAlertContext();
  const { id: projectId } = useParams();

  const [ticket, setTicket] = useState({
    name: '',
    description: '',
    priority: 'high',
  })
  const { name, description, priority } = ticket;

  useEffect(() => {
    if (alert) {
      setAlert(alert)
    }

    // eslint-disable-next-line
  }, [alert])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name.trim() === '' || description.trim() === '') {
      setAlert({ message: 'Please fill all the field', type: 'danger' });
      return
    }
    await addTicket(projectId, ticket)
    getProject(projectId)
    getTickets();
    getMyTickets(user._id)
  }

  const handleOnChange = (e) => {
    setTicket({ ...ticket, [e.target.id]: e.target.value })
  }

  return (
    <form className="mt-7"
      onSubmit={(e) => { handleSubmit(e) }}>
      <h1 className="text-xl p-4">Create new ticket</h1>
      <Alert />
      <div>
        <label htmlFor="name" className="form_label">Title</label>
        <input type="text"
          className="form_input"
          id="name"
          value={name}
          onChange={(e) => { handleOnChange(e) }}
        />
      </div>
      <div>
        <label htmlFor="description" className="form_label">Description</label>
        <textarea name="description"
          id="description"
          cols="30"
          className="form_input"
          value={description}
          onChange={(e) => { handleOnChange(e) }}
          rows="5">

        </textarea>
      </div>
      <div>
        <label htmlFor="priority" className="form_label">Priority</label>
        <select name="" id="priority"
          onChange={(e) => { handleOnChange(e) }}
          value={priority}>
          <option value="urgent">Urgent</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">low</option>
        </select>
      </div>
      <input type="submit"
        className="py-2 px-10 bg-secondary-500 text-white rounded hover:opacity-75 m-5"
        value="Submit" />
    </form>
  )
}

export default AddTicketForm
