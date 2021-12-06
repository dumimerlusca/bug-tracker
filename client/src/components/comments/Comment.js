import React from 'react';
import formatDate from '../../utils/formatDate';

const Comment = ({ comment }) => {
  const { body, createdAt, user } = comment
  return (
    <div className="py-3 rounded w-full px-5 shadow-lg bg-white mb-4">
      <div className="flex gap-5 items-center">
        <h3 className="text-lg font-bold my-3">{user.name}</h3>
        <span className="font-thin text-sm">{formatDate(new Date(createdAt))}</span>
      </div>
      <p className="font-thin text-md">{body}</p>
    </div>
  )
}

export default Comment
