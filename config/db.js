const mongoose=require('mongoose')
const connectDB=async()=> {
    const conn=await mongoose.connect(process.env.mongo_uri).then(() => console.log('Database connected successfully'))
}
module.exports=connectDB;