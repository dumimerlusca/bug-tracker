import React, { useState, useEffect } from 'react';
import useCommentsContext from '../../context/comments/commentsContext';
import Comment from '../comments/Comment';
import AddCommentForm from './AddCommentForm';
import useAlertContext from '../../context/alert/AlertContext';
import Alert from '../Alert';
import useTicketsContext from '../../context/tickets/TicketsContext';

const CommentsList = () => {
  const {
    comments,
    alert,
    getComments,
    deleteComment,
    updateComment,
    clearAlerts
  } = useCommentsContext();
  const { currentTicket } = useTicketsContext();
  const { setAlert } = useAlertContext();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentComment, setCurrentComent] = useState(null);


  useEffect(() => {
    if (alert) {
      setAlert(alert);
      clearAlerts();
    }
  }, [alert])

  const handleClick = () => {
    if (isFormVisible) {
      setIsFormVisible(false)
      setEdit(false)
    } else {
      setIsFormVisible(true)
    }
  }

  const handleEdit = (comment) => {
    setIsFormVisible(true)
    setEdit(true)
    setCurrentComent(comment)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure?')) {
      await deleteComment(id)
      getComments(currentTicket._id)
    }
  }

  return (
    <div>
      <button className={`py-2 px-5 ${isFormVisible ? 'bg-red-500' : 'bg-secondary-700'} text-white hover:opacity-75 transition-opacity`}
        onClick={handleClick}
      >
        {isFormVisible ? 'Close form' : 'Add comment'}
      </button>
      <Alert />
      <div className="mt-5">
        <div className="my-5">
          {isFormVisible && (
            <AddCommentForm
              currentComment={currentComment}
              edit={edit}
              setEdit={setEdit}
              setIsFormVisible={setIsFormVisible} />
          )}
        </div>
        <div>
          {comments.map(comment => {
            return (
              <Comment key={comment._id}
                comment={comment}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CommentsList
