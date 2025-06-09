import styled from "styled-components";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

export function BtnAdd({ funcion }) {
  return (
    <Container onClick={funcion}>
      
            <Fab 
            color="primary"
            aria-label="add"
            >
              <AddIcon />
            </Fab>
      
  
    </Container>
  );
}
const Container =styled.div`
    position: relative;
    z-index: 100;

`