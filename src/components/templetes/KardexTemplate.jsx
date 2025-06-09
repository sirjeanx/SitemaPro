import styled from "styled-components";
import { useState } from "react";
import {
  Header,
  ContentFiltro,
  Btnfiltro,
  RegistrarSalidaEntrada,
  Title,
  v,
  Buscador,
  useKardexStore,
  Btnsave,
  Tabs,
} from "../../index";

export function KardexTemplate({ data }) {
  const { setBuscador } = useKardexStore();
  const [state, setState] = useState(false);
  const [openRegistro, SetopenRegistro] = useState(false);
  const [accion, setAccion] = useState("");
  const [dataSelect, setdataSelect] = useState([]);
  const [tipo, setTipo] = useState("");
  function nuevaentrada() {
    SetopenRegistro(true);
    setTipo("entrada");
  }
  function nuevasalida() {
    SetopenRegistro(true);
    setTipo("salida");
  }
  return (
    <Container>
      {openRegistro && (
        <RegistrarSalidaEntrada
          tipo={tipo}
          dataSelect={dataSelect}
          onClose={() => SetopenRegistro(!openRegistro)}
          accion={accion}
        />
      )}
      <header className="header">
        <Header
          stateConfig={{ state: state, setState: () => setState(!state) }}
        />
      </header>
      <section className="area1">
        <ContentFiltro>
          <Title>Kardex</Title>
          <Btnsave
            titulo="Entrada"
            bgcolor="#52de65"
            icono={<v.iconoflechaderecha />}
            funcion={nuevaentrada}
          />

          <Btnsave titulo="Salida" bgcolor="#fb6661" funcion={nuevasalida} />
        </ContentFiltro>
      </section>
      <section className="area2">
        <Buscador setBuscador={setBuscador} />
      </section>

      <section className="main">
        <Tabs />
        {/* {data.length == 0 && (
          <Lottieanimacion
            alto="300"
            ancho="300"
            animacion={vacio}
          />
        )}

        <TablaMarca
          data={data}
          SetopenRegistro={SetopenRegistro}
          setdataSelect={setdataSelect}
          setAccion={setAccion}
        /> */}
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

    display: flex;
    align-items: center;
  }
  .section1 {
    grid-area: section1;

    display: flex;
    align-items: center;
  }
  .section2 {
    grid-area: section2;

    display: flex;
    align-items: center;
    justify-content: end;
  }
  .main {
    grid-area: main;
  }
`;
