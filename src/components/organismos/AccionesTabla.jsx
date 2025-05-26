import styled from "styled-components";
import { AccionTabla, v } from "../../index";
export function AccionesTabla({ funcionEditar, funcionEliminar }) {
  return (
    <Container>
      <AccionTabla
        funcion={funcionEditar}
        color="#7d7d7d"
        fontSize="20px"
        icono={<v.iconeditarTabla />}
      />
      <AccionTabla
        funcion={funcionEliminar}
        color="#f76e8e"
        fontSize="20px"
        icono={<v.iconeliminarTabla />}
      />
    </Container>
  );
}
const Container = styled.div`
display: flex;
gap: 10px;
justify-content: center;
flex-content: wrap;
@media (max-width: 48rem) {
  justify-content: end;
  }
`;
