import axios from "axios";

const uploadFileAPI = async (file) => {
  try {
    const res = await axios.post("https://sharewithlink.onrender.com/upload", file);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export default uploadFileAPI;
