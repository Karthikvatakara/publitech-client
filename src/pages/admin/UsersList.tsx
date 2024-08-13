import React from 'react'

function UsersList() {
  return (
    <div className='w-full space-y-3 p-2'>
      <h1 className='font-bold text-2xl text-darkBlue'>User Management</h1>

      <div className='flex justify-between '>
        <div>
        <label htmlFor="status">filter by status</label>
        <select name="" id="" className='ms-2 p-2 border border-rounded rounded-xl border-gray-400'>
            <option value="all">All</option>
            <option value="blocked">Blocked</option>
            <option value="unblocked">unblocked</option>
        </select>
        </div>
      </div>
    </div>
  )
}

export default UsersList
