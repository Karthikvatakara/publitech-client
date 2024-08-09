import React, { useState, useEffect } from 'react';
import SideDrawer from '../../../components/chat/SideDrawer';
import MyChats from '../../../components/chat/MyChats';
import Chatbox from '../../../components/chat/ChatBox';
import { chatEntity } from '../../../interface/chatEntitty';

function InstructorChat() {
  const [selectedChat, setSelectedChat] = useState<chatEntity | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div>
      {isMobileView ? (
        selectedChat ? (
          <Chatbox selectedChat={selectedChat} onBackClick={() => setSelectedChat(null)} />
        ) : (
          <MyChats selectedChat={selectedChat} onChatSelect={setSelectedChat} />
        )
      ) : (
        <div className="grid grid-cols-12">
          <div className="col-span-6">
            <MyChats selectedChat={selectedChat} onChatSelect={setSelectedChat} />
          </div>
          <div className="col-span-6">
            <Chatbox selectedChat={selectedChat} />
          </div>
        </div>
      )}
    </div>
  );
}

export default InstructorChat;

