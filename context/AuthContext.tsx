import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import apiClient from '@/services/api/apiClient';
import axios from 'axios';
import { logoutUser } from '@/services/api/users/LogOut';

const TOKEN_KEY = 'jwt';

type User = {
    id: string;
    // other user properties
};

type AuthContextType = {
    isAuthenticated: boolean;
    user: User | null;
    signIn: (token: string, user: User) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            setIsAuthenticated(!!token);
            if (token) {
                // Optionally fetch user info if needed
            }
        };
        checkAuth();
    }, []);

    // const signIn = async (token: string, user: User) => {
    //     await SecureStore.setItemAsync(TOKEN_KEY, token);
    //     apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    //     setIsAuthenticated(true);
    //     setUser(user); // Set user in context
    // };
    const signIn = async (token: string, user: User) => {
      await SecureStore.setItemAsync(TOKEN_KEY, token);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      setIsAuthenticated(true);
      setUser(user); // Set user in context
  };

  
//   const logout = async () => {
//     console.log("Attempting to log out...");
//     try {
//         await SecureStore.deleteItemAsync(TOKEN_KEY);
//         delete apiClient.defaults.headers.common['Authorization'];
//         // Explicitly set state to null
//         setIsAuthenticated(false);
//         setUser(null);

//         // Add a timeout to ensure state updates are reflected
//         setTimeout(async () => {
//             const token = await SecureStore.getItemAsync(TOKEN_KEY);
//             console.log("Current token in SecureStore after logout:", token);
//             console.log("User from context after logout:", user);
//         }, 0); // Short delay to allow state update

//         console.log("Logout complete.");
//     } catch (error) {
//         console.error("Logout failed:", error);
//     }
// };

// const logout = async (userId: any) => {
//     try {
//         const response = await axios.post(`http://192.168.101.19:3001/digital-textbook/auth/${userId}/user-logout`);
//         if (response.status === 200) {
//             // Handle successful logout
//             setUser(null);
//             console.log('Logout successful:', response.data);
//             return response.data;
//         }
//     } catch (error) {
//         if (error.response) {
//             // The request was made and the server responded with a status code
//             console.error("Logout error:", error.response.status, error.response.data);
//             throw new Error(error.response.data.message || "Logout failed");
//         } else if (error.request) {
//             // The request was made but no response was received
//             console.error("Logout request error:", error.request);
//             throw new Error("No response received from the server");
//         } else {
//             // Something happened in setting up the request
//             console.error("Logout setup error:", error.message);
//             throw new Error("Error setting up logout request");
//         }
//     }
// };

const logout = async (userId: any) => {
    try {
        const response = await logoutUser(userId); // Call the logout function from the service
        setUser(null); // Clear user state
        console.log('Logout successful:', response);
        return response; // Optional: return response if needed
    } catch (error) {
        console.error("Logout error:", error.response ? error.response.data : error);
        throw error; // Propagate error for handling in the calling function
    }
};
useEffect(() => {
  console.log("AuthProvider state updated:", { isAuthenticated, user });
}, [isAuthenticated, user]);


    return (
        <AuthContext.Provider value={{ isAuthenticated, user, signIn, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
