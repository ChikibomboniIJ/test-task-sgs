import React, { createContext, useContext, useState, useEffect } from 'react';
import { isTokenVerified, refreshToken } from '../services/auth';

export const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState('')

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const authStatus = await isTokenVerified();
                if (!authStatus) {
                    const refreshed = await tryRefreshToken();
                    if (refreshed) {
                        setIsAuthenticated(true);
                    } else {
                        setIsAuthenticated(false);
                    }
                } else {
                    setIsAuthenticated(true);
                }
                setLoading(false);
            } catch (error) {
                setLoading(false)
            }
            
        };
        checkAuth();
    }, []);

    const tryRefreshToken = async () => {
        try {
            await refreshToken();
            return true;
            
        } catch (error) {
            console.info("Token expired");
        }
        return false;
    };

    const login = (username) => {
        setUsername(username);
        setIsAuthenticated(true);
    };

    const logout = () => {
        setUsername('');
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};