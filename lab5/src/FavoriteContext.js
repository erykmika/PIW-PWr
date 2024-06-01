import React, { createContext, useReducer } from 'react';
import { initialState, reducer } from './fav';

const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <FavoriteContext.Provider value={{ state, dispatch }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export { FavoriteContext, FavoriteProvider };
