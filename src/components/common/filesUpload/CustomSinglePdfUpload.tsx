import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import { BsFileEarmarkPdfFill } from "react-icons/bs";
import { PdfUpload } from "../../../lib/utility/pdfUpload";
import toast from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

interface CustomSinglePdfInputProps {
  onChange: (file: File | string | null) => void;
  initialValue?: string;
}

const CustomSinglePdfUpload: React.FC<CustomSinglePdfInputProps> = ({
  onChange,
  initialValue,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialValue || null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (initialValue) {
      setPreviewUrl(initialValue);
    }
  }, [initialValue]);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      await handleFileUpload(file);
    } else {
      toast.error("Please upload a PDF file");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file && file.type === 'application/pdf') {
      await handleFileUpload(file);
    } else {
      toast.error("Please upload a PDF file");
    }
  };

  const handleFileUpload = async (file: File) => {
    setLoading(true);
    setSelectedFile(file);
    try {
      console.log("Starting PDF upload...");
      console.log("File details:", file.name, file.size, file.type);
      
      const pdfUrl = await PdfUpload(file);
      
      console.log("PDF upload result:", pdfUrl);
      
      if (!pdfUrl) {
        throw new Error("PDF upload failed: No URL returned");
      }
      
      setPreviewUrl(pdfUrl);
      onChange(pdfUrl);
      console.log("PDF upload successful");
      toast.success("PDF uploaded successfully");
    } catch (error) {
      console.error("Error uploading PDF:", error);
      if (error instanceof Error) {
        toast.error(`PDF upload failed: ${error.message}`);
      } else {
        toast.error("PDF upload failed: Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    onChange(null);
  };

  return (
    <div
      className={`lg:h-80 border-dashed border-2 p-8 rounded-lg text-center ${
        isDragging ? `bg-blue-100 border-blue-500` : "bg-gray-100 border-gray-200"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {previewUrl ? (
        <div className="mt-4 lg:mt-0 relative">
          <div className="bg-white p-2 h-52 rounded-lg shadow-lg mb-2">
            <iframe
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(previewUrl)}&embedded=true`}
              title="PDF preview"
              className="w-full h-full rounded"
            />
            <p className="truncate text-xs mt-3">Uploaded PDF</p>
          </div>
          {loading && (
            <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 rounded-lg">
              <ClipLoader color="#000000" />
            </div>
          )}
          <button
            className="mt-4 bg-gray-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleClearFile}
            type="button"
          >
            Clear File
          </button>
          <a 
            href={previewUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="ml-4 text-blue-500 hover:underline"
          >
            Download PDF
          </a>
        </div>
      ) : (
        <div className="lg:mt-16">
          <div className="flex justify-center">
            <BsFileEarmarkPdfFill size={48} className="text-gray-400" />
          </div>
          <p className="text-sm text-gray-400 my-2">
            Drag and drop a PDF here, or click to upload
          </p>
          <button
            type="button"
            className="bg-zinc-200 text-blue-600 text-sm font-semibold py-2 px-4 rounded"
            onClick={handleButtonClick}
          >
            Upload PDF
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="application/pdf"
            className="hidden"
          />
          <p className="text-xs leading-5 p-1 text-gray-400">
            PDF files up to 10MB
          </p>
        </div>
      )}
    </div>
  );
};

export default CustomSinglePdfUpload;