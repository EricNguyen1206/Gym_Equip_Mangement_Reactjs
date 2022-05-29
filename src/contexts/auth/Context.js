import { createContext, useEffect, useReducer } from "react";
import reducer, { initState } from "./reducer";
import { rememberMe } from "./action";

const Context = createContext();
const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initState);
    useEffect(() => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        rememberMe(user, dispatch);
    }, []);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    );
};

export { Provider };
export default Context;
