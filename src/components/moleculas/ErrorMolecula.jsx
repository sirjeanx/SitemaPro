import styled from "styled-components";

export function ErrorMolecula({ message }) {
  return (
    <Container>
      <span>Error...{message}</span>
    </Container>
  );
}

const Container = styled.div`
`;
