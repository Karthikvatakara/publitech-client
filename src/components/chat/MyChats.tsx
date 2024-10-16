import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { config } from '../../common/configurations';
import { URL } from '../../common/api';
// import { chatEntity } from '../../interface/chatEntitty';
import emptyUser from "../../assets/profiles/emptyUser.png";
import CreateGroupModal from './CreateGroupModal';
import multipleUser from "../../assets/profiles/multipleUser.png";
import { Player } from '@lottiefiles/react-lottie-player';
import { getUserChatEntity } from '../../interface/getUserChatEntity';

interface MyChatsProps {
  selectedChat: getUserChatEntity | null,
  onChatSelect: (chat: getUserChatEntity | null) => void;
  lastMessageTime: number;
}

const MyChats: React.FC<MyChatsProps> = ({ selectedChat, onChatSelect, lastMessageTime }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useSelector((state: RootState) => state.user);
  const [chatList, setChatList] = useState<any[]>([]);
  const [filteredChatList, setFilteredChatList] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ loading, setLoading ] = useState<boolean>(false)

  useEffect(() => {
    getData();
  }, [lastMessageTime]);

  useEffect(() => {
    const filtered = chatList.filter(chat => 
      chat.users.some((u: { username: string; }) => u?.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (chat.latestMessage && chat.latestMessage.content.toLowerCase().includes(searchTerm.toLowerCase()))||
      (chat.isGroupChat && chat.groupName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredChatList(filtered);
  }, [searchTerm, chatList]);


  const getData = async() => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL}/api/chat/chats`, config);
      const chatData = response.data?.data as any[];  
   

      const sortedChats = chatData.sort((a, b) => {
        const timeA = a.latestMessage ? new Date(a?.latestMessage?.createdAt).getTime() : 0;
        const timeB = b.latestMessage ? new Date(b?.latestMessage.createdAt).getTime() : 0;
        return timeB - timeA;
      });
      setChatList(sortedChats);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }
  

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const handleCreateGroup = async (groupName: string, selectedUserIds: string[]) => {
    try {
      const instructor = user._id
      selectedUserIds.push(instructor);

      const data = {
        isGroupChat: true,
        users: selectedUserIds,
        groupName: groupName,
        groupAdmin: instructor
      }

      const response = await axios.post(`${URL}/api/chat`, data, config);
      if (response.data) {
        setChatList(prevChats => [ ...prevChats,response.data.data]);
      }

    } catch (error) {
      console.error("Error creating group chat:", error);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] sm:h-[calc(100vh-4rem)] m-2 sm:m-4">
      <div className="flex-none p-3 bg-white rounded-t-lg border-t border-x">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">My Chats</h2>
          {user.role === "instructor"? (
          <button 
            className="flex items-center text-sm sm:text-base bg-darkBlue text-white hover:bg-blue-600 px-2 sm:px-4 py-1 sm:py-2 rounded transition duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            <span className="sm:hidden">New</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 sm:ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>):null}
        </div>
        <div className="flex items-center space-x-2 mb-3">
          <input
            type="text"
            placeholder="Search chats..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-darkBlue"
          />
          <button
            onClick={handleSearch}
            className="bg-darkBlue text-white p-2 rounded-lg hover:bg-darkblue transition duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex-grow overflow-hidden bg-gray-100 rounded-b-lg border-b border-x">
  <div className="h-full overflow-y-auto p-2 sm:p-3 space-y-2">
    {loading ? (
      <div className="flex justify-center items-center h-full">
        <Player
          autoplay
          loop
          src="https://lottie.host/9606a518-e28e-47af-b63b-26f1de6ecf13/lTWeXJsxSL.json"
          style={{ height: '80px', width: '80px' }}
        />
      </div>
    ) : (
      filteredChatList.map((chat) => {
        const otherUser = chat.users.find((u: { _id: any; }) => u._id !== user._id);
        return (
          <div 
            key={chat._id} 
            className={`cursor-pointer bg-white hover:bg-blue-50 p-2 sm:p-3 rounded-lg transition duration-300 shadow-sm flex items-center ${
              selectedChat && selectedChat._id === chat._id ? 'bg-blue-100' : ''
            }`}
            onClick={() => onChatSelect(chat)}
          >
            <img 
              src={chat.isGroupChat ? multipleUser : otherUser?.profile?.avatar || emptyUser} 
              alt={chat.isGroupChat ? 'Group' : otherUser?.username} 
              className="w-12 h-12 rounded-full mr-3 object-cover"
            />
            <div className="flex-grow">
              <p className="font-semibold text-sm sm:text-base text-gray-800">
                {chat.isGroupChat ? chat.groupName : otherUser?.username}
              </p>
              <p className="text-xs sm:text-sm truncate text-gray-600">
                <span className="font-medium">Last: </span>
                {chat.latestMessage ? chat.latestMessage.content : 'No messages yet'}
              </p>
            </div>
          </div>
        );
      })
    )}
  </div>
</div>

      <CreateGroupModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreateGroup={handleCreateGroup}
      />
    </div>
  );
};

export default MyChats;
