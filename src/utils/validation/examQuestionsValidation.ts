import * as Yup from 'yup';


export const examQuestionValidationSchema = Yup.object({
    question: Yup.string().required('Question is required'),
    options: Yup.array().of(
      Yup.object().shape({
        option: Yup.string().required('Option is required'),
      })
    ),
    answer: Yup.string()
      .required('Correct answer is required')
      .test('match-option', 'Answer must match one of the options', function (value) {
        const options = this.parent.options;
        return options.some(opt => opt.option === value);
      }),
  });
  