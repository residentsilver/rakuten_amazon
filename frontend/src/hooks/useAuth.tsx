'use client';

import React, { useState, useEffect, useContext, createContext } from 'react';
import { User } from '@/types/product';
import apiClient from '@/lib/api';
import { useRouter } from 'next/navigation';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string, remember?: boolean) => Promise<void>;
    register: (username: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // トークンからユーザー情報を取得
        const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null;
        if (token) {
            fetchUser();
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUser = async () => {
        try {
            const response = await apiClient.get('/user');
            setUser(response.data.data);
        } catch (error) {
            localStorage.removeItem('auth_token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string, remember = false) => {
        const response = await apiClient.post('/login', { email, password, remember });
        const token = response.data.data.token;
        localStorage.setItem('auth_token', token);
        setUser(response.data.data.user);
        router.push('/dashboard');
    };

    const register = async (username: string, email: string, password: string) => {
        const response = await apiClient.post('/register', {
            username,
            email,
            password,
            password_confirmation: password,
        });
        const token = response.data.data.token;
        localStorage.setItem('auth_token', token);
        setUser(response.data.data.user);
        router.push('/dashboard');
    };

    const logout = async () => {
        try {
            await apiClient.post('/logout');
        } catch (error) {
            console.error('Logout failed', error);
        } finally {
            localStorage.removeItem('auth_token');
            setUser(null);
            router.push('/login');
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};

