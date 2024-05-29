import React, { useState, createContext, useContext } from 'react';
import { loginRequest, verifyTokenRequest } from '../api/auth.js';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe usarse dentro de AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState(null); // Agregar el estado para el rol del usuario
    const [authenticated, setAuthenticated] = useState(false);

    const login = async (credentials) => {
        setLoading(true);
        try {
          const user = await loginRequest(credentials);
          console.log("Respuesta de loginRequest:", user);
          console.log(user.data.token);
          // Guardar la cookie de autenticación en el localStorage
          localStorage.setItem("authToken", user.data.token);
      
          setUser(user);
          setLoading(false);
          setAuthenticated(true);
          // Guardar el rol del usuario en el contexto de autenticación
          setRole(user.role);
      
          return { success: true, user }; // Devuelve true si el inicio de sesión fue exitoso y el usuario
        } catch (error) {
          console.error(error);
          setLoading(false);
          return { success: false, user: null }; // Devuelve false si hubo un error en el inicio de sesión
        }
      };

      useEffect( () => {
        async function checkLogin() {
          const cookies = Cookies.get()
          console.log(cookies);
          
          if(!cookies.token) { 
            setAuthenticated(false);
            setLoading(false);
            return setUser(null);
          }
        
            try {
              const res = await verifyTokenRequest(cookies.token);
              console.log("Respuesta de verifyTokenRequest:", res.data);
              console.log(res);
              if (!res.data) {
                setAuthenticated(false);
                setLoading(false);
                return;
              }
              
              setAuthenticated(true);
              setUser(res);
              setLoading(false);
            } catch (error) {
              console.log(error)
              setAuthenticated(false);
              setUser(null);
              setLoading(false);
            }
          
        }
        checkLogin();
      }, []);
      
      
      const logout = () => {
        localStorage.removeItem("authToken");
        
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "anotherCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        
        setUser(null);
        setRole(null);
      
        // Redireccionar a la página de login
        window.location.replace("/");
      };
      

    const isAuthenticated = () => {
        return !!user;
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated, authenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
