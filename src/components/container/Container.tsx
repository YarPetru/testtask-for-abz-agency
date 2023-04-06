import React, { ReactNode } from 'react';
import s from './Container.module.scss';

interface IContainer {
  children: ReactNode;
}

const Container: React.FC<IContainer> = ({ children }) => {
  return <div className={s.container}>{children}</div>;
};

export default Container;
