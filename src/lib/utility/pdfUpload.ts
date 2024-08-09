import axios from 'axios';

export const PdfUpload = async (file: File) => {
    const preset_key = import.meta.env.VITE_REACT_APP_PRESET_KEY;
    const cloud_name = import.meta.env.VITE_REACT_APP_CLD_USER_NAME;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', preset_key);

    try {
        console.log("Uploading PDF:", file.name);
        console.log("Cloud name:", cloud_name);
        console.log("Preset key:", preset_key);

        const res = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData);
        console.log("Cloudinary response:", res.data);

        const { format, secure_url } = res.data;
        console.log("Format:", format);
        console.log("Secure URL:", secure_url);

        if (format === 'pdf') {
            return secure_url;
        } else {
            console.error("Invalid file format:", format);
            return null;
        }
    } catch (error) {
        console.error('Error uploading PDF:', error);
        if (axios.isAxiosError(error) && error.response) {
            console.error('Cloudinary error response:', error.response.data);
        }
        throw error;
    }
};