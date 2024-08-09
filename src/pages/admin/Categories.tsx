import React, { useEffect, useState } from 'react';
import { CategoryEntity } from '../../types/categoryEntity';
import axios from 'axios';
import { URL } from '../../common/api';
import { config } from '../../common/configurations';
import { TbListDetails } from "react-icons/tb";
import ModalComponent from '../../components/common/modals/ModalComponent';
import AddCategoryForm from './AddCategoryFormModal';
import { ClipLoader } from 'react-spinners'; 
import CategoryEditModal from './CategoryEditModal';
import ConfirmationModal from '../../components/common/modals/ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import { getUserData } from '../../redux/actions/user/userActions';

function Categories() {
  const [categoriesData, setCategoriesData] = useState<CategoryEntity[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [addCategoryModal, setAddCategoryModal] = useState<boolean>(false);
  // const [loading, setLoading] = useState<boolean>(false);
  const [actionModal, setActionModal] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryEntity | null>(null);
  const [ blockModal,setBlockModal ] = useState<boolean>(false);
  const [ modalAction,setModalAction ] = useState<"block" | "unblock">("block")

  useEffect(() => {
    getCategoriesData();
  },[]); 

  const getCategoriesData = async () => {
    try {
      // setLoading(true);
      const response = await axios.get(`${URL}/api/course/admin/category`, config);
      setCategoriesData(response?.data.data);
      // setLoading(false);
    } catch (error) {
      console.error(error, "error occurred");
      // setError("error fetching data");
      // setLoading(false);
    }
  };

  const addCategory = () => {
    setAddCategoryModal(true);
  };

  const closeModal = () => {
    setAddCategoryModal(false);
  };

  const handleAction = (category: CategoryEntity) => {
    setSelectedCategory(category);
    setActionModal(true);
  };

  const closeActionModal = () => {
    setActionModal(false);
  };

  const openStatus = (category:CategoryEntity,action:"block"|"unblock") => {
    setSelectedCategory(category);
    setModalAction(action)
    setBlockModal(true);
  }

  const confirmAction = () => {
    if(modalAction === "block"){
      instructorStatusChange(selectedCategory,modalAction)
    }else {
      instructorStatusChange(selectedCategory,modalAction)
    }
  }

  const instructorStatusChange = async(selectedCategory:CategoryEntity | null,action:"block" | "unblock") => {
    try{
      if(selectedCategory){
        const id = selectedCategory._id
        const data = { id,action }
        const response  = await axios.post(`${URL}/api/course/admin/category/status`,  data  ,config)
        setBlockModal(false);
        getCategoriesData()
        // navigate('/admin/categories')
      }
    }catch(error){
      setError("failed to update instructor data")
    }
  }

  return (
    <div className="w-full p-4">
      {/* {loading ? (
        <ClipLoader size={35} color={"#123abc"} loading={loading} />
      ) : ( */}
        <>
          {addCategoryModal && (
            <ModalComponent tab={<AddCategoryForm onClose={closeModal} getData={getCategoriesData} />} />
          )}
          {actionModal && selectedCategory && (
            <ModalComponent
              tab={<CategoryEditModal onClose={closeActionModal} category={selectedCategory} getData={getCategoriesData}/>}
            />
          )}
          <div className="flex flex-col m-4">
            <h1 className="font-bold text-darkBlue text-xl">Categories</h1>
          </div>
          <div className='flex justify-end p-1'>
            <button
              className='bg-darkBlue text-white p-2 rounded-xl font-semibold hover:bg-white hover:text-darkBlue duration-200 hover:font-bold'
              onClick={addCategory}
            >
              Add Category
            </button>
          </div>
          <div className="bg-gray-100 p-3 rounded-xl">
            <table className="w-full min-w-max">
              <thead className="font-normal bg-gray-200 rounded-xl">
                <tr>
                  <th className="py-2 px-4 text-left border-b">Category Name</th>
                  <th className="py-2 px-4 text-left border-b">Status</th>
                  <th className="py-2 px-4 text-left border-b">Image</th>
                  <th className="py-2 px-4 text-left border-b">Action</th>
                  <th className="py-2 px-4 text-left border-b">status</th>
                </tr>
              </thead>
              <tbody>
                {categoriesData.map((category) => (
                  <tr key={category._id.toString()}>
                    <td className="py-2 px-4 border-b">{category.title}</td>
                    <td className="py-2 px-4 border-b">{category.isBlocked ? "not-Active" : "Active"}</td>
                    <td className="py-2 px-4 border-b">
                      <img src={category.imageUrl} alt={category.title} className="w-16 h-16 object-cover" />
                    </td>
                    <td className="py-2 px-4 border-b cursor-pointer" onClick={() => handleAction(category)}>
                      <TbListDetails className="text-blue-500" />
                    </td>
                    <td className="py-2 px-4 border-b">{category.isBlocked ? 
                    <button className='p-3 bg-darkBlue text-white font-semibold rounded-xl hover:bg-white hover:text-darkBlue' onClick={()=> openStatus(category,"unblock")}>UnBlock</button>
                    : 
                    <button className='p-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-white hover:text-red-600' onClick={()=> openStatus(category,"block")}>Block</button>
                    }</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </>
      {/* ) */}
      {/* } */}
      <ConfirmationModal
        show={blockModal}
        message={`Are you sure you want to ${modalAction} this instructor?`}
        onConfirm={confirmAction}
        onCancel={() => setBlockModal(false)}
      />
    </div>
  );
}

export default Categories;
