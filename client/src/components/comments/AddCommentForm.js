import React, { useState, useEffect } from 'react';
import useCommentsContext from '../../context/comments/commentsContext';
import { useParams } from 'react-router';
import useAlertContext from '../../context/alert/AlertContext';


const AddCommentForm = ({ setIsFormVisible }) => {
  const {
    addComment,
    getComments,
    alert,
    clearAlerts
  } = useCommentsContext();
  const [comment, setComment] = useState({
    title: '',
    body: ''
  })
  const { title, body } = comment;
  const { setAlert } = useAlertContext();

  const { id: ticketId } = useParams();


  const handleOnChange = (e) => {
    setComment({ ...comment, [e.target.name]: e.target.value })
  }

  const AddCommentAndFetchData = async () => {
    await addComment(ticketId, comment);
    getComments(ticketId)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === '' || body.trim() === '') {
      return setAlert({ message: "Please enter title and comment", type: 'danger' })
    }
    AddCommentAndFetchData();
    setIsFormVisible(false)
  }

  return (
    <form className=""
      onSubmit={(e) => { handleSubmit(e) }}
    >
      <div>
        <label htmlFor="title" className="form_label">Title</label>
        <input type="text"
          id="title"
          name="title"
          value={title}
          placeholder="Title"
          onChange={(e) => { handleOnChange(e) }}
          className="form_input" />
      </div>
      <div>
        <label htmlFor="body" className="form_label">Comment</label>
        <textarea className="form_input"
          name="body"
          id="body"
          cols="30"
          value={body}
          placeholder="Write your comment here..."
          onChange={(e) => { handleOnChange(e) }}
          rows="5"></textarea>
      </div>
      <input className="w-full py-2 text-center mt-3 hover:opacity-75 transition-all bg-secondary-700 text-white"
        type="submit"
        value="Send"
      />
    </form>
  )
}

export default AddCommentForm
