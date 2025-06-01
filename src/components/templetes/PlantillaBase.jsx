import styled from "styled-components";
import { useState } from "react";
import { Header } from "../organismos/Header";

export function PlantillaBase() {
const [state, setState] = useState(false);
  return (
    <Container>
      <header className="header" >  
      <Header stateConfig={{ state, setState:()=> 
        setState(!state) }}/>
      </header>
      <section className="section1">

      </section>
      <section className="section2">

      </section>
      <section className="main">

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
  background-color: #ffffff;
    display: flex;
  align-items: center;
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
  align-items: center;
  
  }
`;
