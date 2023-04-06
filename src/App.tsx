import React from 'react';
import Header from 'components/header';
import Hero from 'components/hero';
import UsersSection from 'components/users-section';
import RegisterSection from 'components/register-section/RegisterSection';

const App: React.FC = () => {
  return (
    <>
      <Header />
      <Hero />
      <UsersSection />
      <RegisterSection />
    </>
  );
};

export default App;
