const express=require('express');
const app =express();
const http =require('http')



const server =http.createServer(app)


const{Server}=require('socket.io');
const auth_routes_handler=require("./routers/Authenticaton_routes");
const user_routes_handler=require("./routers/users");
const dotenv=require('dotenv')
const User=require("./models/user")
const connectdb=require('./config/db')
dotenv.config({
    path:"./config/config.env"
});

app.use(express.json({}));
// app.use(express.json({
//     extended:true
// }));


connectdb();
app.use("/chatapp/api/auth",auth_routes_handler);
app.use("/chatapp/api",user_routes_handler);

const port= process.env.PORT||3000;
const io= new Server(server ,{
    cors:{
        origin:"*",
    }
});

server.listen(port, ()=>{
    console.log(`Server runing on port ${port}`)
});
// app.listen(port);
io.on("connection", (socket) => {
    console.log("✅ A user connected:", socket.id);

    socket.on("join", (userId) => {
        // Join a private room based on userId
        socket.join(userId);
        console.log(`🔐 User ${userId} joined their room`);
    });

    socket.on("disconnect", () => {
        console.log("❌ A user disconnected");
    });
});

module.exports.io=io;