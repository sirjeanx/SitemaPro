import styled from "styled-components";
import { v } from "../../styles/variables";
import { Device } from "../../styles/breackpoints";
import {
  TablaKardex,
  useKardexStore,
  useProductoStore,
  useUsersStore,
} from "../../index";
import { useEffect, useState } from "react";

export function Tabs() {
  const [activeTab, setActiveTab] = useState(0);
  const [isClient, setIsClient] = useState(false);

  const { datakardex } = useKardexStore();
  const { dataproductos } = useProductoStore();
  const { iduser } = useUsersStore();

  useEffect(() => {
    setIsClient(true); // Solo se activa en cliente
  }, []);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <Container className="container" $activeTab={`${activeTab * 100}%`}>
      <ul className="tabs">
        <li
          className={activeTab === 0 ? "active" : ""}
          onClick={() => handleTabClick(0)}
        >
          {<v.iconopie />}
          Kardex
        </li>
        <span className="glider"></span>
      </ul>
      <div className="tab-content">
        {activeTab === 0 && isClient && <TablaKardex data={datakardex} />}
        {activeTab === 1 && <div className="tab-content">Contenido de Ventas</div>}
        {activeTab === 2 && <div className="tab-content">Contenido de Compras</div>}
      </div>
    </Container>
  );
}


const Container = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  border: 1px solid #6a6b6c;
  border-radius: 15px;
  height: 100%;
  .tabs {
    list-style: none;
    display: flex;
    position: relative;
    border-radius: 100px;
    justify-content: space-between;
    top: 0;
    left: 0;
    flex-direction: column;
    @media ${Device.tablet} {
      flex-direction: row;
    }
    * {
      z-index: 2;
    }
    li {
      gap: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 54px;
      width: 180px;
      font-size: 1.25rem;
      font-weight: 500;
      border-radius: 99px;
      cursor: pointer;
      transition: color 0.15s ease-in;
    }
    .glider {
      position: absolute;
      color: "#fff";
      display: flex;
      height: 4px;
      width: 180px;
      background-color: #e05024;
      z-index: 1;
      border-radius: 15px;
      transition: 0.25s ease-out;
      transform: translateX(${(props) => props.activeTab});
      box-shadow: 0px 10px 20px -3px #ff5722;
      bottom: 0;
    }
  }

  .tab-content {
    margin-top: 20px;
    height: 100%;
    width: 100%;
  }
`;
