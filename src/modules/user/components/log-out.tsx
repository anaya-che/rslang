import React from 'react';
import { userState } from '../../../store';

export const LogOut: React.FC = () => {
  return (
    <>
      <button onClick={() => userState.logOut()}>Выйти</button>
    </>
  );
};
