import { FC, useState, useRef, ChangeEvent, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo } from "@fortawesome/free-solid-svg-icons";
import videoUpload from "../../../lib/utility/videoUpload";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

interface CustomVideoFileInputProps {
  onChange: (file: File | null | string) => void;
  initialValue?: string;
  isRequired?: boolean;
}

export const CustomVideoFileInput: FC<CustomVideoFileInputProps> = ({
  onChange,
  initialValue,
  isRequired = false, // Default to false if not provided
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(initialValue || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialValue) {
      setVideoUrl(initialValue);
    }
  }, [initialValue]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file);
      handleUpload(file);
    } else {
      toast.error("Please select a valid video file");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file);
      handleUpload(file);
    } else {
      toast.error("Please select a valid video file");
    }
  };

  const handleUpload = async (file: File) => {
    setLoading(true);
    try {
      const newVideoUrl = await videoUpload(file, (progress) => {
        setUploadProgress(progress);
      });
      setLoading(false);
      setVideoUrl(newVideoUrl);
      onChange(newVideoUrl);
      toast.success("Video uploaded successfully");
    } catch (error) {
      setLoading(false);
      toast.error("Video upload failed");
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setVideoUrl(null);
    setUploadProgress(0);
    onChange(null);
  };

  return (
    <div
      className={`lg:h-80 border-dashed border-2 p-8 rounded-lg text-center ${
        isDragging ? `bg-blue-100 border-blue-500` : "bg-gray-100 border-gray-200"
      } ${isRequired ? "border-red-500" : ""}`} // Highlight if required
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {videoUrl ? (
        <div className="mt-4 lg:mt-0 relative">
          <div className="bg-white p-2 h-52 rounded-lg shadow-lg mb-2">
            <video
              src={videoUrl}
              className="w-full h-full object-contain"
              controls
            />
          </div>
          <button
            className="mt-4 bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClearFile}
            type="button"
          >
            Clear Video
          </button>
        </div>
      ) : selectedFile ? (
        <div className="mt-4 lg:mt-0 relative">
          <div className="bg-white p-2 h-52 rounded-lg shadow-lg mb-2">
            <video
              src={URL.createObjectURL(selectedFile)}
              className="w-full h-full object-contain"
              controls
            />
            <p className="truncate text-xs mt-3">{selectedFile.name}</p>
          </div>
          {loading && (
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-white bg-opacity-50 rounded-lg">
              <ClipLoader color="#000000" />
              <p className="mt-2">{uploadProgress.toFixed(2)}%</p>
            </div>
          )}
          <button
            className="mt-4 bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClearFile}
            type="button"
          >
            Clear File
          </button>
        </div>
      ) : (
        <div className="lg:mt-16">
          <div className="flex justify-center">
            <FontAwesomeIcon icon={faVideo} size="3x" className="text-gray-400" />
          </div>
          <p className="text-sm text-gray-400 my-2">
            Drag and drop a video here, or click to upload
          </p>
          <button
            type="button"
            className="bg-zinc-200 text-blue-600 text-sm font-semibold py-2 px-4 rounded"
            onClick={handleButtonClick}
          >
            Upload Video
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="video/*"
            className="hidden"
          />
          <p className="text-xs leading-5 p-1 text-gray-400">
            MP4, WebM, OGG up to 100MB
          </p>
        </div>
      )}
    </div>
  );
};
