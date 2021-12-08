import React, { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

const SearchForm = ({ tableBody }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    search(query)
  }

  const handleOnChange = (e) => {
    search(e.target.value)
  }

  const search = (query) => {
    if (!tableBody.current) {
      return;
    }

    const trArray = Array.from(tableBody.current.children);
    const tdArray = []
    trArray.map(tr => {
      const content = tr.textContent;
      if (!content.includes(query)) {
        tr.style.display = 'none';
      } else {
        tr.style.display = 'table-row';
      }
    })
  }

  return (
    <div className="inline-flex gap-2 items-center mb-5">
      <BsSearch />
      <input type="text"
        className="py-2 px-5 shadow-md rounded-md focus:ring-2 focus:outline-none focus:ring-blue-400"
        style={{ minWidth: '300px' }}
        onChange={(e) => { handleOnChange(e) }}
        placeholder="Search..."
      />
    </div>
  )
}

export default SearchForm
