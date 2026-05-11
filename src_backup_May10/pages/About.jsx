import React, { useEffect } from 'react';
import AboutSection from '../sections/AboutSection';
import { useNav } from '../utils/NavContext';

const About = () => {
  const { setNavTheme } = useNav();
  useEffect(() => {
    setNavTheme('green');
  }, [setNavTheme]);

  return <AboutSection />;
};

export default About;
