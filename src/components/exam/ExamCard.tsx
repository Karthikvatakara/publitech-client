import React,{ useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { config } from '../../common/configurations';
import { URL } from '../../common/api';

const ExamCard = ({ title, score, totalScore, isPassed, resultData, createdAt }) => {

    const [certificateUrl, setCertificateUrl] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleExamSubmit = (id:string) => {
        navigate(`/student/exams/${id}`)
    }

    const generateAndDownloadCertificate = async() => {
        try{
            console.log(resultData?._id,"resultdata")
            const response = await axios.post(`${URL}/api/course/generate-certificate/${resultData?._id}`,
                {},
                {...config, responseType:'blob'}
            );
            
            
            const blob = new Blob([response.data],{ type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            setCertificateUrl(url);

              // Trigger download
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', `certificate-${resultData?._id}.pdf`);
              document.body.appendChild(link);
              link.click();
              link.parentNode?.removeChild(link);
        }catch(error){
            console.error("error generating certificate",error)
        }
    }

  const examDate = new Date(createdAt).toLocaleDateString();

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 m-4 w-full max-w-sm transition-transform duration-300 hover:scale-105">
      <div className="bg-gray-100 rounded-full p-4 mb-4 mx-auto w-20 h-20 flex items-center justify-center">
        {isPassed? 
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      :
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
</svg>}
        
      </div>
      <h3 className="text-xl font-bold text-center mb-2 text-gray-800">{title}</h3>
      <p className="text-center mb-2 text-gray-600">Score: {score} / {totalScore}</p>
      <p className="text-center mb-2 text-sm text-gray-500">Exam Date: {examDate}</p>
      <p className={`text-center font-bold mb-4 ${isPassed ? 'text-green-600' : 'text-red-600'}`}>
        {isPassed ? 'PASSED' : 'NOT PASSED'}
      </p>
      {isPassed ? (
        <button className="w-full bg-green-500 font-semibold text-white py-2 rounded-full hover:bg-green-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50" onClick={generateAndDownloadCertificate}>
          Download Certificate
        </button>
      ) : (
        <button className="w-full bg-yellow-500 font-semibold text-white py-2 rounded-full hover:bg-yellow-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50" onClick={()=> handleExamSubmit(resultData?.assessmentRef?._id)}>
          Retake Exam
        </button>
      )}
      {certificateUrl && (
                    <div className='flex justify-center p-2'>
                        <a 
                            href={certificateUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className='text-darkBlue underline'
                        >
                            View Certificate
                        </a>
                    </div>
                )}
    </div>
  );
};

export default ExamCard;