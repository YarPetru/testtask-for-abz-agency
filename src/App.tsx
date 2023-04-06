import React, { useEffect } from 'react';
import Header from 'components/header';
import Hero from 'components/hero';
import UsersSection from 'components/users-section';
import RegisterSection from 'components/register-section/RegisterSection';
import { useGetTokenQuery } from 'store/usersApi';

const App: React.FC = () => {
  useGetTokenQuery();
  // useEffect(() => {

  // }, []);

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
