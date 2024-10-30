import { createContext, useEffect, useReducer } from "react";
import { register } from "../services/authService.js";

const INITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null,
    message: null,
};

export const AuthContext = createContext(INITIAL_STATE);

const AuthReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                ...state,
                user: null,
                loading: true,
                error: null,
                message: null,
            };
        case "LOGIN_SUCCESS":
            return {
                ...state,
                user: action.payload,
                loading: false,
                error: null,
                message: "You have successfully logged in.",
            };
        case "LOGIN_FAILURE":
            return {
                ...state,
                user: null,
                loading: false,
                error: action.payload,
                message: "Failed to log in. Please try again.",
            };
        case "LOGOUT":
            return {
                ...state,
                user: null,
                loading: false,
                error: null,
                message: "You have successfully logged out.",
            };
        case "SET_MESSAGE":
            return {
                ...state,
                message: action.payload,
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
            dispatch({ type: "REGISTER_SUCCESS", payload: res.details });
            dispatch({ type: "SET_MESSAGE", payload: "Registration successful." });
        } catch (err) {
            dispatch({ type: "REGISTER_FAILURE", payload: err.message });
            dispatch({ type: "SET_MESSAGE", payload: "Registration failed. Please try again." });
        }
    };

    const setMessage = (msg) => {
        dispatch({ type: "SET_MESSAGE", payload: msg });
    };

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                loading: state.loading,
                error: state.error,
                message: state.message,
                handleRegister,
                dispatch,
                setMessage,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
