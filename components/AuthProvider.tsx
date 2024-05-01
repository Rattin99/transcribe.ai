"use client"
import React, { useState, createContext, ReactNode } from "react";

export type User = {
    email: string,
    userId: string
}

export type UserContextType = {
    user:User | null,
    setUser: (user:User) => void;
    meetings: Meeting[],
    setMeetings: (meetings: Meeting[]) => void;
}

export const UserContext = createContext<UserContextType | null>(null);

type AppProviderProps = {
    children: ReactNode
}

type Meeting = {
    dateTime: string,
    id: string,
    meetingName: string,
}

export const AuthProvider: React.FC<AppProviderProps> = ({children}) => {
    const [user,setUser] = useState<User | null>(null);
    const [meetings,setMeetings] = useState<Meeting[]>([]);



    const value: UserContextType = {
        user,
        setUser,
        meetings,
        setMeetings
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}