import styled from "styled-components";
import { AccionesTabla } from "../../../index";
import { v } from "../../../styles/variables";
export function ContentAccionesTabla({funcionEditar, funcionEliminar}) {
  return (
    <Container>
      <AccionesTabla funcion = {funcionEditar} fontSize="18px" color="#7d7d7d" icono={<v.iconeditarTabla/>} />
      <AccionesTabla funcion={funcionEliminar} fontSize="20px" color="#f76e8e" icono={<v.iconeliminarTabla/>} />
    </Container>
  );
}
const Container = styled.div`
 display: flex;
  flex-wrap: wrap;
  justify-content:center;
  gap:10px;
  @media (max-width: 48em) {
    justify-content:end;
  }
`;
