import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const initialAccessToken = localStorage.getItem("token");

    if (initialAccessToken) {
      return { access_token: initialAccessToken };
    }
    return null;
  });


  const hasAuthenticated = isAuthenticated?.access_token;


  const login = (accessToken) => {
    if (accessToken) {
      if (accessToken) {
        localStorage.setItem("token", accessToken);
      }
      setIsAuthenticated(accessToken);
      sessionStorage.removeItem("chats");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
 
    setIsAuthenticated(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
      
        hasAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
