import { useQuery } from "@tanstack/react-query";
import {
  UsersTemplate,
  useMarcaStore,
  useEmpresaStore,
  SpinnerLoader,
  useUsersStore,
} from "../index";

export function Users() {
  // const { mostrarMarca, datamarca, buscarMarca } = useMarcaStore();
  const{mostraruserTodos,datausers,buscarusers}=useUsersStore();
  // const { buscador } = useMarcaStore();
  const { dataempresa } = useEmpresaStore();
  //mostrar data
  const { data, isLoading, error } = useQuery({
    queryKey: ["mostrar usuarios todos", dataempresa.id],
    queryFn: () => mostraruserTodos({ _id_empresa: dataempresa.id }),
    enabled: dataempresa.id != null,
  });
  //buscador
  // const { data: buscar } = useQuery({
  //   queryKey: ["buscar marcas", buscador],
  //   queryFn: () =>
  //     buscarusers({ descripcion: buscador, id_empresa: dataempresa.id }),
  //   enabled: !!buscador && dataempresa.id != null,
  // });
  //respuestas 
  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <span>Error...</span>;
  }
  return (
    <>
      <UsersTemplate data={datausers} />
    </>
  );
}
