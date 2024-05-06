import React, { useState, createContext, useContext, useEffect } from 'react';
import { getAllUsers, ActivateAcc, getUser, updateUser as updateUserApi, deleteUser as deleteUserApi, deleteUserConfirmation as deleteUserConfirmationApi, createUser as createUserApi } from '../../api/user/user.request';
import { useAuth } from '../auth.context'; // Importa el contexto de autenticación

export const UserContext = createContext();

export const useUserContext = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("El useUser debe usarse dentro de UserProvider");
    }
    return context;
};

export const UserProvider = ({ children }) => {
    const [usersData, setUsersData] = useState([]);
    const { isAuthenticated } = useAuth(); // Obtén la función isAuthenticated del contexto de autenticación

    const getUsers = async () => {
        try {
            const res = await getAllUsers();
            setUsersData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const activateAccount = async (_id) => {
        try {
            await ActivateAcc(_id);
            getUsers(); // Vuelve a obtener la lista de usuarios después de activar una cuenta
        } catch (error) {
            console.log(error);
        }
    };

    const getUserById = async (_id) => {
        try {
            const res = await getUser(_id);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const updateUser = async (_id, userData) => {
        try {
            console.log("ID del usuario a actualizar:", _id);
            console.log("Datos del usuario a enviar:", userData);
            const res = await updateUserApi(_id, userData);
            console.log("Respuesta del servidor:", res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const createUser = async (userData) => {
        try {
            const res = await createUserApi(userData);
            console.log("Usuario creado:", res.data);
            getUsers(); // Actualiza la lista de usuarios después de crear uno nuevo
        } catch (error) {
            console.error(error);
        }
    };

    const updateUserPartial = async (_id, { username, email }) => {
        try {
            const currentUserData = await getUserById(_id);
            console.log("pruebassss:",currentUserData )

            const updatedUserData = {
                username: username || currentUserData.username,
                email: email || currentUserData.email,
                state: currentUserData.state,
                role: currentUserData.role,
            };
            console.log("pruebas 2: ", updatedUserData)

            await updateUserApi(_id, updatedUserData);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteUser = async (id) => {
        try {
            const res = await deleteUserApi(id);
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const deleteUserConfirmation = async (id, confirmationCode) => {
        try {
            const res = await deleteUserConfirmationApi(id, confirmationCode);
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (isAuthenticated()) {
            getUsers();
        }
    }, [isAuthenticated]);

    return (
        <UserContext.Provider
            value={{
                usersData,
                getUsers,
                activateAccount,
                getUserById,
                updateUser,
                createUser,
                updateUserPartial, 
                deleteUser,
                deleteUserConfirmation,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
