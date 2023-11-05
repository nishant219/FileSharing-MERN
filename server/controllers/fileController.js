import fileModel from '../models/fileModel.js';
import mongoose from 'mongoose';
import path from 'path';
import fs from 'fs';



export const uploadFile = async (req, res) => {
    const fileObj = {
      fileName: req.file.originalname,
      filePath: req.file.path.replace(/\\/g, '/'),
    };
    try {
      const result = await fileModel.create(fileObj);
      // console.log(result);

      const fileURL=  `http://localhost:5000/result/${result._id}`;

      const fileId = result._id.toString(); // Extract the ID as a string
      res.status(200).json({ path: fileURL, fileId });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  };




    export const downloadFile = async (req, res) => {
        try {
          const fileId = req.params.fileId;
      
          if (!mongoose.isValidObjectId(fileId)) {
            console.log('Invalid file ID:', fileId);
            return res.status(400).json({ message: 'Invalid file ID' });
          }
      
          // console.log('Valid file ID:', fileId);
      
          const file = await fileModel.findById(fileId);
      
          if (!file) {
            console.log('File not found:', fileId);
            return res.status(404).json({ message: 'File not found' });
          }
      
          file.downloadContent += 1;
          await file.save();
      
          const filePath = file.filePath;
          const absolutePath = path.resolve(filePath);
      
          // Check if the file exists
          if (!fs.existsSync(absolutePath)) {
            console.log('File not found at path:', absolutePath);
            return res.status(404).json({ message: 'File not found' });
          }
      
          // console.log('Downloading file:', file.fileName);
      
          res.download(absolutePath, file.fileName);
        } catch (error) {
          console.log(error);
          res.status(500).json({ message: 'Something went wrong' });
        }
      };
      
