import { useContext } from 'react';
import AuthProvider, { AuthContext } from '../context/AuthProvider';

const useAuth = () => {
  const context = useContext(AuthProvider);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};

export default useAuth;
