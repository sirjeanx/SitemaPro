import { useQuery } from "@tanstack/react-query";
import {
  ProductosTemplate,
  useEmpresaStore,
  SpinnerLoader,
  useProductoStore,
  useMarcaStore,
  useCategoriasStore
} from "../index";


export function Productos() {
  const{ mostrarMarca }= useMarcaStore();
  const{mostrarcategorias}=useCategoriasStore();
  const { mostrarproductos, dataproductos, buscarproductos } = useProductoStore();
  const { buscador } = useProductoStore();
  const { dataempresa } = useEmpresaStore();

    const { data:datamarcas } = useQuery({
    queryKey: ["mostrar marcas", dataempresa.id],
    queryFn: () => mostrarMarca({ id_empresa: dataempresa.id }),
    enabled: dataempresa.id != null,
  });
    const { data:datacategorias } = useQuery({
    queryKey: ["mostrar categorias", dataempresa.id],
    queryFn: () => mostrarcategorias({ id_empresa: dataempresa.id }),
    enabled: dataempresa.id != null,
  });
  //mostrar data
  const { data, isLoading, error } = useQuery({
    queryKey: ["mostrar productos", dataempresa?.id],
    queryFn: () => mostrarproductos({ _id_empresa: dataempresa?.id }),
    enabled: dataempresa.id != null,
  });
  //buscador
  const { data: buscardata } = useQuery({
    queryKey: ["buscar productos", buscador],
    queryFn: () =>
      buscarproductos({ descripcion: buscador, _id_empresa: dataempresa?.id }),
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
