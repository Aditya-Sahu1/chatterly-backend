const express = require("express");
const app = express();
const routes_handler=express.Router();
const jwt=require('../middlewares/jwt_user_token')

const controller_register=require('../controllers/register_controller')
const controller_login=require('../controllers/login_controller')
const Auth=require('../controllers/authentication_check')

routes_handler.route("/").get(jwt,Auth);
routes_handler.route("/register").post(controller_register);
routes_handler.route("/login").post(controller_login);
// routes_handler.route("/login").post(controller_login);





// // routes_handler.get("/"",jwt)
// routes_handler.post("/register",async (req, res,next) => {
//   try {
//     const { name, email, password } = req.body;
//     const existing_user = await User.findOne({ email: email });
//     if (existing_user) {
//       return res.json({
//         success: false,
//         msg: "user already exists",
//       });
//       // return;
//     }

//     let user = new User();
//     user.username = name;
//     user.email = email;

//     const salt = await bcryptjs.genSalt(10);
//     user.password = await bcryptjs.hash(password, salt);
//     await user.save();

//     console.log(1111);

//     const payload={
//       user:{
//         id:user.id,
//         email:user.email
//       }
//     };
//     console.log(payload);
//     jwt.sign(payload,process.env.JWT_USER_SECRET,{
//       expiresIn:360000
//     },(err,token)=>{
//       if(err)throw err;
//       res.status(200).json({
//         sucess:true,
//         token:token
//        });
       
//     });
//     console.log("2222222");
//     // return res.json({
//     //   success: true,
//     //   user: user,
//     // });
//   } catch (error) {
//     console.log(error);
//     console.log(error.message);
//   }
// });
module.exports=routes_handler;