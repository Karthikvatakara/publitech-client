import { useState, useEffect } from 'react';
import MyChats from '../../../components/chat/MyChats';
import Chatbox from '../../../components/chat/ChatBox';
import { getUserChatEntity } from '../../../interface/getUserChatEntity';

function InstructorChat() {
  const [selectedChat, setSelectedChat] = useState<getUserChatEntity | null>(null);
  const [isMobileView, setIsMobileView] = useState(false);
  
  const [lastMessageTime, setLastMessageTime] = useState<number>(0);


  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNewMessage = () => {
    setLastMessageTime(Date.now());
  };

  return (
    <div>
      {isMobileView ? (
        selectedChat ? (
          <Chatbox 
          selectedChat={selectedChat} 
          onBackClick={() => setSelectedChat(null)}
          onNewMessage={handleNewMessage}
          />
        ) : (
          <MyChats 
          selectedChat={selectedChat} 
          onChatSelect={setSelectedChat} 
          lastMessageTime={lastMessageTime}
        />
        )
      ) : (
        <div className="grid grid-cols-12">
          <div className="col-span-6">
            <MyChats 
            selectedChat={selectedChat} 
            onChatSelect={setSelectedChat}
            lastMessageTime={lastMessageTime}
            />
          </div>
          <div className="col-span-6">
            <Chatbox selectedChat={selectedChat} 
            onNewMessage={handleNewMessage}
          />
          </div>
        </div>
      )}
    </div>
  );
}

export default InstructorChat;

