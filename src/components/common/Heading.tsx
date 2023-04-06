import React from 'react';
import s from './Heading.module.scss';

interface IHeading {
  children: string;
}

const Heading: React.FC<IHeading> = ({ children }) => {
  return <h1 className={s.heading}>{children}</h1>;
};

export default Heading;
