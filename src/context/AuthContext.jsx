import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../index"; // Asegúrate de que esto está bien importado

const AutheContext = createContext(null);

export const AutheContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const { data: AuthListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (session?.user == null) {
          setUser(null);
        } else {
          setUser(session?.user);
        }
      }
    );

    return () => {
      AuthListener.subscription;
    };
  }, []);

  return (
    <AutheContext.Provider value={{user}}>
      {children}
    </AutheContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AutheContext);
};
