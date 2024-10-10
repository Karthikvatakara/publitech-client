import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllInstructorApplication, approveInstructor } from '../../redux/actions/admin/adminActions';
import { AppState, RootState } from "../../redux/store";
import AlertBox from '../../common/alertBox';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { TbListDetails } from "react-icons/tb";
import InstructorDetailsModal from '../../components/common/instructorDetailsModal';

const InstructorRequests: FC = () => {
  const dispatch = useDispatch<AppState>();
  const { instructors, totalPages, currentPage } = useSelector((state: RootState) => state.instructors);
  const [selectedInstructor, setSelectedInstructor] = useState<any>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
const limit = 5;

  useEffect(() => {
    getInstructorData();
  }, [dispatch, currentPage, limit, selectedStatus, searchTerm]);

  const getInstructorData = async () => {
    await dispatch(getAllInstructorApplication({ page: currentPage, limit, status: selectedStatus, search: searchTerm }));
  };

  const handleApprove = async (instructorId: string) => {
    await dispatch(approveInstructor({ instructorId }));
    getInstructorData();
  };

  const handleReject = async (instructorId: string, reason: string) => {
    await dispatch(approveInstructor({ instructorId, reason }));
    getInstructorData();
  };

  const openModal = (instructor: any) => {
    setSelectedInstructor(instructor);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedInstructor(null);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handlePageChange = (newPage: number) => {
    dispatch(getAllInstructorApplication({ page: newPage, limit, status: selectedStatus, search: searchTerm }));
  };

  return (
    <div className='w-full p-5'>
      <h1 className='font-bold text-2xl text-darkBlue m-4'>Manage Instructors</h1>

      <div className='mb-4 flex items-center'>
        <label htmlFor="status" className='mr-4'>Filter by Status:</label>
        <select
          id="status"
          value={selectedStatus}
          onChange={handleStatusChange}
          className='p-2 border-rounded rounded-xl border border-gray-300 mr-4'
        >
          <option value="all">All</option>
          <option value="applied">Applied</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>

        <input
          type="text"
          placeholder="Search by email or profession"
          value={searchTerm}
          onChange={handleSearchChange}
          className='p-2 border-rounded rounded-xl border border-gray-300'
        />
      </div>

      <div className='lg:overflow-hidden bg-gray-100 p-3 rounded-xl'>
        <table className='w-full min-w-max table-auto border-collapse'>
          <thead className='font-normal bg-gray-200 rounded-sm'>
            <tr>
              <th className='py-2 px-4 text-left border-b'>Email</th>
              <th className='py-2 px-4 text-left border-b'>Profession</th>
              <th className='py-2 px-4 text-left border-b'>Profile Description</th>
              <th className='py-2 px-4 text-left border-b'>Status</th>
              <th className='py-2 px-4 text-left border-b'>Details</th>
              <th className='py-2 px-4 text-left border-b'>Actions</th>
            </tr>
          </thead>
          <tbody className='font-semibold'>
            {instructors?.map((item) => (
              <tr key={item?._id} className='hover:bg-gray-100'>
                <td className='py-2 px-4 border-b'>{item?.email}</td>
                <td className='py-2 px-4 border-b'>{item?.profession}</td>
                <td className='py-2 px-4 border-b'>{item?.profileDescription}</td>
                <td className='py-2 px-4 border-b'>{item?.stage}</td>
                <td className='py-2 px-4 border-b cursor-pointer' onClick={() => openModal(item)}>
                  <TbListDetails className='text-blue-500' />
                </td>
                <td className='py-2 px-4 border-b text-black'>
                  <div className='flex justify-center items-center'>
                    {item?.stage === 'approved' && (
                      <FaCheck className='text-green-500 cursor-not-allowed mx-2' />
                    )}
                    {item?.stage === 'rejected' && (
                      <FaTimes className='text-red-500 cursor-not-allowed mx-2' />
                    )}
                    {item?.stage === 'applied' && (
                      <div className='flex justify-center'>
                        <AlertBox
                          button={<FaCheck className='text-green-500 cursor-pointer mx-2' />}
                          ques={"Are you sure you want to approve this instructor?"}
                          onConfirm={() => handleApprove(item._id)}
                        />
                        <AlertBox
                          button={<FaTimes className='text-red-500 cursor-pointer mx-2' />}
                          ques={"Are you sure you want to reject this instructor?"}
                          onConfirm={(reason) => handleReject(item._id, reason)}
                          option={true}
                          placeholder={'Reason for the rejection'}
                        />
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`mx-1 px-3 py-1 rounded ${
              currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <InstructorDetailsModal isOpen={isModalOpen} onClose={closeModal} instructor={selectedInstructor} />
    </div>
  );
};

export default InstructorRequests;