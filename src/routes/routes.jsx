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
  usePermisosStore,
  Users,
  Kardex,
} from "../index.js";
import { useQuery } from "@tanstack/react-query";

export function MyRoutes() {
  const { user } = UserAuth();
  const { mostrarUser, iduser } = useUsersStore();
  const { mostrarEmpresa } = useEmpresaStore();
  const { mostrarPermisos } = usePermisosStore();
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
  const { data: permisos } = useQuery({
    queryKey: ["Mostrar Permisos", { id_user: datauser?.id }],
    queryFn: () => mostrarPermisos({ id_user: datauser?.id }),
    enabled: !!datauser?.id,
    onSuccess: (data) => {
      console.log("Permisos cargados:", data); // Debería mostrar 7
    },
    onError: (error) => {
      console.error("Error al cargar permisos:", error);
    },
  });
  if (isLoading) return <SpinnerLoader />;
  if (error) {
    return <Mantenimiento />;
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
        <Route path="/configurar/personal" element={<Users />} />
        <Route path="/kardex" element={<Kardex />} />
      </Route>
    </Routes>
  );
}
