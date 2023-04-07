import React, { useState } from 'react';
import { Formik, Form, ErrorMessage, Field } from 'formik';
import * as yup from 'yup';

import Heading from 'components/common/Heading';
import s from './RegisterForm.module.scss';
import { useGetPositionsQuery } from 'store';

const initialValues = {
  name: '',
  email: '',
  phone: '',
  position: '',
  photo: null,
};

const MAX_PHOTO_SIZE = 5242880;

const emailRegEx =
  /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

const phoneRegEx = /^[\+]{0,1}380([0-9]{9})$/;

// const validFileExtensions = { image: ['jpg', 'jpeg'] };

// const isValidFileType = (fileName: string, fileType: string) => {
//   return (
//     fileName &&
//     validFileExtensions[fileType as keyof { image: ['jpg', 'jpeg'] }].indexOf(
//       fileName.split('.').pop()!
//     ) > -1
//   );
// };

interface IForm {
  name?: string;
  email?: string;
  phone?: string;
  position?: number;
  photo?: File;
}
// const validationSchema: yup.Schema<IForm> = yup.object().shape({

const validationSchema: yup.Schema<IForm> = yup.object().shape({
  name: yup
    .string()
    .min(2, 'Name is too short - should be 2 chars minimum')
    .max(60, 'Name is too long - no more than 60 chars')
    .required('Name is a required field'),
  email: yup
    .string()
    .min(2, 'Email is too short - should be 2 chars minimum')
    .max(100, 'Email is too long - no more than 60 chars')
    .email('Enter a valid email')
    .matches(emailRegEx, 'Email must be a valid according to RFC2822')
    .required('Email is a required field'),
  phone: yup
    .string()
    .matches(phoneRegEx, 'Phone should be 13 chars and start with +380')
    .required('Phone is a required field'),
  position: yup.number().integer().min(1).required('Choose the position'),
  photo: yup
    .mixed<File>()
    // .test('is-valid-type', 'Not a valid image type', value =>
    //   isValidFileType(value && value.name.toLowerCase(), 'image')
    // )
    .test(
      'is-valid-size',
      'Max allowed size is 5MB',
      value => value && value.size <= MAX_PHOTO_SIZE
    ),
});

const RegisterForm: React.FC = () => {
  const { data, isLoading, isSuccess, isFetching, isError, error } =
    useGetPositionsQuery();

  const [uploadedFileName, setUploadedFileName] = useState<string>('');

  const handleSubmit = (values: any, actions: any) => {
    console.log(values);
  };

  let renderedPositions: React.ReactNode;

  if (isLoading) {
    renderedPositions = <p>Loading...</p>;
    // renderedContent = <Skeleton times={10} />;
  } else if (isError && error instanceof Error) {
    renderedPositions = <p>{error.message}</p>;
    // renderedPositions = <ErrorMessage message={error.message!} />;
  } else if (isSuccess) {
    renderedPositions = data.positions?.map(position => {
      return (
        <label htmlFor={position.name} key={position.id}>
          <Field
            className={s.defaultRadio}
            type="radio"
            name="position"
            value={String(position.id)}
            id={position.name}
          />
          {position.name}
        </label>
      );
    });
  }

  return (
    <>
      <Heading>Working with POST request</Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, touched, setFieldValue, errors, values }) => {
          return (
            <Form name="RegisterForm" className={s.form}>
              <div className={s.fieldsWrapper}>
                <Field
                  className={
                    (!touched && errors.name) || (touched && !errors.name)
                      ? `${s.field}`
                      : `${s.field} ${s.field__invalid}`
                  }
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  autoComplete="off"
                />
                <label
                  className={
                    !errors.name
                      ? `${s.label}`
                      : `${s.label} ${s.label__invalid}`
                  }
                  htmlFor="name"
                >
                  Your name
                </label>
                <ErrorMessage
                  name="name"
                  component="div"
                  className={s.validationError}
                />
              </div>

              <div className={s.fieldsWrapper}>
                <Field
                  className={
                    (!touched && errors.email) || (touched && !errors.email)
                      ? `${s.field}`
                      : `${s.field} ${s.field__invalid}`
                  }
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Email"
                  autoComplete="off"
                />
                <label
                  className={
                    !errors.email
                      ? `${s.label}`
                      : `${s.label} ${s.label__invalid}`
                  }
                  htmlFor="email"
                >
                  Email
                </label>
                <ErrorMessage
                  name="email"
                  component="div"
                  className={s.validationError}
                />
              </div>

              <div className={s.fieldsWrapper}>
                <Field
                  className={
                    (!touched && errors.phone) || (touched && !errors.phone)
                      ? `${s.field}`
                      : `${s.field} ${s.field__invalid}`
                  }
                  id="phone"
                  name="phone"
                  type="text"
                  placeholder="Phone"
                  autoComplete="off"
                />
                <label
                  className={
                    !errors.phone
                      ? `${s.label}`
                      : `${s.label} ${s.label__invalid}`
                  }
                  htmlFor="phone"
                >
                  Phone
                </label>
                <ErrorMessage
                  name="phone"
                  component="div"
                  className={s.validationError}
                />
              </div>

              <div className={`${s.fieldsWrapper} ${s.selectWrapper}`}>
                <div id="positions-group" className={s.selectLabel}>
                  Select your position
                </div>
                <div
                  className={s.radioBtnsWrapper}
                  role="group"
                  aria-labelledby="positions-group"
                >
                  {renderedPositions}

                  {isFetching && <p>Fetching...</p>}
                </div>
                <ErrorMessage
                  name="position"
                  component="div"
                  className={s.validationError}
                />
              </div>

              <div className={s.fieldsWrapper}>
                <input
                  className={s.field}
                  id="photo"
                  type="file"
                  accept="image/jpeg, image/jpg"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.target.files) {
                      setFieldValue('photo', e.target.files[0]);
                      setUploadedFileName(e.target.files[0].name);
                    }
                  }}
                  hidden
                />
                <label className={s.customFileLoader} htmlFor="photo">
                  <div className={s.customFileLoader__fakeBtn}>Upload</div>
                  <div className={s.customFileLoader__fakePlaceholder}>
                    {!!values.photo
                      ? `Photo "${uploadedFileName.slice(0, 7)}..." uploaded`
                      : 'Upload your photo'}
                  </div>
                </label>

                <ErrorMessage
                  name="photo"
                  component="div"
                  className={s.validationError}
                />
              </div>

              <button
                type="submit"
                disabled={
                  (!touched.email &&
                    !touched.name &&
                    !touched.phone &&
                    !touched.photo) ||
                  !isValid
                }
                className={s.submitBtn}
              >
                Sign up
                {/* {isFetchingUser ? 'Loading...' : 'Sign up'} */}
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default RegisterForm;
