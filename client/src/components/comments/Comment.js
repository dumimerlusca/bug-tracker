import React from 'react';
import formatDate from '../../utils/formatDate';
import { FaTrashAlt } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs'

const Comment = ({ comment, handleDelete, handleEdit }) => {
  const { body, createdAt, user, _id } = comment
  return (
    <div className="py-3 rounded w-full px-5 shadow-lg bg-white mb-4 relative">
      <div className="flex gap-5 items-center">
        <h3 className="text-lg font-bold my-3">{user.name}</h3>
        <span className="font-thin text-sm">{formatDate(new Date(createdAt))}</span>
      </div>
      <p className="font-thin text-md">{body}</p>

      <div className="inline-flex absolute top-1/2 right-0 gap-1" style={{ transform: 'translateY(-50%)' }}>
        <button onClick={() => { handleEdit(comment) }}> <BsPencilSquare /></button>
        <button onClick={() => { handleDelete(_id) }}> <FaTrashAlt /></button>
      </div>
    </div>
  )
}

export default Comment
