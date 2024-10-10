import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { URL } from '../../common/api'
import { config } from '../../common/configurations';
import ConfirmationModal from '../../components/common/modals/ConfirmationModal';
import { TbListDetails } from "react-icons/tb";
import InstructorDetailsModal from '../../components/common/instructorDetailsModal';
import Pagination from '../../components/common/Pagination';
import { Player } from '@lottiefiles/react-lottie-player';
import { UserEntity } from '../../interface/UserEntity';

function AdminInstructors() {
  const [instructorData, setInstructorData] = useState<UserEntity[]>([])
  const [loading, setLoading] = useState<boolean>(false);
  // const [error, setError] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedInstructor, setSelectedInstructor] = useState<string | null>(null)
  const [modalAction, setModalAction] = useState<"block" | "unblock">("block")
  const [selectedStatus, setSelectedStatus] = useState<string>("all")
  const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false)
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    getInstructorData()
  }, [currentPage, selectedStatus, searchTerm])

  const getInstructorData = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${URL}/api/user/admin/instructor`, {
        ...config,
        params: {
          page: currentPage,
          limit: 10,
          status: selectedStatus,
          search: searchTerm
        }
      })
      setInstructorData(response.data.data)
      setTotalPages(response.data.totalPages)
      setLoading(false)
    } catch (error) {
      // setError("Failed to fetch instructor data")
      console.log(error);
      setLoading(false);
    }
  }

  const instructorStatusChange = async (selectedInstructor: string | null, action: "block" | "unblock") => {
    try {
      if (selectedInstructor) {
        const id = selectedInstructor;
        setLoading(true);
        await axios.post(`${URL}/api/user/admin/instructor/status`, { id, action }, config);

        setInstructorData((prevInstructor) => 
        prevInstructor.map((instructor) => 
          instructor._id === selectedInstructor ?(
            { ...instructor,isBlocked: action === "block"}
          ):(
            instructor
          )
        ));

        setLoading(false)
        setShowModal(false);
      }
    } catch (error) {
      // setError("Failed to update instructor status")
      setLoading(false)
    }
  }

  const openModal = (id: string, action: "block" | "unblock") => {
    setSelectedInstructor(id);
    setModalAction(action);
    setShowModal(true);
  }

  const openDetailsModal = (instructor: string) => {
    setShowDetailsModal(true);
    setSelectedInstructor(instructor);
  }

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedInstructor(null)
  }

  const confirmAction = () => {
    instructorStatusChange(selectedInstructor, modalAction)
  }

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value)
    setCurrentPage(1)
  }

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className='w-full p-4'>
      <div className='flex m-3 text-2xl'>
        <h1 className='font-bold text-darkBlue'>Instructors</h1>
      </div>

      <div className='mb-4 flex justify-between items-center'>
        <div>
          <label htmlFor="status" className='mr-4'>Filter by Status:</label>
          <select id="status" value={selectedStatus} onChange={handleStatusChange} className='p-2 border-rounded rounded-xl border border-gray-300'>
            <option value="all">All</option>
            <option value="blocked">Blocked</option>
            <option value="unblocked">Unblocked</option>
          </select>
        </div>
        <div>
          <input
            type="text"
            placeholder="Search by email or profession"
            value={searchTerm}
            onChange={handleSearchChange}
            className='p-2 border-rounded rounded-xl border border-gray-300'
          />
        </div>
      </div>

      {loading ? 
       <Player
       autoplay
       loop
       src="https://lottie.host/9606a518-e28e-47af-b63b-26f1de6ecf13/lTWeXJsxSL.json"
       style={{ height: '120px', width: '120px' }}
    />
      : (
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
            <tbody>
              {instructorData.map((instructor) => (
                <tr key={instructor._id as string}>
                  <td className='py-2 px-4 border-b'>{instructor?.email}</td>
                  <td className='py-2 px-4 border-b'>{instructor?.profession}</td>
                  <td className='py-2 px-4 border-b'>{instructor.profileDescription}</td>
                  <td className='py-2 px-4 border-b'>{instructor.isBlocked ? "Blocked" : "Active"}</td>
                  <td className='py-2 px-4 border-b cursor-pointer' onClick={() => openDetailsModal(instructor?._id as string)}>
                    <TbListDetails className='text-blue-500' />
                  </td>
                  <td className='py-2 px-4 border-b'>
                    {instructor.isBlocked ? (
                      <button className='p-2 rounded-xl bg-green-600 font-bold' onClick={() => openModal(instructor._id as string, "unblock")}>Unblock</button>
                    ) : (
                      <button className='p-2 rounded-xl bg-red-500 font-bold' onClick={() => openModal(instructor._id as string, "block")}>Block</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
      <ConfirmationModal
        show={showModal}
        message={`Are you sure you want to ${modalAction} this instructor?`}
        onConfirm={confirmAction}
        onCancel={() => setShowModal(false)}
      />
      <InstructorDetailsModal isOpen={showDetailsModal} onClose={closeDetailsModal} instructor={selectedInstructor} />
    </div>
  )
}

export default AdminInstructors