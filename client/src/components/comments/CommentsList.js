import React, { useState, useEffect } from 'react';
import useCommentsContext from '../../context/comments/commentsContext';
import Comment from '../comments/Comment';
import AddCommentForm from './AddCommentForm';
import Alert from '../Alert';
import useAlertContext from '../../context/alert/AlertContext';

const CommentsList = () => {
  const {
    comments,
    alert,
    clearAlerts
  } = useCommentsContext();
  const { setAlert } = useAlertContext();
  const [isFormVisible, setIsFormVisible] = useState(false);


  useEffect(() => {
    if (alert) {
      setAlert(alert);
      clearAlerts();
    }
  }, [alert])

  const handleClick = () => {
    if (isFormVisible) {
      setIsFormVisible(false)
    } else {
      setIsFormVisible(true)
    }
  }

  return (
    <div>
      <button className={`py-2 px-5 ${isFormVisible ? 'bg-red-500' : 'bg-secondary-700'} text-white hover:opacity-75 transition-opacity`}
        onClick={handleClick}
      >
        {isFormVisible ? 'Close form' : 'Add comment'}
      </button>
      <div className="mt-5">
        <Alert />
        <div className="my-5">
          {isFormVisible && (
            <AddCommentForm setIsFormVisible={setIsFormVisible} />
          )}
        </div>
        <div>
          {comments.map(comment => {
            return (
              <Comment key={comment._id} comment={comment} />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default CommentsList
