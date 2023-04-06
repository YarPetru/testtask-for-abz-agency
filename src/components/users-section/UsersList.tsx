import React, { useState } from 'react';
import UserCard from './UserCard';

import s from './UsersList.module.scss';
import { useGetUsersQuery } from 'store';
const UsersList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [count, setCount] = useState<number>(6);

  const { data } = useGetUsersQuery({ page: currentPage, count });

  const handleShowMoreClick = () => {
    if (data?.total_pages && currentPage < data?.total_pages - 1) {
      setCurrentPage(prev => prev + 1);
    } else if (data?.total_pages && currentPage === data?.total_pages - 1) {
      setCurrentPage(prev => prev + 1);
      setCount(prev => data?.total_users! % prev);
    } else return null;
  };

  return (
    <>
      {data?.users?.length !== 0 && (
        <div className={s.usersListWrapper}>
          <ul className={s.usersList}>
            {data?.users?.map(user => {
              return (
                <UserCard
                  key={user.id}
                  name={user.name}
                  email={user.email}
                  phone={user.phone}
                  position={user.position}
                  photo={user.photo}
                />
              );
            })}
          </ul>
          {currentPage !== data?.total_pages ? (
            <button className={s.users__button} onClick={handleShowMoreClick}>
              Show more
            </button>
          ) : null}
        </div>
      )}
    </>
  );
};

export default UsersList;
