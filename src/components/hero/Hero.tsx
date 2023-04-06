import React from 'react';

// import Container from 'components/container';
import s from './Hero.module.scss';
// import Heading from 'components/common/Heading';

const Hero: React.FC = () => {
  return (
    <section className={s.hero}>
      {/* <Container> */}
      <div className={s.hero__contentWrapper}>
        <h1>Test assignment for front-end developer</h1>
        <p className={s.hero__text}>
          What defines a good front-end developer is one that has skilled
          knowledge of HTML, CSS, JS with a vast understanding of User design
          thinking as they'll be building web interfaces with accessibility in
          mind. They should also be excited to learn, as the world of Front-End
          Development keeps evolving.
        </p>
        <button className={s.hero__btn}>Sign up</button>
      </div>

      {/* </Container> */}
    </section>
  );
};

export default Hero;
