import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAllRoles as getAllRolesApi, getRole as getRoleApi, updateRole as updateRoleApi,  createRole as createRoleApi } from '../../api/user/role.request'; 


export const RoleContext = createContext();

export const useRoleContext = () => {
    const context = useContext(RoleContext);
    if (!context) {
        throw new Error("El useRoleContext debe usarse dentro de RoleProvider");
    }
    return context;
};

export const RoleProvider = ({ children }) => {
    const [rolesData, setRolesData] = useState([]);
    const getAllRoles = async () => {
        try {
            const res = await getAllRolesApi(); 
            setRolesData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getAllRoles();
    }, []);

    const getRole = async (_id) => {
        try {
            const res = await getRoleApi(_id);
            return res.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };
    const updateRole = async (id, data) => {
        try {
            console.log("este es el id: ", id )
            console.log("este es la data: ", data )
            const res = await updateRoleApi(id, data);
            

            console.log("paso por aqui");
            console.log("Datos obtenidos:", res.data); // Mostrar los datos obtenidos
            return res.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };
    const createRole = async (data) => {
        try {
            console.log("hajkskj: ", data)

            const res = await createRoleApi(data);
            setRolesData([...rolesData, res.data]);
            console.log("hajkskj2: ", res.data)

            return res.data;
        } catch (error) {
            console.log(error);
            return null;
        }
    };
    

    

    return (
        <RoleContext.Provider
            value={{
                createRole,
                rolesData,
                getRole,
                updateRole,
            }}
        >
            {children}
        </RoleContext.Provider>
    );
};
