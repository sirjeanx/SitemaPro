import { useQuery } from "@tanstack/react-query";
import {
  useMarcaStore,
  useEmpresaStore,
  SpinnerLoader,
  useKardexStore,
  useProductoStore,
  KardexTemplate
} from "../index";


export function Kardex() {
  
  const { mostrarproductos, dataproductos, buscarproductos ,buscador:buscadorproductos } = useProductoStore();
  const {
    mostrarKardex,
    buscarKardex,
    buscador: buscadorkardex,
  } = useKardexStore();
  const { mostrarMarca } = useMarcaStore();
  const { dataempresa } = useEmpresaStore();


  const { data, isLoading, error } = useQuery({
    queryKey: ["mostrar productos", dataempresa.id],
    queryFn: () => mostrarproductos({ _id_empresa: dataempresa.id }),
    enabled: dataempresa.id != null,
  });
  //buscador productos
  const { data: buscar } = useQuery({
    queryKey: ["buscar productos", buscadorproductos],
    queryFn: () =>
      buscarproductos({ descripcion: buscadorproductos, id_empresa: dataempresa.id }),
    enabled: dataempresa.id != null,
  });

  //mostrar kardex
  const { data: datakardex } = useQuery({
    queryKey: ["mostrar kardex", dataempresa.id],
    queryFn: () => mostrarKardex({ id_empresa: dataempresa.id }),
    enabled: dataempresa.id != null,
  });
  //buscador kardex
  const { data: buscarkardex } = useQuery({
    queryKey: ["buscar kardex", buscadorkardex],
    queryFn: () =>
      buscarKardex({ buscador: buscadorkardex, id_empresa: dataempresa.id }),
    enabled: dataempresa.id != null,
  });

  //respuestas 
  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <span>Error...Kardex</span>;
  }
  return (
    <>
      <KardexTemplate data={dataproductos} />
    </>
  );
}
