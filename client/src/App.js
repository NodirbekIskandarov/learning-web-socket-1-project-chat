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
