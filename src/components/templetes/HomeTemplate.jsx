import styled from "styled-components";
import { useState } from "react";
import { Header, Title } from "../../index";

export function HomeTemplate() {
const [state, setState] = useState(false);
  return (
    <Container>
      <header className="header" >  
      <Header stateConfig={{ state, setState:()=> 
        setState(!state) }}/>
      </header>
      <section className="section1">
        <Title>Tu Empresa</Title>
      </section>
      <section className="section2">

      </section>
      <section className="main">

      </section>
    </Container>
  );
}
const Container = styled.div`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  display: grid;
  padding :15px;
grid-template-rows: 100px 100px 100px auto;
grid-template-areas:
  "header"
  "section1"
  "section2"
  "main";
  .header{
  grid-area: header;
  background-color: #006b32;
  display: flex;
  align-items: center;
  }
  .section1{
  grid-area: section1;
  background-color:rgb(20, 173, 173);
    display: flex;
  align-items: center;
  justify-content: end;
  }
  .section2{
  grid-area: section2;
  background-color: #000000;
    display: flex;
  align-items: center;
  }
  .main{
  grid-area: main;
  background-color: #ff8900;
    display: flex;
  align-items: center;
  
  }
`;
