import React, { useEffect, useRef, useState } from 'react';
import { FaPlay, FaStop, FaUsers } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useSocketContext } from '../../context/socketContext';

const InstructorLiveClass: React.FC = () => {
  const [streamId, setStreamId] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [peerConnections, setPeerConnections] = useState<Record<string, RTCPeerConnection>>({});
  const [studentCount, setStudentCount] = useState(0);
  const { user } = useSelector((state: RootState) => state.user);
  const { socket } = useSocketContext();

  useEffect(() => {
    if (socket) {
      socket.on('student-joined', async ({ studentId, socketId }) => {
        console.log("Student joined - Socket ID:", socketId, "Student ID:", studentId);
        setStudentCount(prevCount => prevCount + 1);
        const peerConnection = createPeerConnection(socketId);
        try {
          const offer = await createOffer(peerConnection);
          console.log("Created offer:", offer);
          socket.emit('webrtc-offer', { streamId, offer, receiverSocketId: socketId });
        } catch (error) {
          console.error("Error creating offer:", error);
        }
      });

      socket.on('student-left', ({ socketId }) => {
        console.log("Student left - Socket ID:", socketId);
        setStudentCount(prevCount => Math.max(0, prevCount - 1));
        if (peerConnections[socketId]) {
          peerConnections[socketId].close();
          setPeerConnections(prev => {
            const updated = { ...prev };
            delete updated[socketId];
            return updated;
          });
        }
      });

      socket.on('webrtc-answer', async ({ answer, senderSocketId }) => {
        console.log("Received answer from student - Socket ID:", senderSocketId);
        const peerConnection = peerConnections[senderSocketId];
        if (peerConnection) {
          try {
            await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
            console.log("Set remote description successfully");
          } catch (error) {
            console.error("Error setting remote description:", error);
          }
        }
      });

      socket.on('webrtc-ice-candidate', ({ candidate, senderSocketId }) => {
        console.log("Received ICE candidate from student - Socket ID:", senderSocketId);
        const peerConnection = peerConnections[senderSocketId];
        if (peerConnection) {
          try {
            peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
            console.log("Added ICE candidate successfully");
          } catch (error) {
            console.error("Error adding ICE candidate:", error);
          }
        }
      });

      return () => {
        socket.off('student-joined');
        socket.off('student-left');
        socket.off('webrtc-answer');
        socket.off('webrtc-ice-candidate');
      };
    }
  }, [socket, peerConnections, streamId]);

  const createPeerConnection = (socketId: string): RTCPeerConnection => {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
      ]
    });
    console.log("Created peer connection for Socket ID:", socketId);
    
    peerConnection.onicecandidate = event => {
      if (event.candidate) {
        console.log("New ICE candidate:", event.candidate);
        socket?.emit('webrtc-ice-candidate', {
          streamId,
          candidate: event.candidate,
          receiverSocketId: socketId,
        });
      }
    };
    
    peerConnection.onconnectionstatechange = () => {
      console.log("Peer connection state changed:", peerConnection.connectionState);
      if(peerConnection.connectionState === 'disconnected' || peerConnection.connectionState === 'failed') {
        peerConnection.close();
        setPeerConnections(prev => {
          const updated = { ...prev };
          delete updated[socketId];
          return updated;
        });
        setStudentCount(prevCount => Math.max(0, prevCount - 1));
      }
    };

    const localStream = videoRef.current?.srcObject as MediaStream;
    localStream?.getTracks().forEach(track => {
      console.log(`Adding ${track.kind} track to peer connection`);
      peerConnection.addTrack(track, localStream);
    });

    setPeerConnections(prev => ({ ...prev, [socketId]: peerConnection }));
    return peerConnection;
  };

  const createOffer = async (peerConnection: RTCPeerConnection): Promise<RTCSessionDescriptionInit> => {
    try {
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      console.log("Created and set local description (offer)");
      return offer;
    } catch (error) {
      console.error("Error creating offer:", error);
      throw error;
    }
  };

  const startLiveStream = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          console.log("Local video playback started");
        };
      }

      const newStreamId = `stream_${Date.now()}`;
      setStreamId(newStreamId);
      socket?.emit('start-live-stream', { streamId: newStreamId, instructorId: user._id });
      setIsStreaming(true);

      mediaStream.getVideoTracks()[0].addEventListener('ended', () => {
        endLiveStream();
      });

      console.log(`Live stream started with ID: ${newStreamId}`);
    } catch (error) {
      console.error('Error starting live stream:', error);
    }
  };

  const endLiveStream = () => {
    if(!streamId) return;

    socket?.emit('end-live-stream', { streamId });
    setIsStreaming(false);

    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
    }

    Object.values(peerConnections).forEach(pc => pc.close());
    setPeerConnections({});
    setStudentCount(0);
    console.log(`Live stream ended with ID: ${streamId}`);
    setStreamId(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">create Live Class</h1>
      <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
        <video 
          ref={videoRef} 
          className="w-full h-auto max-h-96 object-contain"
          autoPlay 
          playsInline
        ></video>
        <div className="flex justify-between items-center p-4 bg-gray-800">
          {!isStreaming ? (
            <button
              className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              onClick={startLiveStream}
            >
              <FaPlay className="mr-2" /> Start Live Stream
            </button>
          ) : (
            <button
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              onClick={endLiveStream}
            >
              <FaStop className="mr-2" /> End Live Stream
            </button>
          )}
          {isStreaming && (
            <div className="flex items-center text-white">
              <FaUsers className="mr-2" /> {studentCount} watching
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorLiveClass;