
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import { examQuestionValidationSchema } from '../../../utils/validation/examQuestionsValidation';

function QuestionForm({ questionNumber, totalQuestions, onNext, onPrevious, onSave }) {
  const [savedQuestions, setSavedQuestions] = useState([]);

  useEffect(() => {
    const savedQuestionsString:any = localStorage.getItem('examQuestions');
    if (savedQuestionsString && typeof savedQuestionsString === 'string') {
      try {
        const parsedQuestions = JSON.parse(savedQuestionsString);
        if (Array.isArray(parsedQuestions)) {
          setSavedQuestions(parsedQuestions);
        }
      } catch (error) {
        console.error('Error parsing saved questions:', error);
      }
    }
  }, [questionNumber,onNext,onPrevious]);

  
  const getInitialValues = () => {
    // console.log(questionNumber,"{{{{{{{{{{{{}}}}}}}}}}}}}}}::::::>>>>>><<<<<<<<<<<<<<")

    console.log("🚀 ~ getInitialValues ~ savedQuestions:", savedQuestions)
    if (savedQuestions.length > 0 && savedQuestions[questionNumber - 1]) {
      
      // console.log("1111111111111111111111111111111111111111")
      return savedQuestions[questionNumber - 1];
    } else {
      // console.log("2222222222222222222222222222222222222222222222")
      return {
        question: '',
        options: [{ option: '' }, { option: '' }, { option: '' }, { option: '' }],
        answer: '',
      };
    }
  };



  const handleSubmit = (values, { setSubmitting }) => {
    try {
      const updatedQuestions = [...savedQuestions];
      updatedQuestions[questionNumber - 1] = values;
      setSavedQuestions(updatedQuestions);
      localStorage.setItem('examQuestions', JSON.stringify(updatedQuestions));
    } catch (error) {
      console.error('Error saving question:', error);
    }

    if (questionNumber < totalQuestions) {
      onNext();
    } else {
      console.log("reached on onsave portion")
      onSave();
    }
    setSubmitting(false);
  };

  {console.log(getInitialValues(),'this is get initial values')}
  return (
    <Formik
      initialValues={getInitialValues()}
      validationSchema={examQuestionValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
      
    >
      {({ errors, touched }) => (
        <Form className="space-y-4">
                   <div>
             <label htmlFor="question" className="block font-medium mb-1">
               Question
             </label>
          <Field
              as="textarea"
              id="question"
              name="question"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                touched.question && errors.question ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {touched.question && errors.question && (
              <div className="text-red-500 text-sm mt-1">{errors.question}</div>
            )}
          </div>

          <FieldArray name="options">
            {() => (
              <div>
                {[0, 1, 2, 3].map((index) => (
                  <div key={index} className="mb-2">
                    <label
                      htmlFor={`options.${index}.option`}
                      className="block font-medium mb-1"
                    >
                      Option {index + 1}
                    </label>
                    <Field
                      type="text"
                      id={`options.${index}.option`}
                      name={`options.${index}.option`}
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        touched.options?.[index]?.option && errors.options?.[index]?.option
                          ? 'border-red-500'
                          : 'border-gray-300'
                      }`}
                    />
                    {touched.options?.[index]?.option && errors.options?.[index]?.option && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.options[index].option}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </FieldArray>

          <div>
            <label htmlFor="answer" className="block font-medium mb-1">
              Correct Answer
            </label>
            <Field
              type="text"
              id="answer"
              name="answer"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                touched.answer && errors.answer ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {touched.answer && errors.answer && (
              <div className="text-red-500 text-sm mt-1">{errors.answer}</div>
            )}
          </div>

          <div className="flex justify-between">
            {questionNumber > 1 && (
              <button
                type="button"
                onClick={onPrevious}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-medium py-2 px-4 rounded-md"
              >
                Previous
              </button>
            )}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md"
            >
              {questionNumber === totalQuestions ? 'Save Exam' : 'Next Question'}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default QuestionForm;


