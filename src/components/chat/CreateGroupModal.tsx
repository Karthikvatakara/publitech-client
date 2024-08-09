import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../../common/api';
import { config } from '../../common/configurations';
import { UserEntity } from '../../interface/UserEntity';
import { FaSearch, FaTimes, FaUserPlus, FaUsers } from 'react-icons/fa';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (groupName: string, selectedUserIds: string[]) => void;
}

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ isOpen, onClose, onCreateGroup }) => {
  const [groupName, setGroupName] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [usersList, setUsersList] = useState<UserEntity[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<UserEntity[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      getData();
    }
  }, [isOpen]);

  useEffect(() => {
    handleSearch();
  }, [searchTerm, usersList]);

  const getData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${URL}/api/course/usersforChat`, config);
      setUsersList(response?.data?.data);
      setFilteredUsers(response?.data?.data);
    } catch (error) {
      console.error("Error fetching users:", error);
      setError("Failed to fetch users. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const filtered = usersList.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const toggleUserSelection = (user: UserEntity) => {
    setSelectedUsers(prev => 
      prev.includes(user._id)
        ? prev.filter(id => id !== user._id)
        : [...prev, user._id]
    );
  };

  const handleCreateGroup = () => {
    if (!groupName.trim()) {
      setError("Group name is required");
      return;
    }
    if (selectedUsers.length < 2) {
      setError("Please select at least 2 users for the group");
      return;
    }
    onCreateGroup(groupName, selectedUsers);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">Create New Group Chat</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 transition duration-150">
            <FaTimes size={24} />
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="groupName" className="block text-sm font-medium text-gray-700 mb-1">Group Name</label>
          <input
            id="groupName"
            type="text"
            placeholder="Enter group name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="searchUsers" className="block text-sm font-medium text-gray-700 mb-1">Search Users</label>
          <div className="flex">
            <input
              id="searchUsers"
              type="text"
              placeholder="Search users"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {loading && <p className="text-gray-500">Loading users...</p>}
        {error && <p className="text-red-500 mb-2">{error}</p>}

        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Users</h3>
          <div className="flex flex-wrap gap-2">
            {selectedUsers.map(userId => {
              const user = usersList.find(u => u._id === userId);
              return (
                <span key={userId} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {user ? user.username : userId}
                </span>
              );
            })}
          </div>
        </div>

        <div className="max-h-40 overflow-y-auto mb-4 border border-gray-200 rounded-md">
          {filteredUsers.map(user => (
            <div
              key={user._id}
              className={`p-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between ${
                selectedUsers.includes(user._id) ? 'bg-blue-50' : ''
              }`}
              onClick={() => toggleUserSelection(user)}
            >
              <span>{user.username}</span>
              {selectedUsers.includes(user._id) ? (
                <FaUserPlus className="text-blue-500" />
              ) : (
                <FaUserPlus className="text-gray-400" />
              )}
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button 
            onClick={onClose} 
            className="mr-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition duration-150"
          >
            Cancel
          </button>
          <button 
            onClick={handleCreateGroup} 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-150 flex items-center"
          >
            <FaUsers className="mr-2" />
            Create Group
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroupModal;