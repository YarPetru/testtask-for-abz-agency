import React from 'react';

import userPicDefault from 'images/photo-cover.svg';
import s from './UserCard.module.scss';

interface IUserCard {
  name: string;
  email: string;
  phone: string;
  position: string;
  photo?: string;
}

const UserCard: React.FC<IUserCard> = ({
  name,
  email,
  phone,
  position,
  photo,
}) => {
  return (
    <div className={s.cardWrapper}>
      <img
        className={s.userPhoto}
        src={!!photo ? photo : userPicDefault}
        alt="user portret"
        width="70"
        height="70"
      />
      <p className={s.userDetails}>{name}</p>
      <div className={s.contactsWrapper}>
        <p className={s.userDetails}>{position}</p>
        <p className={s.userDetails}>{email}</p>
        <p className={s.userDetails}>{phone}</p>
      </div>
    </div>
  );
};

export default UserCard;
