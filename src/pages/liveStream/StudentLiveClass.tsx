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
  const [hasReceivedTracks, setHasReceivedTracks] = useState(false);

  // useEffect(()=>{
  //   if(socket){

  //   }
  // },[socket])

  useEffect(() => {
    if (socket) {
      const handleNewLiveStream = ({ streamId, instructorId }: { streamId: string; instructorId: string }) => {
        console.log("New live stream available - Stream ID:", streamId, "Instructor ID:", instructorId);
        setLiveStreams(prev => [...prev, { streamId, instructorId }]);
      };

      const handleLiveStreamEnded = ({ streamId }: { streamId: string }) => {
        console.log("Live stream ended - Stream ID:", streamId);
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
      setCurrentStreamId(null);
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setHasReceivedTracks(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Student Live Class</h1>
      <div className="bg-gray-100 rounded-lg overflow-hidden shadow-md">
        <video 
          ref={videoRef} 
          className="w-full h-auto max-h-96 object-contain"
          autoPlay 
          playsInline
        ></video>
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
      {hasReceivedTracks && !videoRef.current?.srcObject && (
        <div className="mt-4 p-4 bg-yellow-100 text-yellow-800 rounded">
          Video tracks received but not displaying. Please check your browser console for more information.
        </div>
      )}
    </div>
  );
};

export default StudentLiveClass;