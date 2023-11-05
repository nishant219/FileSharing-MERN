import express from "express";
import userRoutes from "./routes/fileRoute.js";
import databaseConnection from "./connection/db.js";
import cors from "cors";

const app=express();

const PORT=5000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/",userRoutes);

databaseConnection();

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});
