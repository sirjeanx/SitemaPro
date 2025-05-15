import styled from "styled-components";
import { Btnsave, useUsersStore } from "../../index";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function LoginTempleate() {
    const navigate = useNavigate();
    const { insertUserAdmin } = useUsersStore();
    const mutateInsertUser = useMutation({ 
        mutationKey: ["inserta User Admin"],   
        mutationFn: async() => {
            const p = {
                email :"prueba13@gmail.com",
                password : "123456",
            };
         const dt=   await insertUserAdmin(p);
            if(dt){
                navigate("/");
            }
        },
    });
    return (
        <Container>
            <Btnsave titulo="Crear cuenta" bgcolor="#fff" 
            funcion={mutateInsertUser.mutateAsync}/>
        </Container>
    );
}

const Container = styled.div`
  height: 100vh;
`;
