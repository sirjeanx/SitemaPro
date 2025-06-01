import styled from "styled-components";
import { CardDatosEmpresa, useEmpresaStore, v } from "../index";

export function Bannerempresa() {
  const {dataempresa,contadoruser}= useEmpresaStore();
  
  return (
    <>
      <Container>
        <div className="content-wrapper-context">
          <span className="title">
            {<v.iconoempresa />}
            {dataempresa?.empresa?.nombre}
          </span>
          <div className="content-text">
            Inverario pro te mantiene siempre informado de las novedades de tu
            empresa,
          </div>
          <ContentCards>
            <CardDatosEmpresa title="Moneda" value={dataempresa?.empresa?.simbolomoneda} />
            <CardDatosEmpresa title="Usuarios" value={dataempresa.empresa?.id} />
          </ContentCards>
        </div>

      </Container>
    </>
  );
}
const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0 solid #6b6b6b;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat, repeat;
  border-radius: 14px;
  overflow: hidden;
  
`;
const ContentCards = styled.div`
  display: flex;
  gap: 10px;
  padding-top: 10px;
  cursor: pointer;
`;
