import { useQuery } from "@tanstack/react-query";
import {
  MarcaTemplate,
  useMarcaStore,
  useEmpresaStore,
  SpinnerLoader,
} from "../index";

export function Marca() {
  const { mostrarMarca, datamarca, buscarMarca } = useMarcaStore();
  const { buscador } = useMarcaStore();
  const { dataempresa } = useEmpresaStore();
  //mostrar data
  const { data, isLoading, error } = useQuery({
    queryKey: ["mostrar marcas", dataempresa.id],
    queryFn: () => mostrarMarca({ id_empresa: dataempresa.id }),
    enabled: dataempresa.id != null,
  });
  //buscador
  const { data: buscar } = useQuery({
    queryKey: ["buscar marcas", buscador],
    queryFn: () =>
      buscarMarca({ descripcion: buscador, id_empresa: dataempresa.id }),
    enabled: !!buscador && dataempresa.id != null,
  });
  //respuestas 
  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <span>Error...</span>;
  }
  return (
    <>
      <MarcaTemplate data={datamarca} />
    </>
  );
}
