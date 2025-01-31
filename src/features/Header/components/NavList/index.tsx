import React from 'react';
import { navigationList } from '@/types';

import './index.scss';

const NavList = () => {
  return (
    <ul className="navigation-list">
      {navigationList.map((el, index) => (
        <li key={index} className="navigation-list__item">
          {el}
          {index != 0 ? <span className="navigation-list__item-decoration"></span> : ''}
        </li>
      ))}
    </ul>
  );
};

export default NavList;
