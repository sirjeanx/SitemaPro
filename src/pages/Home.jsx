import { useQuery } from "@tanstack/react-query";
import { HomeTemplate, useEmpresaStore } from "../index";

export function Home() {
  const { contarusersXempresas, dataempresa } = useEmpresaStore();
  const {data} = useQuery({
    queryKey: ["Contar users x empresa",{ id_empresa: dataempresa.id}],
    queryFn: () =>
      contarusersXempresas({ id_empresa: dataempresa.empresa?.id}),
    enabled: dataempresa?.id != null,
  });
  return <HomeTemplate />;
}
  // const { contarusuariosXempresa, dataempresa } = useEmpresaStore();
  // //llamar a consultar usuarios por empresa

  // const { data: contadorusurios } = useQuery({
  //   queryKey: ["contador de usuarios", dataempresa.id],
  //   queryFn: () => contarusuariosXempresa({ id_empresa: dataempresa.id }),
  //   enabled: dataempresa?.id != null,
  // });
