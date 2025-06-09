import styled from "styled-components";
import { useState } from "react";
import {
  Header,
  TablaMarca,
  RegistrarMarca,
  ContentFiltro,
  BtnAdd,
  Title,
  v,
  Buscador,
  useMarcaStore,
} from "../../index";

export function MarcaTemplate({ data }) {
  const [state, setState] = useState(false);
  const [dataSelect, setDataSelect] = useState([]);
  const [accion, setAccion] = useState("");
  const [openRegistro, setOpenRegistro] = useState(false);

  const { setBuscador } = useMarcaStore();

  const nuevoRegistro = () => {
    setOpenRegistro(true);
    setAccion("Nuevo");
    setDataSelect([]);
  };

  return (
    <Container>
      <RegistrarMarca
        open={openRegistro}
        dataSelect={dataSelect}
        accion={accion}
        onClose={() => setOpenRegistro(false)}
      />

      <header className="header">
        <Header stateConfig={{ state, setState: () => setState(!state) }} />
      </header>

      <section className="section1">
        <ContentFiltro>
          <Title>Marcas</Title>
          <BtnAdd
            funcion={nuevoRegistro}
            bgcolor="#f6f3f3"
            textcolor="#353535"
            icono={<v.agregar />}
          />
        </ContentFiltro>
      </section>

      <section className="section2">
        <Buscador setBuscador={setBuscador} />
      </section>

      <section className="main">
        <TablaMarca
          data={data}
          SetopenRegistro={setOpenRegistro}
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
