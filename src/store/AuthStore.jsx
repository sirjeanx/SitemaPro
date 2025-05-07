import { create } from "zustand";

export const useAuthStore = create((set, get) => ({
signInWithEmail: async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
    email: p.correo,
    password: p.password,
    });
    if (error) {
    return null;
    }
},
signOut:
    async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
    throw new Error("Error signing out: " + error.message);
    }
},

}));