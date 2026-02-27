import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [teacher, setTeacher] = useState(
    JSON.parse(localStorage.getItem('teacher'))
  );

  const login = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('teacher', JSON.stringify(data.teacher));
    setTeacher(data.teacher);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('teacher');
    setTeacher(null);
  };

  return (
    <AuthContext.Provider value={{ teacher, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};