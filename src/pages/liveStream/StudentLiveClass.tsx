import React, { useEffect, useRef, useState } from 'react';
import { FaPlay, FaStop, FaUser } from 'react-icons/fa';
import { useSocketContext } from '../../context/socketContext';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import axios from 'axios';
import { URL } from '../../common/api';
import { config } from '../../common/configurations';
import { Player } from '@lottiefiles/react-lottie-player';


interface LiveStream {
  streamId: string;
  instructorId: string;
  timestamp: number;
}

const StudentLiveClass: React.FC = () => {
  const [liveStreams, setLiveStreams] = useState<LiveStream[]>([]);
  const [instructorUsernames, setInstructorUsernames] = useState<{[key: string]: string}>({});
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentStreamId, setCurrentStreamId] = useState<string | null>(null);
  const [peerConnection, setPeerConnection] = useState<RTCPeerConnection | null>(null);
  const { socket } = useSocketContext();
  const { user } = useSelector((state: RootState) => state.user);
  const [hasReceivedTracks, setHasReceivedTracks] = useState(false);

  useEffect(() => {
    if (socket) {
      console.log("Setting up live stream listeners");
      
      socket.emit("get-current-live-streams");
  
      const handleCurrentLiveStreams = (streams: LiveStream[]) => {
        console.log("Received current live streams:", streams);
        setLiveStreams(streams);
      }
  
      const handleNewLiveStream = ({ streamId, instructorId, timestamp }: LiveStream) => {
        console.log("New live stream available - Stream ID:", streamId, "Instructor ID:", instructorId);
        setLiveStreams(prev => [...prev, { streamId, instructorId, timestamp }]);
      };
  
      const handleLiveStreamEnded = ({ streamId }: { streamId: string }) => {
        console.log("Live stream ended - Stream ID:", streamId);
        setLiveStreams(prev => prev.filter(stream => stream.streamId !== streamId));
        if (currentStreamId === streamId) {
          leaveLiveStream();
        }
      };
  
      socket.on('current-live-streams', handleCurrentLiveStreams);
      socket.on('new-live-stream', handleNewLiveStream);
      socket.on('live-stream-ended', handleLiveStreamEnded);
  
      return () => {
        console.log("Cleaning up live stream listeners");
        socket.off('current-live-streams', handleCurrentLiveStreams);
        socket.off('new-live-stream', handleNewLiveStream);
        socket.off('live-stream-ended', handleLiveStreamEnded);
      };
    }
  }, [socket, currentStreamId]);

  useEffect(() => {
    const filterOldStreams = () => {
      const currentTime = Date.now();
      const streamTimeout = 2 * 60 * 60 * 1000; // 2 hours in milliseconds
      setLiveStreams(prev => prev.filter(stream => currentTime - stream.timestamp < streamTimeout));
    };

    const interval = setInterval(filterOldStreams, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (socket && currentStreamId) {
      const handleWebRTCOffer = async ({ offer, senderSocketId }: { offer: RTCSessionDescriptionInit; senderSocketId: string }) => {
        console.log("Received WebRTC offer - Sender Socket ID:", senderSocketId);
        const connection = new RTCPeerConnection({
          iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
          ]
        });
        console.log("Created peer connection:", connection);

        connection.ontrack = (event) => {
          console.log('Received tracks:', event.streams[0].getTracks());
          event.streams[0].getTracks().forEach(track => {
            console.log('Track details:', {
              kind: track.kind,
              id: track.id,
              enabled: track.enabled,
              muted: track.muted,
              readyState: track.readyState
            });
            if (track.kind === 'video') {
              track.enabled = true;
            }
          });
        
          if (videoRef.current) {
            console.log('Setting video source');
            videoRef.current.srcObject = event.streams[0];
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play()
                .then(() => console.log('Video playback started'))
                .catch(e => console.error('Error playing video:', e));
            };
          }

          setHasReceivedTracks(true);
        };

        connection.oniceconnectionstatechange = () => {
          console.log('ICE connection state:', connection.iceConnectionState);
        };
        
        connection.onsignalingstatechange = () => {
          console.log('Signaling state:', connection.signalingState);
        };

        connection.onicecandidate = (event) => {
          if (event.candidate) {
            console.log('New ICE candidate:', event.candidate);
            socket.emit('webrtc-ice-candidate', {
              streamId: currentStreamId,
              candidate: event.candidate,
              receiverSocketId: senderSocketId,
            });
          }
        };

        try {
          await connection.setRemoteDescription(new RTCSessionDescription(offer));
          console.log('Set remote description successfully');
          const answer = await connection.createAnswer();
          await connection.setLocalDescription(answer);
          console.log('Created and set local description (answer)');
  
          socket.emit('webrtc-answer', { streamId: currentStreamId, answer, receiverSocketId: senderSocketId });
          setPeerConnection(connection);
        } catch (error) {
          console.error('Error in WebRTC process:', error);
        }
      };

      const handleICECandidate = ({ candidate }: { candidate: RTCIceCandidateInit }) => {
        console.log("Received ICE candidate:", candidate);
        if (peerConnection) {
          peerConnection.addIceCandidate(new RTCIceCandidate(candidate))
            .then(() => console.log('Added ICE candidate successfully'))
            .catch(error => console.error('Error adding ICE candidate:', error));
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

  useEffect(() => {
    liveStreams.forEach(stream => {
      if (!instructorUsernames[stream.instructorId]) {
        getUserData(stream.instructorId);
      }
    });
  }, [liveStreams]);

  const joinLiveStream = (streamId: string) => {
    console.log("Joining live stream - Stream ID:", streamId);
    setCurrentStreamId(streamId);
    socket?.emit('join-live-stream', { streamId, studentId: user._id });
  };

  const leaveLiveStream = () => {
    console.log("Leaving live stream");
    if (peerConnection) {
      peerConnection.close();
      setPeerConnection(null);
    }
    setCurrentStreamId(null);
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setHasReceivedTracks(false);
  };

  const getUserData = async (instructorId: string) => {
    try {
      const response = await axios.post(`${URL}/api/auth/student/instructor`, { instructorId }, config);
      console.log("🚀 ~ getUserData ~ response:", response);
      
      // Assuming the response.data.username contains the instructor's username
      setInstructorUsernames(prev => ({...prev, [instructorId]: response?.data?.data?.username}));
    } catch (error) {
      console.error("Error fetching instructor data:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Live Classes</h1>
      {currentStreamId ? (
        <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
          <video 
            ref={videoRef} 
            className="w-full h-auto max-h-96 object-contain"
            autoPlay 
            playsInline
          ></video>
          <div className="p-4">
            <button
              className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              onClick={leaveLiveStream}
            >
              <FaStop className="mr-2" /> Leave Live Stream
            </button>
          </div>
        </div>
      ) : liveStreams.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveStreams.map(stream => (
            <div key={stream.streamId} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
  <img 
    src="https://cdn.prod.website-files.com/63c8f2a5e7a1f60637888f3f/6413e4118a614375f0f2d8aa_blog-livestream-guide.webp"
    alt="Live Stream Thumbnail" 
    className="absolute inset-0 h-full w-full object-cover"
  />
</div>
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <FaUser className="text-gray-500 mr-2" />
                  <span className="font-semibold text-gray-700">
                    Instructor: {instructorUsernames[stream.instructorId] || 
                          <Player
                          autoplay
                          loop
                          src="https://lottie.host/9606a518-e28e-47af-b63b-26f1de6ecf13/lTWeXJsxSL.json"
                          style={{ height: '60px', width: '60px' }}
                    />}
                  </span>
                </div>
                {/* <p className="text-sm text-gray-600 mb-4">Stream ID: {stream.streamId}</p> */}
                <button
                  className="w-full flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                  onClick={() => joinLiveStream(stream.streamId)}
                >
                  <FaPlay className="mr-2" /> Join Live Stream
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-600 mt-8">
          <p>No live streams are currently available.</p>
          <p>Please check back later or wait for an instructor to start a stream.</p>
        </div>
      )}
      {hasReceivedTracks && !videoRef.current?.srcObject && (
        <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded">
          Video tracks received but not displaying. Please check your browser console for more information.
        </div>
      )}
    </div>
  );
};

export default StudentLiveClass;