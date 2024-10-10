import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { URL } from '../../common/api';
import { config } from '../../common/configurations';
import { UserEntity } from '../../interface/UserEntity';
import Pagination from '../../components/common/Pagination';
import ConfirmationModal from '../../components/common/modals/ConfirmationModal';
import { Player } from '@lottiefiles/react-lottie-player';
// import { useSocketContext } from '../../context/socketContext';

function UsersList() {
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [userData, setUserData] = useState<UserEntity[] | null>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [ showModal, setShowModal ] = useState<boolean>(false);
  const [ selectedUser, setSelectedUser ] = useState<UserEntity | null>(null);
  // const { socket } = useSocketContext();

  useEffect(() => {
    getUserData();
  }, [currentPage, selectedStatus, searchTerm]);

  const getUserData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${URL}/api/user/admin/students`, {
        ...config,
        params: {
          page: currentPage,
          limit: 5,
          status: selectedStatus,
          search: searchTerm
        }
      });
      console.log("🚀 ~ getUserData ~ response:", response)
      setUserData(response?.data?.data);
      setTotalPages(response?.data?.totalPages);
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
    setCurrentPage(1);
  };

  const handleSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  }

  const openModal = (user: UserEntity) => {
    console.log("🚀 ~ openModal ~ userId:", user)
    setSelectedUser(user)
    setShowModal(true)
  }

  const confirmAction = () => {
    changeUserStatus(selectedUser!)
}

  const changeUserStatus = async(user:UserEntity) => {
  // setLoading(true)
  console.log("🚀 ~ changeUserStatus ~ user:", user)
  const response = await axios.post(`${URL}/api/user/admin/students/status/${user._id}`,config)
  console.log("🚀 ~ changeUserStatus ~ response:", response);
  setUserData((prevData) => 
    prevData 
      ? prevData.map((userData) => 
          userData?._id === user._id
            ? { ...userData, isBlocked: response?.data?.data?.isBlocked }
            : userData
        )
      : prevData 
  );
  if(response?.data?.data?.isBlocked) {
    
    // if(socket && response?.data?.data?.isBlocked){
    //   socket.emit('block-user',{ userId: user?._id});
    //   console.log(`Emitted block-user event for user ${user._id}`);
    // }else{
    //   console.log('socket is not available')
    // }
  }
  // setLoading(false)
  setShowModal(false)
  }


  return (
    <div className='w-full space-y-6 p-4'>
      <h1 className='font-bold text-2xl text-darkBlue'>User Management</h1>

      <div className='flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2'>
          <label htmlFor="status" className='text-sm font-medium text-gray-700'>Filter by status:</label>
          <select
            id="status"
            value={selectedStatus}
            onChange={handleStatusChange}
            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          >
            <option value="all">All</option>
            <option value="blocked">Blocked</option>
            <option value="unblocked">Unblocked</option>
          </select>
        </div>

        <div className='flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2'>
          <label htmlFor="search" className='text-sm font-medium text-gray-700'>Search:</label>
          <input
            type="text"
            placeholder='Search by email or username'
            value={searchTerm}
            onChange={handleSearchTerm}
            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          />
        </div>
      </div>

      <div className='w-full overflow-x-auto bg-gray-50 rounded-xl p-4 shadow'>
        {loading ? (
          // <div className="flex justify-center items-center h-32">
          //   <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          // </div>
          <Player
          autoplay
          loop
          src="https://lottie.host/9606a518-e28e-47af-b63b-26f1de6ecf13/lTWeXJsxSL.json"
          style={{ height: '120px', width: '120px' }}
       />
        ) : userData && userData.length > 0 ? (
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>UserName</th>
                <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Email</th>
                <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Action</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {userData.map((user) => (
                <tr key={user?._id ? String(user._id) : user.email} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{user?.username}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{user?.email}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user?.isBlocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {user?.isBlocked ? "Not Active" : "Active"}
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    <button 
                      className={`px-4 py-2 border rounded-md text-sm font-medium ${user?.isBlocked ? 'bg-green-50 text-green-700 hover:bg-green-100' : 'bg-red-50 text-red-700 hover:bg-red-100'}`}
                    onClick={()=> openModal(user)}>
                      {user?.isBlocked ? "Unblock" : "Block"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-4 text-gray-500">
            No students found matching your criteria.
          </div>
        )}
      </div>

      {!loading && userData && userData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
       <ConfirmationModal
        show={showModal}
        message={`Are you sure you want to ${selectedUser?.isBlocked? "unBlock":"block"} this student?`}
        onConfirm={confirmAction}
        onCancel={() => setShowModal(false)}
      />
    </div>
  );
}

export default UsersList;