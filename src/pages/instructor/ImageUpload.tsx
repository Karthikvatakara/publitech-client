import axios from 'axios';
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { Circles } from 'react-loader-spinner'; // Import Circles

const ImageUpload: React.FC = () => {
  const [ img, setImg ] = useState<File | null>(null);
  const [ video, setVideo ] = useState<File | null>(null);
  const [ loading, setLoading ] = useState<boolean>(false);

  const uploadFile = async (type: string): Promise<string | null> => {
    const data = new FormData();
    if (type === "image" && img) {
      data.append("file", img);
      data.append("upload_preset", "images_preset");
    } else if (type === "video" && video) {
      data.append("file", video);
      data.append("upload_preset", "videos_preset");
    } else {
      return null;
    }

    try {
      setLoading(true);
      const cloudName = "dozwnxgav";
      const resourceType = type === "image" ? "image" : "video";
      const api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;
      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log(secure_url);
      return secure_url;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("handlesubmit");

    try {
      const imageUrl = await uploadFile("image");
      const videoUrl = await uploadFile("video");

      console.log("Image URL:", imageUrl);
      console.log("Video URL:", videoUrl);
      setImg(null);
      setVideo(null);
      setLoading(false)
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImg(e.target.files[0]);
    }
  };

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideo(e.target.files[0]);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="video">Video</label>
        <br />
        <input 
          type="file" 
          accept="video/*" 
          id="video" 
          onChange={handleVideoChange}  
        />
        <br />
        <div>
          <label htmlFor="img">Image</label>
          <input 
            type="file"
            accept="image/*"
            onChange={handleImageChange} 
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ?  "Uploading...": "Upload"}
        </button>
      </form>
      {loading && (
        <div className="flex justify-center items-center mt-4">
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
