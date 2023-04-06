import React from 'react';
import Container from 'components/container/Container';
import Heading from 'components/common/Heading';
import UsersList from './UsersList';

const UsersSection: React.FC = () => {
  return (
    <section id="users">
      <Container>
        <Heading>Working with GET request</Heading>
        <UsersList />
      </Container>
    </section>
  );
};

export default UsersSection;
