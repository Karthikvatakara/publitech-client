import axios, { AxiosProgressEvent } from "axios";

const videoUpload = async (video: File, onProgress: (progress: number) => void) => {
  const preset_key = import.meta.env.VITE_REACT_APP_VIDEO_PRESET_KEY;
  const cloud_name = import.meta.env.VITE_REACT_APP_CLD_USER_NAME;
  const apiUrl = `https://api.cloudinary.com/v1_1/${cloud_name}/video/upload`;

  try {
    const formData = new FormData();
    formData.append('file', video);
    formData.append('upload_preset', preset_key);

    const response = await axios.post(apiUrl, formData, {
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.total) {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          onProgress(percentCompleted);
        }
      },
    });

    console.log("Upload complete. Response:", response.data);
    return response.data.secure_url;
  } catch (error) {
    console.error('Error uploading video:', error);
    if (axios.isAxiosError(error)) {
      console.error('Error response:', error.response?.data);
      console.error('Error status:', error.response?.status);
    }
    throw new Error((error as Error)?.message);
  }
};

export default videoUpload;