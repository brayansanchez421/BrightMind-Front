import React, { useState, createContext, useContext } from 'react';
import { loginRequest } from '../api/auth.js';

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
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState(null); // Agregar el estado para el rol del usuario


    const login = async (credentials) => {
        setLoading(true);
        try {
          const user = await loginRequest(credentials);
          console.log("Respuesta de loginRequest:", user);
        console.log(user.data.token)
          // Guardar la cookie de autenticación en el localStorage
          localStorage.setItem("authToken", user.data.token);
      
          setUser(user);
          setLoading(false);
      
          // Guardar el rol del usuario en el contexto de autenticación
          setRole(user.role);
      
          return { success: true, user }; // Devuelve true si el inicio de sesión fue exitoso y el usuario
        } catch (error) {
          console.error(error);
          setLoading(false);
          return { success: false, user: null }; // Devuelve false si hubo un error en el inicio de sesión
        }
      };
      
      
      const logout = () => {
        localStorage.removeItem("authToken");
      
        setUser(null);
        setRole(null);
      
        // Redireccionar a la página de login
        window.location.replace("/login");
      };
      

    const isAuthenticated = () => {
        return !!user;
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};
