"use client"
import React, { useState, createContext, ReactNode } from "react";

export type User = {
    email: string,
    userId: string
}

export type UserContextType = {
    user:User | null,
    setUser: (user:User) => void;
}

export const UserContext = createContext<UserContextType | null>(null);

type AppProviderProps = {
    children: ReactNode
}

export const AuthProvider: React.FC<AppProviderProps> = ({children}) => {
    const [user,setUser] = useState<User | null>(null);

    const value: UserContextType = {
        user,
        setUser
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}