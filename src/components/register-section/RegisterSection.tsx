import React from 'react';
import Container from 'components/container';
import RegisterForm from './RegisterForm';

import s from './RegisterSection.module.scss';
import SuccessMessage from './SuccessMessage';

const RegisterSection: React.FC = () => {
  return (
    <section id="signup" className={s.registerSection}>
      <Container>
        <RegisterForm />
        <SuccessMessage />
      </Container>
    </section>
  );
};

export default RegisterSection;
