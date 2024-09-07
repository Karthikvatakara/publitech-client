import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { URL } from '../../common/api';
import { config } from '../../common/configurations';
import Pagination from '../../components/common/Pagination';


function UserCoursePayment() {
    const [ loading, setLoading ] = useState<boolean>(false);
    const [ paymentData, setPaymentData ] = useState<any[]>([]);
    const [ selectedStatus, setSelectedStatus ] = useState<string>('all')
    const [ searchTerm, setSearchTerm ] = useState<string>('');
    const [ currentPage, setCurrentPage ] = useState<number>(1)
    const [ totalPages, setTotalPages ] = useState<number>(1);

    useEffect(() => {
        getData();
    },[ currentPage, selectedStatus, searchTerm ])

    const getData = async() => {
        setLoading(true)
        const response = await axios.get(`${URL}/api/payment/user/payments`,{
            ...config,
            params: {
                page: currentPage,
                limit: 5,
                status: selectedStatus,
                search: searchTerm
            }
        });
        console.log(response);
        setPaymentData(response?.data?.data);
        setTotalPages(response?.data?.totalPages)
        setLoading(false)
    }

    const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedStatus(event.target.value);
        console.log(selectedStatus,"sssssssssss");
    }

    const handleSearchTerm = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value)
        console.log(searchTerm,"aaaaaaaaaa")
    }
    const handlePageChange = ( page: number) => {
        setCurrentPage(page);
    }
  
  return (
    <div>
        
      <div className='flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4 p-3'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-2'>
          <label htmlFor="status" className='text-sm font-medium text-gray-700'>Filter by status:</label>
          <select
            id="status"
            value={selectedStatus}
            onChange={handleStatusChange}
            className='mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
          >
            <option value="all">All</option>
            <option value="completed">completed payments</option>
            <option value="failed">failed payments</option>
            <option value="pending">pending payments</option>
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
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        ) : paymentData && paymentData.length > 0 ? (
          <table className='min-w-full divide-y divide-gray-200'>
            <thead className='bg-gray-50'>
              <tr>
                <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>courseName</th>
                <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Course Author</th>
                <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Method</th>
                <th scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>Amount</th>
              </tr>
            </thead>
            <tbody className='bg-white divide-y divide-gray-200'>
              {paymentData.map((payment) => (
                <tr key={payment?._id} className='hover:bg-gray-50'>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900'>{payment?.courseId?.title}</td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>{payment?.instructorRef?.username}</td>
                  <td className='px-6 py-4 whitespace-nowrap'>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${payment?.status === "pending" || 'failed' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                      {payment?.status }
                    </span>
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    {payment?.method}
                  </td>
                  <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
                    {payment?.amount}
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
      {!loading && paymentData && paymentData.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

export default UserCoursePayment