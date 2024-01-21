import './App.css';
import io from "socket.io-client"
import { useEffect, useState } from "react"
const socket = io.connect("http://localhost:3001")
function App() {

  const [room, setRoom] = useState("")

  const [message, setMessage] = useState("")
  const [messageReceived, setMessageReceived] = useState("")

  const joinRoom = () => {
    if(room!=="") {
      socket.emit("join_room", room)
    }
  }
  // const sendMessage = () => {
  //   socket.emit("send_message", { message })
  // }
  const sendMessage = () => {
    socket.emit("send_message", { message, room })
  }

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message)
    })
  }, [socket])
  return (
    <div className="App">
      <input placeholder="Room number..." onChange={(e) => setRoom(e.target.value)}/>
      <button onClick={joinRoom}>Join room</button>
      <input placeholder="Message..." onChange={(e) => setMessage(e.target.value)}/>
      <button onClick={sendMessage}>Send</button>
      <h1>Message:</h1>
      {messageReceived}
    </div>
  );
}

export default App;




// import './App.css';
// import io from 'socket.io-client';
// import { useEffect, useState, useRef } from 'react';

// const socket = io.connect('http://localhost:3001');
// // ... (previous imports)

// // ... (previous imports)

// // ... (previous imports)

// function App() {
//   const [room, setRoom] = useState('');
//   const [message, setMessage] = useState('');
//   const [messageReceived, setMessageReceived] = useState('');
//   const [localStream, setLocalStream] = useState(null);
//   const [remoteStreams, setRemoteStreams] = useState([]);
//   const [isCalling, setIsCalling] = useState(false);
//   const [callerId, setCallerId] = useState('');
//   const videoRef = useRef();

//   const startCall = (user) => {
//     socket.emit('call-user', { roomId: room, targetUserId: user.id, callerStream: localStream });
//   };

//   const answerCall = () => {
//     setIsCalling(false);
//     socket.emit('answer-call', { roomId: room, targetUserId: callerId, callerStream: localStream });
//   };

//   const endCall = (user) => {
//     setIsCalling(false);
//     setCallerId('');
//     socket.emit('end-call', { roomId: room, targetUserId: user.id });
//   };

//   // ... (other state and useEffect)

//   useEffect(() => {
//     // ... (previous code)

//     socket.on('receive-call', (incomingStream) => {
//       setIsCalling(true);
//       setCallerId(incomingStream.id);
//     });

//     socket.on('answer-call', () => {
//       setIsCalling(false);
//     });

//     socket.on('call-ended', () => {
//       setIsCalling(false);
//       setCallerId('');
//     });

//     return () => {
//       socket.off('receive-call');
//       socket.off('answer-call');
//       socket.off('call-ended');
//     };
//   }, []);

//   // ... (other functions)

//   return (
//     <div className="App">
//       {/* ... (previous JSX code) */}
//       <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
//         <video ref={videoRef} autoPlay muted style={{ width: '300px', height: '200px' }} />

//         {remoteStreams.map((remoteStream) => (
//           <div key={remoteStream.id} style={{ position: 'relative', margin: '10px' }}>
//             <video ref={(ref) => (ref.srcObject = remoteStream)} autoPlay style={{ width: '300px', height: '200px' }} />

//             {!isCalling && (
//               <button style={{ position: 'absolute', bottom: '0', right: '0' }} onClick={() => startCall(remoteStream)}>
//                 Call
//               </button>
//             )}

//             {isCalling && remoteStream.id === callerId && (
//               <button style={{ position: 'absolute', bottom: '0', right: '0' }} onClick={answerCall}>
//                 Answer
//               </button>
//             )}

//             <button style={{ position: 'absolute', top: '0', left: '0' }} onClick={() => endCall(remoteStream)}>
//               End Call
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default App;



