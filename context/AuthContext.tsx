// import React, { createContext, useState, useEffect } from 'react';
// import * as SecureStore from 'expo-secure-store';
// import login from '@/services/api/auth/Session';
// import apiClient from '@/services/api/apiClient';

// const TOKEN_KEY='jwt';

// type AuthContextType = {
//   isAuthenticated: boolean;
//   signIn: (token: string) => Promise<void>;
//   logout: () => Promise<void>;
// };

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

//   useEffect(() => {
//     const checkAuth = async () => {
//       const token = await SecureStore.getItemAsync(TOKEN_KEY);
//       setIsAuthenticated(!!token);
//     };
//     checkAuth();
//   }, []);

//   const signIn = async (token: string) => {
//     await SecureStore.setItemAsync(TOKEN_KEY, token);
//     const StoredToken = await SecureStore.getItemAsync(TOKEN_KEY);
//     apiClient.defaults.headers.common['Authorization'] = `Bearer ${StoredToken}`;
//     setIsAuthenticated(true);
//   };

//   const logout = async () => {
//     await SecureStore.deleteItemAsync(TOKEN_KEY);
//     delete apiClient.defaults.headers.common['Authorization'];
//     setIsAuthenticated(false);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, signIn, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;



import React, { createContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import apiClient from '@/services/api/apiClient';

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
  

    // const logout = async () => {
    //     console.log("Clearing token and user data");
    //     await SecureStore.deleteItemAsync(TOKEN_KEY);
    //     delete apiClient.defaults.headers.common['Authorization'];
    //     setIsAuthenticated(false);
    //     setUser(null); // Clear user from context
    //     console.log("Token and user data cleared");
    // };

  //   const logout = async () => {
  //     console.log("Attempting to log out...");
  //     await SecureStore.deleteItemAsync(TOKEN_KEY); // Clear token from secure storage
  //     delete apiClient.defaults.headers.common['Authorization']; // Remove the token from API client
  //     setIsAuthenticated(false); // Update authentication state
  //     setUser(null); // Clear user data from context
  
  //     // Double-check the state and storage after logout
  //     const currentToken = await SecureStore.getItemAsync(TOKEN_KEY);
  //     console.log("Current token in SecureStore:", currentToken);
  
  //     // Optionally, you can also force a re-render or check if context is properly updated
  //     console.log("User from context:", user);
  
  //     console.log("Logout complete.");
  // };
  
  const logout = async () => {
    console.log("Attempting to log out...");
    try {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
        delete apiClient.defaults.headers.common['Authorization'];
        // Explicitly set state to null
        setIsAuthenticated(false);
        setUser(null);

        // Add a timeout to ensure state updates are reflected
        setTimeout(async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            console.log("Current token in SecureStore after logout:", token);
            console.log("User from context after logout:", user);
        }, 0); // Short delay to allow state update

        console.log("Logout complete.");
    } catch (error) {
        console.error("Logout failed:", error);
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
