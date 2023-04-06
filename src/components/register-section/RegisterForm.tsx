import React, { useRef } from 'react';
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

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .email('Enter a valid email')
    .matches(
      /^([a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]{2,})+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      'The Email field can only contain Latin letters, numbers and signs, and at least 2 charachters before "@"'
    )
    .required('Email is a required field'),
  email: yup
    .string()
    .matches(/^[a-zA-Z0-9]/, 'Password must start with letter or number')
    .matches(
      /^([a-zA-Z0-9@.!#$%&’*+/=?^_`{|}~-])*$/,
      'Password must not contain spaces'
    )
    .min(6, 'Email is too short - should be 6 chars minimum')
    .max(30, 'Email must contain no more than 30 characters')
    .required('Email is a required field'),
  phone: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Phone confirmation is a required field'),
});

const RegisterForm: React.FC = () => {
  // const photoRef = useRef<HTMLInputElement>(null);

  const { data, isLoading, isSuccess, isFetching, isError, error } =
    useGetPositionsQuery();

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
        <label key={position.id}>
          <Field
            className={s.defaultRadio}
            type="radio"
            name="position"
            value={position.name}
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
        {({ isValid, touched, setFieldValue }) => {
          return (
            <Form name="RegisterForm" className={s.form}>
              <div className={s.fieldsWrapper}>
                <Field
                  className={
                    (!touched && !isValid) || (touched && isValid)
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
                    isValid ? `${s.label}` : `${s.label} ${s.label__invalid}`
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
                    (!touched && !isValid) || (touched && isValid)
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
                    isValid ? `${s.label}` : `${s.label} ${s.label__invalid}`
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
                    (!touched && !isValid) || (touched && isValid)
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
                    isValid ? `${s.label}` : `${s.label} ${s.label__invalid}`
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
                  accept="image/*"
                  // placeholder="Upload your photo"
                  autoComplete="off"
                  // onChange={formik.handleChange}
                  onChange={(e: any) => {
                    setFieldValue('photo', e.target.files[0]);
                  }}
                  // ref={photoRef}
                  hidden
                />
                <label className={s.customFileLoader} htmlFor="photo">
                  <div className={s.customFileLoader__fakeBtn}>Upload</div>
                  <div className={s.customFileLoader__fakePlaceholder}>
                    Upload your photo
                  </div>
                </label>

                {/* <button
                  onClick={() => {
                    photoRef.current?.click();
                  }}
                >
                  Upload
                </button> */}
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
