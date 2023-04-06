import React from 'react';

import Heading from 'components/common/Heading';
import { ReactComponent as SuccessImage } from 'images/success-image.svg';

const SuccessMessage: React.FC = () => {
  return (
    <>
      <Heading>User successfully registered</Heading>
      <SuccessImage width={328} height={290} />
    </>
  );
};

export default SuccessMessage;
