// Function to read the data from the user's local storage  
const getAuth = async () => {
  const tokenString = localStorage.getItem('employee_token');
  const employeeString = localStorage.getItem('employee');
  
  if (!tokenString || !employeeString) {
    return {};
  }

  try {
    const employee = JSON.parse(employeeString);
    const decodedToken = decodeTokenPayload(tokenString);
    
    // Merge token data with stored employee data
    return {
      ...employee,
      employee_token: tokenString,
      employee_role: decodedToken.employee_role || decodedToken.company_role_id,
      company_role_id: decodedToken.company_role_id,
      employee_id: decodedToken.employee_id,
      employee_first_name: decodedToken.employee_first_name,
    };
  } catch (error) {
    console.error('Error parsing auth data:', error);
    return {};
  }
};
const decodeTokenPayload = (token) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
      .join('')
  );
  return JSON.parse(jsonPayload);
};

export default getAuth;