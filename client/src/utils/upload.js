import axios from "axios";

const upload = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "doWork");

    try {
        // const res = await axios.post(import.meta.env.VITE_UPLOAD_LINK, data);
        // const res = await axios.post(import.meta.env.CLOUDINARY_UPLOAD_LINK, data);
        const res = await axios.post("https://api.cloudinary.com/v1_1/dyvulcqc2/image/upload", data);
        const { url } = res.data;
        return url;
    } catch (err) {
        // ==========================================================================
        // CORRECT THIS
        console.log(err);
        // console.log(err.response.data);
        // ==========================================================================
    }
};

export default upload;
