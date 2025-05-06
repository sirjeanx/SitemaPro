import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../index"; // Asegúrate de que esto está bien importado

const AutheContext = createContext();

export const AutheContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Obtener sesión actual
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Escuchar cambios de sesión
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    // Limpiar el listener al desmontar
    return () => {
      authListener.subscription.unsubscribe(); // CORREGIDO: esto cancela la suscripción
    };
  }, []);

  return (
    <AutheContext.Provider value={user}>
      {children}
      
    </AutheContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AutheContext);
};
