import { useQuery } from "@tanstack/react-query";
import {
  ProductosTemplate,
  useEmpresaStore,
  SpinnerLoader,
  useProductoStore
} from "../index";


export function Productos() {
  const { mostrarproductos, dataproductos, buscarproductos } = useProductoStore();
  const { buscador } = useProductoStore();
  const { dataempresa } = useEmpresaStore();
  //mostrar data
  const { data, isLoading, error } = useQuery({
    queryKey: ["mostrar productos", dataempresa?.id],
    queryFn: () => mostrarproductos({ id_empresa: dataempresa?.id }),
    enabled: dataempresa.id != null,
  });
  //buscador
  const { data: buscar } = useQuery({
    queryKey: ["buscar productos", buscador],
    queryFn: () =>
      buscarproductos({ descripcion: buscador, id_empresa: dataempresa?.id }),
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
      <ProductosTemplate data={dataproductos} />
    </>
  );
}
