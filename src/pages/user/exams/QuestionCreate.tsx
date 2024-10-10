import  { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import QuestionForm from './QuestionForm';
import axios from 'axios';
import { URL } from '../../../common/api';
import { config } from '../../../common/configurations';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import toast from 'react-hot-toast';

function QuestionCreate() {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const navigate = useNavigate();
  const { user } = useSelector(( state: RootState) =>state.user)
  const { examId } = useParams();
  

  useEffect(() => {
    const examData = JSON.parse(localStorage.getItem('examData') || '{}');
    setTotalQuestions(examData.numQuestions || 0);
  }, []);

  const handleNext = () => {
    setCurrentQuestion(prev => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentQuestion(prev => prev - 1);
  };

  const handleSave = async() => {
   
    const questions = JSON.parse(localStorage.getItem('examQuestions') || '[]');
    const examData = JSON.parse(localStorage.getItem('examData') || '[]');

    const restValues = examData;
    const instructorId = user._id;
    const totalScore = totalQuestions * examData.questionScore
    const dataToSave = { ...restValues, questions, instructorId, totalScore } 
    console.log("🚀 ~ handleSave ~ dataToSave:", dataToSave)
    // console.log("🚀 ~ handleSave ~ dataToSave:", dataToSave)
    
    try{
      if(examId) {
        const { questions, numQuestions } = dataToSave;
        if(questions.length > numQuestions ) {
          dataToSave.questions = questions.slice(0,numQuestions);
        }
        console.log(dataToSave,examId,"in the handlesubmit in the questioncreate")
        const response = await axios.put(`${URL}/api/course/exams/update/${examId}`,dataToSave,config);
        console.log("🚀 ~ handleSave ~ response:", response)
      }else{
        const response = await axios.post(`${URL}/api/course/createExam`,dataToSave, config)
        toast.success('Exam created successfully');
        console.log("🚀 ~ handleSave ~ response:", response)
      }
          // Clear localStorage after saving
    localStorage.removeItem('examData');
    localStorage.removeItem('examQuestions');
    
    // Navigate back to exam list or dashboard
    navigate('/instructor/exams');
    }catch(error){

    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center mb-6">Question {currentQuestion}</h1>
        <QuestionForm
         key={currentQuestion}
          questionNumber={currentQuestion}
          totalQuestions={totalQuestions}
          onNext={handleNext}
          onPrevious={handlePrevious}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}

export default QuestionCreate;