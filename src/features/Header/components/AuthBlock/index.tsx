import React from 'react';

import './index.scss';

const AuthBlock = () => {
  return (
    <div className="authblock">
      <button className="authblock__reg-btn">Registration</button>
      <span className="authblock__line"></span>
      <button className="authblock__login-btn">
        Login<span className="authblock__triangle"></span>
      </button>
    </div>
  );
};

export default AuthBlock;
