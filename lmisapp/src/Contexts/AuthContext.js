import React, { useReducer } from "react";
import { AuthReducer } from "../Reducers/AuthReducer";

export const AuthContext = React.createContext()

function AuthContextProvider(props){
    const [auth, dispatch] = useReducer(AuthReducer, {
        error:null,
        token:null,
        user:{}
    });
    return (
        <AuthContext.Provider value={{auth,dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}
export default AuthContextProvider
