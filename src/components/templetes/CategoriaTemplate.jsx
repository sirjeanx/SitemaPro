import styled from "styled-components";
import { useState } from "react";
import {
  Header,
  ContentFiltro,
  BtnAdd,
  Title,
  v,
  Buscador,
  useCategoriasStore,
  RegistrarCategorias,
} from "../../index";
import { TablaCategorias } from "../organismos/tablas/TablaCategorias";

export function CategoriaTemplate({ data }) {
  const [state, setState] = useState(false);
  const [dataSelect, setDataSelect] = useState([]);
  const [accion, setAccion] = useState("");
  const [openRegistro, SetopenRegistro] = useState(false);
  const nuevoRegistro = () => {
    SetopenRegistro(!openRegistro);
    setAccion("Nuevo");
    setDataSelect([]);
  };
  const { setBuscador } = useCategoriasStore();
  return (
    <Container>
      {openRegistro && (
        <RegistrarCategorias
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
          <Title>Categorias</Title>
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
        <TablaCategorias
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
