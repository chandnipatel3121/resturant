import React, { useEffect } from 'react';
import MenuSection from '../sections/MenuSection';
import { useNav } from '../utils/NavContext';

const Menu = () => {
  const { setNavTheme } = useNav();
  useEffect(() => {
    setNavTheme('green');
    window.scrollTo(0, 0);
  }, [setNavTheme]);

  return <MenuSection />;
};

export default Menu;
