import styled from "styled-components";
import { useState} from "react";
import { Header,TablaMarca,RegistrarMarca } from "../../index";

export function MarcaTemplate({data}) {
const [state, setState] = useState(false);
const [dataSelect,setDataSelect]=useState([]);
const [accion,setAccion]=useState("");
const [openRegistro,SetopenRegistro]= useState(false);
  return (
    <Container>
      {
        openRegistro &&
      <RegistrarMarca dataSelect={dataSelect} accion={accion}
      onClose={()=>SetopenRegistro(!openRegistro)}
      />
      }
      <header className="header" >  
      <Header stateConfig={{ state, setState:()=> 
        setState(!state) }}/>
      </header>
      <section className="section1">

      </section>
      <section className="section2">
      </section>
      <section className="main">
        <TablaMarca data={data}/>

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
    display: flex;
  
  }
`;
