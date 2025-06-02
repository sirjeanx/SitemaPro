import styled from "styled-components";

export function MantenimientoTemplate() {
  return (
    <Container>
      <Title>404</Title>
      <Subtitle>Página no encontrada</Subtitle>
      <Description>
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </Description>
      <Button href="/">Volver al inicio</Button>
    </Container>
  );
}

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f2f2f2;
  color: #333;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 8rem;
  margin: 0;
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  margin: 20px 0;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #666;
  max-width: 400px;
`;

const Button = styled.a`
  margin-top: 30px;
  padding: 12px 24px;
  background-color: #0070f3;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: bold;
  transition: background 0.3s;

  &:hover {
    background-color: #0056c1;
  }
`;
