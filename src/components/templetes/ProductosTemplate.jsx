import styled from "styled-components";
import { useState } from "react";
import {
  Header,
  TablaProducto,
  RegistrarProducto,
  ContentFiltro,
  Title,
  v,
  Buscador,
  useProductoStore,
} from "../../index";
import { BtnAdd } from "../moleculas/BtnAdd";

export function ProductosTemplate({ data }) {
  const [state, setState] = useState(false);
  const [dataSelect, setDataSelect] = useState([]);
  const [accion, setAccion] = useState("");
  const [openRegistro, SetopenRegistro] = useState(false);
  const nuevoRegistro = () => {
    SetopenRegistro(!openRegistro);
    setAccion("Nuevo");
    setDataSelect([]);
  };
  const { setBuscador } = useProductoStore();
  return (
    <Container>
      {openRegistro && (
        <RegistrarProducto
          dataSelect={dataSelect}
          accion={accion}
          onClose={() => SetopenRegistro(!openRegistro)}
        />
      )}
      <header className="header">
        <Header stateConfig={{ state, setState: () => setState(!state) }} />
      </header>
      <section className="section1">
        <ContentFiltro>
          <Title>Productos</Title>

          <BtnAdd
            funcion={nuevoRegistro}
          />
        </ContentFiltro>
      </section>
      <section className="section2">
        <Buscador setBuscador={setBuscador} />
      </section>
      <section className="main">
        <TablaProducto
          data={data}
          SetopenRegistro={SetopenRegistro}
          setDataSelect={setDataSelect}
          setAccion={setAccion}
        />
      </section>
    </Container>
  );
}
const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  padding: 15px;
  grid-template-rows: 100px 100px 100px auto;
  grid-template-areas:
    "header"
    "section1"
    "section2"
    "main";
  .header {
    grid-area: header;
    // background-color: #006b32;
    display: flex;
    align-items: center;
  }
  .section1 {
    grid-area: section1;
    // background-color: rgb(245, 38, 38);
    display: flex;
    align-items: center;
  }
  .section2 {
    grid-area: section2;
    // background-color: #000000;
    display: flex;
    align-items: center;
    justify-content: end;
  }
  .main {
    grid-area: main;
  }
`;
