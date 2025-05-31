import { Routes, Route } from "react-router-dom";
import {
  Home,
  Login,
  UserAuth,
  useUsersStore,
  ProtectedRoute,
  SpinnerLoader,
  ErrorMolecula,
  useEmpresaStore,
  Configuracion,
  Marca,
  Categorias,
  Productos,
} from "../index.js";
import { useQuery } from "@tanstack/react-query";

export function MyRoutes() {
  const { user } = UserAuth();
  const { mostrarUser, iduser } = useUsersStore();
  const { mostrarEmpresa } = useEmpresaStore();
  const {
    data: datauser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["Mostrar Usuario"],
    queryFn: mostrarUser,
  });

  const { data: dataempresa } = useQuery({
    queryKey: ["Mostrar Empresa"],
    queryFn: () => mostrarEmpresa({ iduser: iduser }),
    enabled: !!datauser,
  });
  if (isLoading) return <SpinnerLoader />;
  if (error) {
    return <ErrorMolecula message={error.message} />;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
        <Route path="/" element={<Home />} />
        <Route path="/configurar" element={<Configuracion />} />
        <Route path="/configurar/marca" element={<Marca />} />
        <Route path="/configurar/categorias" element={<Categorias />} />
        <Route path="/configurar/productos" element={<Productos />} />
      </Route>
    </Routes>
  );
}
