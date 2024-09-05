import React, { useEffect, useRef, useState } from 'react';
import { FaPlay, FaStop, FaUsers } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useSocketContext } from '../../context/socketContext';

const InstructorLiveClass = () => {
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
        setStudentCount(prevCount => prevCount + 1);
        const peerConnection = createPeerConnection(socketId);
        const offer = await createOffer(peerConnection);
        socket.emit('webrtc-offer', { streamId, offer, receiverSocketId: socketId });
      });

      socket.on('student-left', ({ socketId }) => {
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
        const peerConnection = peerConnections[senderSocketId];
        if (peerConnection) {
          await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
        }
      });

      socket.on('webrtc-ice-candidate', ({ candidate, senderSocketId }) => {
        const peerConnection = peerConnections[senderSocketId];
        if (peerConnection) {
          peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
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

  const createPeerConnection = (socketId: string) => {
    const peerConnection = new RTCPeerConnection();

    peerConnection.onicecandidate = event => {
      if (event.candidate) {
        socket.emit('webrtc-ice-candidate', {
          streamId,
          candidate: event.candidate,
          receiverSocketId: socketId,
        });
      }
    };

    videoRef.current?.srcObject?.getTracks().forEach(track => {
      peerConnection.addTrack(track, videoRef.current.srcObject as MediaStream);
    });

    setPeerConnections(prev => ({ ...prev, [socketId]: peerConnection }));
    return peerConnection;
  };

  const createOffer = async (peerConnection: RTCPeerConnection) => {
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    return offer;
  };

  const startLiveStream = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }

      const newStreamId = `stream_${Date.now()}`;
      setStreamId(newStreamId);
      socket?.emit('start-live-stream', { streamId: newStreamId, instructorId: user._id });
      setIsStreaming(true);
    } catch (error) {
      console.error('Error starting live stream:', error);
    }
  };

  const endLiveStream = () => {
    socket.emit('end-live-stream', { streamId });
    if (videoRef.current?.srcObject) {
      (videoRef.current.srcObject as MediaStream).getTracks().forEach(track => track.stop());
    }
    setIsStreaming(false);
    Object.values(peerConnections).forEach(pc => pc.close());
    setPeerConnections({});
    setStudentCount(0);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Instructor Live Class</h1>
      <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
        <video ref={videoRef} className="w-full h-auto max-h-96 object-contain"></video>
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
