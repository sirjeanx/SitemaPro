import { useQuery } from "@tanstack/react-query";
import {
  MarcaTemplate,
  useMarcaStore,
  useEmpresaStore,
  SpinnerLoader,
} from "../index";

export function Marca() {
  const { mostrarMarca, datamarca, buscarMarca, buscador } = useMarcaStore();
  const { dataempresa } = useEmpresaStore();
  const { isLoading, error } = useQuery({
    queryKey: ["mostrar marca", { id_empresa: dataempresa.empresa?.id }],
    queryFn: () => mostrarMarca({ id_empresa: dataempresa.empresa?.id  }),
    enabled: dataempresa.empresa?.id  != null,
  });
  const { data: buscardata } = useQuery({
    queryKey: [
      "buscar marca",
      { id_empresa: dataempresa.id, descripcion: buscador },
    ],
    queryFn: () =>
      buscarMarca({ id_empresa: dataempresa.id, descripcion: buscador }),
    enabled: dataempresa.id != null,
  });
  if (isLoading) {
    return <SpinnerLoader />;
  }
  if (error) {
    return <span>Error...</span>;
  }

  return <MarcaTemplate data={datamarca}/>;
}
