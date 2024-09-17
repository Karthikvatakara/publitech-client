import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { URL } from '../../../common/api';
import { config } from '../../../common/configurations';
import { resultEntity } from '../../../interface/resultEntity';
import ExamCard from '../../../components/exam/ExamCard';
import { Player } from '@lottiefiles/react-lottie-player';


function ExamsUser() {
    const [results, setResults] = useState<resultEntity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        getResults();
    }, [])

    const getResults = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${URL}/api/course/results`, config);
            setResults(response?.data?.data);
        } catch (err) {
            setError('Failed to fetch exam results. Please try again later.');
            console.error("Error fetching results:", err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return <div className="text-center py-10">
             <Player
                autoplay
                loop
                src="https://lottie.host/9606a518-e28e-47af-b63b-26f1de6ecf13/lTWeXJsxSL.json"
                style={{ height: '100px', width: '100px' }}
                />
        </div>;
    }

    if (error) {
        return <div className="text-center py-10 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 ">Your Exam Results</h1>
            {results.length === 0 ? (
                <>
                <Player
                    autoplay
                    loop
                    src="https://lottie.host/f1f86a63-e042-4e92-8f92-8eba70f38a69/2pzqd7M4BA.json"
                    style={{ height: '250px', width: '250px' }}
                />
                <p className="text-center text-gray-500 font-bold ">No exam results found.</p>
                </>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map((result) => (
                        <ExamCard
                            key={result._id}
                            title={result.assessmentRef.title}
                            score={result.score}
                            totalScore={result.totalScore}
                            isPassed={result.isPassed}
                            resultData ={result}
                            createdAt={result.createdAt}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ExamsUser