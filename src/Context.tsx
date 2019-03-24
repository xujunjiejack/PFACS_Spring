import * as React from 'react';

export const initialUser = {userName:"", userAccessToken:"", userIdToken:""}

export const UserContext = React.createContext(initialUser)

