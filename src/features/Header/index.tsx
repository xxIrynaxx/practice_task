import React from 'react';
import NavList from './components/NavList';
import AuthBlock from './components/AuthBlock';

import './index.scss';

const Header = () => {
  return (
    <div className="header">
      <img className="header__logo" src="/assets/icon/logo.svg" alt="Logo" />
      <NavList />
      <AuthBlock />
    </div>
  );
};

export default Header;
