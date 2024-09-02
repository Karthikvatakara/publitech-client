import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import axios from 'axios';
import { URL } from '../../common/api';
import { config } from '../../common/configurations';
import { messageEntity } from '../../interface/messageEntity';
import emptyUser from "../../assets/profiles/emptyUser.png"
import { useSocketContext } from '../../context/socketContext';
import multipleUser from "../../assets/profiles/multipleUser.png"
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'
import { Player } from '@lottiefiles/react-lottie-player';
import { useNavigate } from 'react-router-dom';
import Peer from "peerjs";
import { IoVideocam } from "react-icons/io5";
import { VideoCall } from './VideoCall';
import CallNotification from './CallNotification';

interface ChatboxProps {
  selectedChat: any | null;
  onBackClick?: () => void;
}

const Message: React.FC<{ message: any; isCurrentUser: boolean }> = ({ message, isCurrentUser }) => (
  <div className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} mb-4`}>
    {!isCurrentUser && (
      <img
        src={message.sender.profile?.avatar || emptyUser}
        alt={message.sender.username}
        className="w-8 h-8 rounded-full mr-2"
      />
    )}
    <div className={`max-w-[70%] rounded-lg p-3 ${isCurrentUser ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
      {!isCurrentUser && (
        <p className="text-xs font-semibold mb-1">{message.sender.username}</p>
      )}
      <p className="text-sm">{message.content}</p>
      <p className="text-xs mt-1 opacity-70">{new Date(message.createdAt).toLocaleTimeString()}</p>
    </div>
  </div>
);

const Chatbox: React.FC<ChatboxProps> = ({ selectedChat, onBackClick }) => {
  const [messages, setMessages] = useState<messageEntity[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useSelector((state: RootState) => state.user);
  const { socket, onlineUsers } = useSocketContext();
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [ localPeerId, setLocalPeerId ] = useState<string>("");
  const [ peer, setPeer ] = useState<peer | null>(null);
  const [ localStream, setLocalStream ] = useState<MediaStream | null>(null);
  const [ remoteStream, setRemoteStream ] = useState<MediaStream | null>(null);
  const [ callStatus, setCallStatus ] = useState<"idle" | "calling" | "in-call">("idle")
  const [ callError, setCallError] = useState<string | null>(null);
  const [ incomingCall, setIncomingCall ] = useState<string | null>(null);

  useEffect(() => {
    const peer = new Peer();
    peer.on("open",(id) => {
      console.log("my peer id is??????????????????",id)
      setLocalPeerId(id);
    })
    setPeer(peer);
    return () => {
      peer.destroy();
    };
  },[])
  
  useEffect(() => {
    if (selectedChat) {
      getMessages();
    }
  }, [selectedChat, socket]);

  useEffect(() => {
    if (socket && selectedChat) {
      socket.emit("join chat", selectedChat._id);

      const handleMessageReceived = (message: messageEntity) => {
        if (selectedChat && message?.chatId?._id === selectedChat._id) {
          setMessages((prevMessages) => {
            const messageExists = prevMessages.some(m => m._id === message._id);
            if (!messageExists) {
              return [...prevMessages, message];
            }
            return prevMessages;
          });
        }
      };

      socket.on("message received", handleMessageReceived);

      socket?.on("incoming-call",(callerId) => {
        console.log("🚀 ~aaaaaaaaaaaaaaaaaaaaaa ", callerId)
        setIncomingCall(callerId)
      })

      socket?.on("end-call",endCall);

      
      return () => {
        socket.off("message received", handleMessageReceived);
        socket.emit("leave chat", selectedChat._id);
        socket.off("incoming-call")
      };
    }
  }, [socket, selectedChat]);

  const handleAcceptCall = () => {
    if (incomingCall) {
      answerCall(incomingCall);
      setIncomingCall(null);
    }
  };

  const handleRejectCall = () => {
    if (incomingCall) {
      socket?.emit("reject-call", { callerId: incomingCall, chatId: selectedChat?._id });
      setIncomingCall(null);
    }
  };

  const answerCall = ( callerId: string ) => {
    console.log("🚀 ~ answerCall ~ callerId:ansercalllllllllllllllll", callerId)
    navigator.mediaDevices.getUserMedia({ video: true, audio: true})
    .then((stream) => {
      setLocalStream(stream);
      const call = peer?.call(callerId, stream);

      call?.on("stream",(remoteStream: React.SetStateAction<MediaStream | null>) => {
        console.log("🚀 ~ call.on ~ remoteStream:", remoteStream)
        setRemoteStream(remoteStream);
        setCallStatus("in-call");
      })
    })
    .catch((error) => {
      console.error("failed to get local Stream",error);
      setCallStatus("idle");
    }).finally(() => {
      setCallStatus("idle");
    }) 
  }

  const endCall = () => {
    if( localStream ) {
      localStream.getTracks().forEach((track) => track.stop());
      setLocalStream(null);
    }
    setRemoteStream(null);
    setCallStatus("idle");
    socket?.emit("end-call",selectedChat?._id)
  }


  const handleSubscriptionSubmit = () => {
    console.log("aaaaaaaaaa");
    navigate(`/student/subscription/${selectedChat._id}`)
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 0);
  };

  const isUserOnline = (userId: string) => onlineUsers.includes(userId);

  const getMessages = async () => {
    if (!selectedChat) return;
    setIsLoading(true);
    try {
      const response = await axios.get(`${URL}/api/chat/listmessages/${selectedChat._id}`, config);
      setMessages(response.data?.data);
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && selectedChat && socket) {
      try {
        const response = await axios.post(
          `${URL}/api/chat/message`,
          {
            content: newMessage,
            chatId: selectedChat._id,
            sender: user._id
          },
          config
        );

        const data = response?.data?.data;
        socket.emit("new message", { ...data, chatId: selectedChat });
        setNewMessage('');
        scrollToBottom();
      } catch (error) {
        console.error("Error sending message:", error);
        alert("Failed to send message. Please try again.");
      }
    }
  };

  const handleEmojiSelect = (emoji: any) => {
    const cursor = inputRef.current?.selectionStart || newMessage.length;
    const newMessageWithEmoji = 
      newMessage.slice(0, cursor) + emoji.native + newMessage.slice(cursor);
    setNewMessage(newMessageWithEmoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const onStartCall = ( roomId: string ) => {
    console.log(roomId,"it is the roomId")
    console.log("🚀 ~ onStartCall ~ localPeerId:", localPeerId)
    if( peer && localPeerId ) {
      setCallStatus("calling");
      socket?.emit("start-call",{ roomId, localPeerId });
      startCall(localPeerId);
    }
  }

  
  const startCall = ( receiverId: string ) => {
    console.log(receiverId,"receiverId");
    navigator.mediaDevices.getUserMedia({ video: true, audio: true})
    .then((stream) =>{
      setLocalStream(stream);

      const call = peer?.call(receiverId, stream);
      console.log("🚀 ~ .then ~ call:", call)
      call?.on("stream",(remoteStream) => {
        console.log("::::::::::::::::::::::")
        setRemoteStream(remoteStream);
        setCallStatus("in-call")
      })
    }).catch((error)=>{
      console.error("failed to get local stream",error);
      setCallStatus("idle");
    })
  }

  const renderSubscriptionMessage = () => {
    if (user.role === 'student') {
      if (selectedChat?.subscriptionType === 'none') {
        return (
          <div className="flex flex-col justify-center items-center h-full">
             <Player
              autoplay
              loop
              src="https://lottie.host/796d373b-b83b-4549-8844-5c7c0785cdf5/uK3TWZDZ1K.json"
              style={{ height: '250px', width: '250px' }}
        />
            {/* <p className="text-sm text-yellow-700 mb-4">
              You need to take a subscription to access this chat.
            </p> */}
            <button
              className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 transition-colors duration-300"
            onClick={handleSubscriptionSubmit}>
              Take Subscription
            </button>
          </div>
        );
      }
    } else if (user.role === 'instructor') {
      if (selectedChat?.subscriptionType === 'none') {
        return (
          <div className="flex flex-col justify-center items-center h-full">
            <p className="text-sm text-yellow-700 font-bold">
              The student has not taken a subscription for this chat.
            </p>
          </div>
        );
      }
    }

    return null;
  }

  if (!selectedChat) {
    return (
      <div className="flex flex-col h-[calc(100vh-2rem)] sm:h-[calc(100vh-4rem)] m-2 sm:m-4 bg-white rounded-lg shadow-lg overflow-hidden justify-center items-center">
        <Player
          autoplay
          loop
          src="https://lottie.host/62d50bad-84f4-4729-83fe-17a90537bac4/89hAY4U3n7.json"
          style={{ height: '200px', width: '200px' }}
        />
        <p className="text-xl text-gray-500">Select a chat to start messaging</p>
      </div>
    );
  }

  const otherUser = selectedChat.users.find((u) => u._id !== user._id);

  return (
    <div className="flex flex-col h-[calc(100vh-2rem)] sm:h-[calc(100vh-4rem)] m-2 sm:m-4 bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Chat Header */}
      <div className="  flex bg-gray-100 items-center justify-between ">
        <div className='bg-gray-100 p-4 border-b flex items-center"'>
        {onBackClick && (
          <button
            className="mr-4 text-gray-600 hover:text-gray-800 transition duration-300"
            onClick={onBackClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
        )}
        <img
          src={selectedChat.isGroupChat ? multipleUser : otherUser?.profile?.avatar || emptyUser}
          alt={selectedChat.isGroupChat ? 'Group' : otherUser?.username}
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h2 className="text-xl font-semibold">
            {selectedChat.isGroupChat ? selectedChat.groupName : otherUser?.username}
          </h2>
          <p className="text-sm text-gray-500">
            {selectedChat.isGroupChat 
              ? `${selectedChat.users.length} members` 
              : isUserOnline(otherUser?._id) 
                ? 'Online' 
                : 'Offline'}
          </p>
          </div>
        </div>
        <IoVideocam size={30} className='m-4' onClick={() => 
          callStatus === "idle" && onStartCall(selectedChat?._id)}/>
        </div>

      {/* Chat Messages or Subscription Message */}
      {selectedChat?.subscriptionType === 'none' ? (
        renderSubscriptionMessage()
      ) : (
        <div className="flex-grow overflow-y-auto p-4 space-y-4">
          {isLoading ? (
            <Player
              autoplay
              loop
              src="https://lottie.host/9606a518-e28e-47af-b63b-26f1de6ecf13/lTWeXJsxSL.json"
              style={{ height: '20px', width: '20px' }}
            />
          ) : (
            messages.map((msg) => (
              <Message key={msg._id} message={msg} isCurrentUser={msg.sender._id === user._id} />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      )}

      {/* Chat Input */}
      {selectedChat?.subscriptionType !== 'none' && (
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <div className="relative flex-grow">
              <input 
                ref={inputRef}
                type="text" 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage();
                  }
                }}
                placeholder="Type a message..."
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xl"
              >
                😊
              </button>
              {showEmojiPicker && (
                <div className="absolute bottom-full right-0 mb-2 z-10">
                  <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                </div>
              )}
            </div>
            <button 
              onClick={handleSendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Send
            </button>
          </div>
        </div>
      )}
        {incomingCall && (
        <CallNotification
          onAccept={handleAcceptCall}
          onReject={handleRejectCall}
        />
      )}
      {callStatus !== "idle" && (
        <VideoCall
        localStream={localStream}
        remoteStream={remoteStream}
        onEndCall={endCall}/>
      )}
    </div>
  );
};

export default Chatbox;
