const express=require('express');
const app =express();
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
app.listen(port);