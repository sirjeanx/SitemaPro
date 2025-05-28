import { useQuery } from "@tanstack/react-query";
import {
  useMarcaStore,
  useEmpresaStore,
  SpinnerLoader,
  CategoriaTemplate,
  useCategoriasStore,
} from "../index";

export function Categorias() {
  const { mostrarcategorias, datacategorias, buscarcategorias } = useCategoriasStore();
  const { buscador } = useCategoriasStore();
  const { dataempresa } = useEmpresaStore();
  //mostrar data
  const { data, isLoading, error } = useQuery({
    queryKey: ["mostrar categorias", dataempresa.id],
    queryFn: () => mostrarcategorias({ id_empresa: dataempresa.id }),
    enabled: dataempresa.id != null,
  });
  //buscador
  const { data: buscar } = useQuery({
    queryKey: ["buscar categorias", buscador],
    queryFn: () =>
      buscarcategorias({ descripcion: buscador, id_empresa: dataempresa.id }),
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
      <CategoriaTemplate data={datacategorias} />
    </>
  );
}
