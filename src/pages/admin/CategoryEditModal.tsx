import React, { useState } from 'react';
import ImageUpdload from '../../lib/utility/ImageUpload';
import toast from 'react-hot-toast';
import axios from 'axios';
import { config } from '../../common/configurations';
import { URL } from '../../common/api';
import { ClipLoader } from 'react-spinners'; 
import { CategoryEntity } from '../../types/categoryEntity';

interface CategoryEditFormProps {
  onClose: () => void;
  category: CategoryEntity;
  getData: () => void
}

const CategoryEditModal: React.FC<CategoryEditFormProps> = ({ onClose, category,getData }) => {
  const [title, setTitle] = useState<string>(category.title);
  const [previewImage, setPreviewImage] = useState<string | null>(category.imageUrl);
  const [categoryError, setCategoryError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string | null>(category.imageUrl);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      setLoading(true);
      const imageUrl = await ImageUpdload(file!);
      setLoading(false);
      setImageUrl(imageUrl);
      if (!imageUrl) {
        toast.error("Image upload error");
        return;
      }
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setCategoryError('Category Name is required');
      return;
    }

    const data = { title, imageUrl };
    try {
      const updatedCategory = await axios.put(`${URL}/api/course/admin/category/${category._id}`, data, config);
      toast.success("Category updated successfully");
      onClose(); // Close the modal after submission
      getData();

    } catch (error) {
      toast.error("Error updating category");
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value.trim()) {
      setCategoryError('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Edit Category</h2>
      <div className="flex w-full">
        <div className="flex flex-col items-center">
          <div className="w-52 h-52 rounded-md bg-gray-200 flex items-center justify-center overflow-hidden">
            {previewImage ? (
              <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              loading ? <ClipLoader size={35} color={"#123abc"} loading={loading} /> : <span className="text-gray-500">No Image</span>
            )}
          </div>
          <div className="flex justify-center mt-4">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block"
            />
          </div>
        </div>
        <div className="flex ml-4 justify-center items-center">
          <div className="mb-4">
            <label className="block text-gray-700">Category Name</label>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="w-full p-2 border border-gray-300 rounded mt-2"
            />
            {categoryError && (
              <div className="text-red-500 text-sm mt-1 font-semibold">{categoryError}</div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-red-500 text-white p-2 rounded mr-2"
        >
          Cancel
        </button>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CategoryEditModal;
