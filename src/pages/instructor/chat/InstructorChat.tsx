import { useState, useEffect } from 'react';
import MyChats from '../../../components/chat/MyChats';
import Chatbox from '../../../components/chat/ChatBox';
import { getUserChatEntity } from '../../../interface/getUserChatEntity';

function InstructorChat() {
  const [selectedChat, setSelectedChat] = useState<getUserChatEntity | null>(null);
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

