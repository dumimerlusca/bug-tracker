import React, { useState, useEffect } from 'react';
import useCommentsContext from '../../context/comments/commentsContext';
import { useParams } from 'react-router';
import useAlertContext from '../../context/alert/AlertContext';


const AddCommentForm = ({ setIsFormVisible, setEdit, edit, currentComment }) => {
  const {
    addComment,
    getComments,
    updateComment
  } = useCommentsContext();
  const [comment, setComment] = useState('')

  const { body } = comment;
  const { setAlert } = useAlertContext();

  const { id: ticketId } = useParams();

  useEffect(() => {
    if (edit && currentComment) {
      setComment({ ...comment, body: currentComment.body });
    }
  }, [edit])

  const handleOnChange = (e) => {
    setComment(e.target.value)
  }

  const handleAddComment = async () => {
    await addComment(ticketId, { body: comment });
    getComments(ticketId)
  }

  const handleUpdateComment = async () => {
    await updateComment(currentComment._id, { body: comment });
    getComments(ticketId);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (comment.trim() === '') {
      return setAlert({ message: "Please add comment", type: 'danger' })
    }

    if (edit) {
      handleUpdateComment()
      setIsFormVisible(false)
      setEdit(false)
    } else {
      handleAddComment();
      setIsFormVisible(false)
    }
  }

  return (
    <form className=""
      onSubmit={(e) => { handleSubmit(e) }}
    >
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
      {edit ? (
        <button className="w-full py-2 text-center mt-3 hover:opacity-75 transition-all bg-green-300 text-white"
          type="submit">Update</button>
      ) : (
        <button className="w-full py-2 text-center mt-3 hover:opacity-75 transition-all bg-secondary-700 text-white"
          type="submit">Send</button>
      )}
    </form>
  )
}

export default AddCommentForm
