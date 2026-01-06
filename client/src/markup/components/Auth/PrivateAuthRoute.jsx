// Import React, the useState and useEffect hooks 
import React, { useState, useEffect } from "react";
// Import the Route and Navigate components  
import { Navigate } from "react-router";
// Import the Util function we created to handle the reading from the local storage 
import getAuth from '../../../util/auth';

const PrivateAuthRoute = ({ roles, children }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  useEffect(() => {
    const checkAuth = async () => {
      const loggedInEmployee = await getAuth();
      
      console.log('PrivateAuthRoute - Auth Data:', loggedInEmployee);
      console.log('PrivateAuthRoute - Required Roles:', roles);
      
      if (loggedInEmployee.employee_token) {
        setIsLogged(true);
        
        // Check authorization using company_role_id
        const userRole = loggedInEmployee.company_role_id || loggedInEmployee.employee_role;
        console.log('PrivateAuthRoute - User Role:', userRole);
        
        if (roles && roles.length > 0) {
          if (roles.includes(userRole)) {
            setIsAuthorized(true);
            console.log('PrivateAuthRoute - AUTHORIZED');
          } else {
            console.log('PrivateAuthRoute - NOT AUTHORIZED');
          }
        } else {
          // No specific roles required, just need to be logged in
          setIsAuthorized(true);
        }
      } else {
        console.log('PrivateAuthRoute - NOT LOGGED IN');
      }
      
      setIsChecked(true);
    };
    
    checkAuth();
  }, [roles]);
  
  if (!isChecked) {
    return <div>Loading...</div>;
  }
  
  if (!isLogged) {
    console.log('PrivateAuthRoute - Redirecting to /login');
    return <Navigate to="/login" />;
  }
  
  if (!isAuthorized) {
    console.log('PrivateAuthRoute - Redirecting to /unauthorized');
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateAuthRoute;