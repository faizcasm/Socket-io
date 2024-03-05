const app = require('express')();
const cors = require('cors')
const server = require('http').createServer(app);
const io = require('socket.io')(server,{
    cors:{
        origin:"*",
        methods:["GET","POST"],
        allowedHeaders:["my-custom-header"],
        credentials:true
    }
})
io.on("connection",(socket)=>{
 console.log("You have a new Message",socket);
 console.log("Socket is active to be connected");
 socket.on("chat",(payload)=>{
    console.log("What is payload",payload);
    io.emit("chat",payload)
 })

})
server.listen(8000,()=>{
    console.log("Server Listening at port 8000");
})