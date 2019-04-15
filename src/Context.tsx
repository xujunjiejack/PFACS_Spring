import * as React from 'react';

export interface ISession {
    studentIds: string[],
    startTime: string,
    ongoing: boolean,
    sessionName: string,
    studentNumber: number,
    sessionId: string
}

export interface IUserContext {
    userName: string,
    userAccessToken: string,
    // Future might be session
    userIdToken: string,
    userSessions: ISession[],    
}

export const initialUser = {userName:"", userAccessToken:"", userIdToken:"", userSessions:[]}

export const UserContext = React.createContext<IUserContext>(initialUser)

