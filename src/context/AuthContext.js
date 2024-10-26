// src/context/AuthContext.js
import { createContext, useEffect, useReducer } from "react";
import { register } from "../services/authService"; // Import the register function

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                loading: true,
                error: null,
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                loading: false,
                error: null,
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                loading: false,
                error: action.payload,
            };
        case "LOGOUT":
            return {
                user: null,
                loading: false,
                error: null,
            };
        default:
            return state;
    }
};

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user));
    }, [state.user]);

    const handleRegister = async (userData) => {
        dispatch({ type: "REGISTER_START" });
        try {
            const res = await register(userData);
            dispatch({ type: "REGISTER_SUCCESS", payload: res.details }); // Adjust this based on the response structure
        } catch (err) {
            dispatch({ type: "REGISTER_FAILURE", payload: err.message });
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                handleRegister, // Expose the register function to the context
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
