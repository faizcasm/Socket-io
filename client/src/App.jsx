import { useState,useEffect,useCallback } from 'react'
import './App.css'
import io from 'socket.io-client'
import {toast,Toaster} from 'react-hot-toast'
import {nanoid} from 'nanoid'

//not using dotenv
const socket = io("http://localhost:8000")
// const username = nanoid(4)
function App() {
  const [message, setMessage] = useState("")
  const [chat,setChat]= useState([])
  const [username,setUsername] = useState()
 const sendchat = (e)=>{
  e.preventDefault();
 socket.emit("chat",{message,username})
 setMessage('')
 };
 useEffect(()=>{
  socket.on("chat",(payload)=>{
    setChat([...chat,payload])
    // toast.success("new message")
  })
 })
  return (
    <>
    <Toaster/>
    <h2>Chat App</h2>
    <form onSubmit={sendchat}>
    <input type='text' name='username' placeholder='Name' 
      onChange={(e)=>setUsername(e.target.value)}
    />
<br/>
<br/>
      <input type='text' name='chat' placeholder='Message' value={message}
        onChange={(e)=>setMessage(e.target.value)}
      />
      <br/>
      <br/>
      <button type='submit' id='button'>Send</button>
    </form>

<br/>
{
  chat.map((payload,index)=>{
    {/* toast.success(`${username} send a new message`) */}
    return(
    
         <p key={index}> <span>{payload.username} </span> <br/> {payload.message}  </p>
    )
  })
}
   
    </>
  )
}

export default App
