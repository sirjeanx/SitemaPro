import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  UserAuth,
  useUsersStore,
  ProtectedRoute,
  SpinnerLoader,
  ErrorMolecula
} from "../index.js";
import { useQuery } from "@tanstack/react-query";

export function MyRoutes() {
  const { user } = UserAuth();
  const { mostrarUser } = useUsersStore();
  const { data, isLoading, error } = useQuery({
    queryKey: ["Mostrar Usuario"],
    queryFn: mostrarUser,
  });
  if (isLoading) return <SpinnerLoader/>;
  if(error) {
    return <ErrorMolecula message={error.message}/>;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  );
}
