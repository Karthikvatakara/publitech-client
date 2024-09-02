import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../../../common/api';
import { config } from '../../../common/configurations';
import { Player } from '@lottiefiles/react-lottie-player';
import { useNavigate } from 'react-router-dom';

function ExamResultPage() {
    const { resultId } = useParams();
    const [examResult, setExamResult] = useState<any>(null);
    const [certificateUrl, setCertificateUrl] = useState<string | null>(null);
    const navigate = useNavigate();
    const location = useLocation();
    const courseId = location.state?.courseId;

    useEffect(() => {
        getExamResult();

        const handlePopState = (event: PopStateEvent) => {
            event.preventDefault();
            if (examResult?.assessmentRef?.courseId) {
                navigate(`/student/courses/preview/${examResult?.assessmentRef?.courseId}`);
            } else {
                navigate('/student/courses'); // Fallback to course list if courseId is not available
            }
        };

        window.history.pushState(null, '', window.location.pathname);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [courseId]);

    const getExamResult:any = async () => {
        try {
            console.log("reached in getexam reuslt");
            const response = await axios.get(`${URL}/api/course/examresult/${resultId}`, config);
            
            setExamResult(response?.data?.data);
        } catch (error) {
            console.error("Error fetching exam result:", error);
        }
    };

    const generateAndDownloadCertificate = async() => {
        try{
            const response = await axios.post(`${URL}/api/course/generate-certificate/${resultId}`,
                {},
                {...config, responseType:'blob'}
            );
            
            const blob = new Blob([response.data],{ type: 'application/pdf'});
            const url = window.URL.createObjectURL(blob);
            setCertificateUrl(url);

              // Trigger download
              const link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', `certificate-${resultId}.pdf`);
              document.body.appendChild(link);
              link.click();
              link.parentNode?.removeChild(link);
        }catch(error){
            console.error("error generating certificate",error)
        }
    }
    if (!examResult) return <div className="flex justify-center items-center h-screen">Loading...</div>;

    return (
        <div className=" grid grid-cols-12 items-center p-20 ">
            <div className='grid col-span-6'>
                { examResult.isPassed ?
                <Player
                autoplay
                loop
                src="https://lottie.host/793b3f08-4295-42ab-a89c-c90450761d3a/ouZG9vMnYf.json"
                style={{ height: '300px', width: '400px' }}
             />:
             <Player
                        autoplay
                        loop
                        src="https://lottie.host/d6359d88-aa0a-48c2-8f3b-065d0bd45595/xuBBOnrD8z.json"
                        style={{ height: '320px', width: '320px' }}
                     />}
            </div>
            <div className=" col-span-6 grid bg-white rounded-lg shadow-lg p-8 max-w-md w-full border border-shadow">
                <h2 className="text-3xl font-bold mb-6 text-center text-darkBlue">Exam Result</h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-semibold">Score:</span>
                        <span className="text-2xl font-bold">{examResult.score} / {examResult.totalScore}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-gray-600 font-semibold">Status:</span>
                        <span className={`text-xl font-bold ${examResult.isPassed ? 'text-green-500' : 'text-red-500'}`}>
                            {examResult.isPassed ? 'Passed' : 'Failed'}
                        </span>
                    </div>
                    <div className="border-t border-gray-200 pt-4 mt-4">
                        <p className="text-center text-gray-600 font-semibold">
                            {examResult.isPassed 
                                ? "Congratulations! You have successfully passed the exam."
                                : "Unfortunately, you did not pass the exam. Keep practicing and try again!"}
                        </p>
                        {examResult.isPassed ? 
                        <>
                        <div className='flex justify-center p-2'>
                        <button className='bg-darkBlue p-2 text-white font-semibold rounded-l'onClick={generateAndDownloadCertificate}>
                             Download Certicate
                        </button>
                        </div>
                        </>
                        :
                        null}
                    </div>
                </div>
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
        </div>
    );
}

export default ExamResultPage;