"use client"

import React, { createContext, useState } from 'react';
import Cookies from 'js-cookie';

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [userType, setUserType] = useState(() => {
    // Read the userType from the cookie when the component mounts
    const storedUserType = Cookies.get('userType');
    return storedUserType || '';
  });

  const setuser = (type) => {
    setUserType(type);
    // Store the userType in the cookie
    Cookies.set('userType', type);
  };

  // console.log('from context', userType);

  return (
    <UserContext.Provider value={{ userType, setuser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
