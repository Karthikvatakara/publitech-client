import React from 'react';
import { Field, ErrorMessage, useFormikContext } from 'formik';
// import CustomVideoFileInput from '../../../components/common/filesUpload/CustomVideoFileInput';
import CustomSinglePdfUpload from '../../../components/common/filesUpload/CustomSinglePdfUpload';
import CustomSingleFileImage from '../../../components/common/filesUpload/CustomSingleFileImage';
import { CustomVideoFileInput } from '../../../components/common/filesUpload/CustomVideoFileInput';

interface LessonFormProps {
  index: number;
  onDelete: (index: number) => void;
  isCurrentLesson: boolean;
}

const LessonForm: React.FC<LessonFormProps> = ({ index, onDelete, isCurrentLesson }) => {
  const { setFieldValue } = useFormikContext();

  return (
    <div className="mb-8 p-4 border rounded">
      <h2 className="text-xl font-semibold mb-4">Lesson {index + 1}</h2>
      <div className="flex flex-wrap mx-2">
        <div className="w-full md:w-1/2 px-2 mb-4 gap-3">
          <div className="mb-4">
            <CustomVideoFileInput
              onChange={(file) => setFieldValue(`lessons.${index}.video`, file)}
              isRequired={isCurrentLesson}
            />
            <ErrorMessage name={`lessons.${index}.video`} component="div" className="text-red-500" />
          </div>
          <CustomSinglePdfUpload
            onChange={(file) => setFieldValue(`lessons.${index}.attachments.url`, file)}
            // isRequired={isCurrentLesson}
          />
          <ErrorMessage name={`lessons.${index}.attachments.url`} component="div" className="text-red-500" />
        </div>
        <div className="w-full md:w-1/2 px-2 mb-4">
          <div className="mb-4">
            <CustomSingleFileImage
              onChange={(file) => setFieldValue(`lessons.${index}.thumbnail`, file)}
              // isRequired={isCurrentLesson}
            />
            <ErrorMessage name={`lessons.${index}.thumbnail`} component="div" className="text-red-500" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Lesson Title</label>
            <Field
              name={`lessons.${index}.title`}
              className="w-full p-2 border rounded"
              required={isCurrentLesson}
            />
            <ErrorMessage name={`lessons.${index}.title`} component="div" className="text-red-500" />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Lesson Description</label>
            <Field
              as="textarea"
              name={`lessons.${index}.description`}
              className="w-full p-2 border rounded"
              required={isCurrentLesson}
            />
            <ErrorMessage name={`lessons.${index}.description`} component="div" className="text-red-500" />
          </div>
        </div>
      </div>
      {index > 0 && (
        <button
          type="button"
          onClick={() => onDelete(index)}
          className="bg-red-500 text-white px-4 py-2 rounded mt-4"
        >
          Delete Lesson
        </button>
      )}
    </div>
  );
};

export default LessonForm;