const mongoose=require('mongoose');
export const DBConnect=async()=>{
    try{
        const connect =await mongoose.connect(process.env.MONGODB_URL);
        console.log('connect to mongodb',connect)
    }catch(error){
        console.error(error)
    }
}