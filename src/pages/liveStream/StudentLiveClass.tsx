import React, { useEffect, useRef, useState } from 'react';
import { FaPlay, FaStop } from 'react-icons/fa';
import { useSocketContext } from '../../context/socketContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const StudentLiveClass: React.FC = () => {
  const [liveStreams, setLiveStreams] = useState<Array<{ streamId: string; instructorId: string }>>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentStreamId, setCurrentStreamId] = useState<string | null>(null);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const { socket } = useSocketContext();
  const { user } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    if (socket) {
      const handleNewLiveStream = ({ streamId, instructorId }: { streamId: string; instructorId: string }) => {
        setLiveStreams(prev => [...prev, { streamId, instructorId }]);
      };

      const handleLiveStreamEnded = ({ streamId }: { streamId: string }) => {
        console.log("🚀 ~ handleLiveStreamEnded ~ streamId:", streamId)
        setLiveStreams(prev => prev.filter(stream => stream.streamId !== streamId));
        if (currentStreamId === streamId) {
          leaveLiveStream();
        }
      };

      socket.on('new-live-stream', handleNewLiveStream);
      socket.on('live-stream-ended', handleLiveStreamEnded);

      return () => {
        socket.off('new-live-stream', handleNewLiveStream);
        socket.off('live-stream-ended', handleLiveStreamEnded);
      };
    }
  }, [socket, currentStreamId]);

  useEffect(() => {
    if (socket && currentStreamId) {
      const handleWebRTCOffer = async ({ offer, senderSocketId }: { offer: RTCSessionDescriptionInit; senderSocketId: string }) => {
        const connection = new RTCPeerConnection();

        connection.ontrack = (event) => {
          if (videoRef.current) {
            videoRef.current.srcObject = event.streams[0];
          }
        };

        connection.onicecandidate = (event) => {
          if (event.candidate) {
            socket.emit('webrtc-ice-candidate', {
              streamId: currentStreamId,
              candidate: event.candidate,
              receiverSocketId: senderSocketId,
            });
          }
        };

        await connection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await connection.createAnswer();
        await connection.setLocalDescription(answer);

        socket.emit('webrtc-answer', { streamId: currentStreamId, answer, receiverSocketId: senderSocketId });
        setPeerConnection(connection);
      };

      const handleICECandidate = ({ candidate }: { candidate: RTCIceCandidateInit }) => {
        if (peerConnection) {
          peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        }
      };

      socket.on('webrtc-offer', handleWebRTCOffer);
      socket.on('webrtc-ice-candidate', handleICECandidate);

      return () => {
        socket.off('webrtc-offer', handleWebRTCOffer);
        socket.off('webrtc-ice-candidate', handleICECandidate);
      };
    }
  }, [socket, peerConnection, currentStreamId]);

  const joinLiveStream = (streamId: string) => {
    setCurrentStreamId(streamId);
    socket.emit('join-live-stream', { streamId, studentId: user._id });
  };

  const leaveLiveStream = () => {
    if (peerConnection) {
      peerConnection.close();
      setPeerConnection(null);
      setCurrentStreamId(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Student Live Class</h1>
      <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
        <video ref={videoRef} className="w-full h-auto max-h-96 object-contain"></video>
        <div className="p-4">
          {currentStreamId ? (
            <button
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              onClick={leaveLiveStream}
            >
              <FaStop className="mr-2" /> Leave Live Stream
            </button>
          ) : (
            <div className="space-y-4">
              {liveStreams.map(stream => (
                <div key={stream.streamId} className="bg-white p-4 rounded shadow-md flex justify-between items-center">
                  <span>Stream ID: {stream.streamId} (Instructor: {stream.instructorId})</span>
                  <button
                    className="flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    onClick={() => joinLiveStream(stream.streamId)}
                  >
                    <FaPlay className="mr-2" /> Join Stream
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentLiveClass;
