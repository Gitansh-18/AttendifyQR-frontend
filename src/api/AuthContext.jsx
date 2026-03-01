import { createContext, useContext, useState } from 'react';
import api from './axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [teacher, setTeacher] = useState(
    JSON.parse(localStorage.getItem('teacher'))
  );

  const login = async (email, password) => {
    const res = await api.post('/api/auth/login', { email, password });

    const { token, teacher } = res.data;

    localStorage.setItem('token', token);
    localStorage.setItem('teacher', JSON.stringify(teacher));

    setTeacher(teacher);
  };

  const signup = async (name, email, password) => {
    const res = await api.post('/api/auth/signup', { name, email, password });

    const { token } = res.data;
    const teacher = res.data.teacher ?? res.data.user;

    localStorage.setItem('token', token);
    localStorage.setItem('teacher', JSON.stringify(teacher));

    setTeacher(teacher);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('teacher');
    setTeacher(null);
  };

  return (
    <AuthContext.Provider value={{ teacher, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};