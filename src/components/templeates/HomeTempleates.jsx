import styled from "styled-components";

export function HomeTempleates() {
  return (
    <Container>
      <h1>Menu Home</h1>
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
