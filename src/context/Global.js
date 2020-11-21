import React, {createContext, useReducer} from 'react';

const Initial = {
    transaction: []
}

export const Context = createContext(Initial);

export const Provider = ({x}) =>{
    // const [state, dispatch] = useReducer(AppReducer, Initial);

    return (<Context.Provider>
       {x}
    </Context.Provider>)
}