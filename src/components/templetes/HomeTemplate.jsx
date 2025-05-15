import styled from "styled-components";
import { Btnsave, useAuthStore } from "../../index";

export function HomeTemplate() {
  const{signOut} = useAuthStore();
  return (
    <Container>
      <h1>Menu Home</h1>
      <Btnsave titulo="Cerrar sesion" 
      bgcolor="#fff" funcion={signOut}/>
          </Container>
  );
}
const Container = styled.div`
  display: flex;
  flex-content: center;
  align-items: center;
  justify-content: center;
  height: 100vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  width: 100%;
`;
