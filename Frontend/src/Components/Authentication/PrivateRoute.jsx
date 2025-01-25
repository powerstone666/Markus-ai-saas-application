import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { Context } from '../../main';

const PrivateRoute = ({ children }) => {
  const { token } = useContext(Context);
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
