import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const connectionWithDb=async()=>{
    await connect(process.env.DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log(`DB Connected Successfully`))
    .catch((error)=>{
        console.log(`Issue while connecting with DB`)
        console.log(error);
        process.exit(1);
    });
};

export default connectionWithDb;