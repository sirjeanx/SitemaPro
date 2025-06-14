import { useEffect, useState } from "react";
import styled from "styled-components";
import { v } from "../../../styles/variables";
import {
  InputText,
  Btnsave,
  useCategoriasStore,
  Selector,
  useProductoStore,
  useMarcaStore,
  ListaGenerica,
  BtnAdd,
  RegistrarMarca,
  RegistrarCategorias,
  useUsersStore,
  TipoDocData,
  TipouserData,
  ListaModulos,
  usePermisosStore
} from "../../../index";
import { Device } from "../../../styles/breackpoints";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
// import { CirclePicker } from "react-color";
// import Emojipicker from "emoji-picker-react";
import { useEmpresaStore } from "../../../store/EmpresaStore";

export function RegistrarUsers({ onClose, dataSelect, accion }) {
  const [typedoc, setTypedoc] = useState({ icono: "", descripcion: "dni" });
  const { insertarproductos, editarproductos } = useProductoStore();
  const [checkboxs, setCheckboxs] = useState([]);
const [mostrarPermisosEdit] = usePermisosStore();


  // const { datamarca, selectMarca, marcaItemSelect } = useMarcaStore();
  const { datausers, insertarusers, editarusers } = useUsersStore();
  // const { datacategorias, categoriasItemSelect, selectcategorias } =
  //   useCategoriasStore();
  const { dataempresa } = useEmpresaStore();
  const [stateMarca, setStateMarca] = useState(false);
  const [stateCategoria, setStateCategoria] = useState(false);
  const [typeuser, setTipouser] = useState({
    icono: "",
    descripcion: "empleado",
  });
  const [openRegistroMarca, SetopenRegistroMarca] = useState(false);
  const [openRegistroCategoria, SetopenRegistroCategoria] = useState(false);
  const [subaccion, setAccion] = useState("");
    const { isLoading } = useQuery({
    queryKey: ["mostrarpermisosedit", { id_user: dataSelect.id }],
    queryFn: () => mostrarPermisosEdit({ id_user: dataSelect.id }),
    enabled: dataSelect.id != null,
  });

  const {
    register,
    formState: { errors, isDirty },
    handleSubmit,
    watch,
  } = useForm();
  async function insertar(data) {
    if (accion === "Editar") {
      const p = {
        id: dataSelect.id,
        name: data.name,
        n_doc: data.n_doc,
        phone: data.phone,
        adress: data.adress,
        state: "activo",
        typeuser: typeuser.descripcion,
        typedoc: typedoc.descripcion,
      };

      await editarusers(p, checkboxs, dataempresa.id);

      onClose();
    } else {
      const p = {
        id: dataSelect.id,
        name: data.name,
        n_doc: data.n_doc,
        phone: data.phone,
        adress: data.adress,
        state: "activo",
        typeuser: typeuser.descripcion,
        typedoc: typedoc.descripcion,
        id_empresa: dataempresa.id,
      };
          const parametrosAuth = {
        correo: data.correo,
        pass: data.pass,
      };
      await insertarusers(parametrosAuth, p, checkboxs);
      onClose();
    }
  }
  useEffect(() => {
    if (accion === "Editar") {
      setTypedoc({ icono: "", descripcion: dataSelect.typedoc });
      setTipouser({
        icono: "",
        descripcion: dataSelect.typedoc,
      });

    }
  }, []);
  if(isLoading){
    return <span>Cargando .....</span>
  }

  return (
    <Container>
      <div className="sub-contenedor">
        <div className="headers">
          <section>
            <h1>
              {accion == "Editar"
                ? "Editar personal"
                : "Registrar nuevo personal"}
            </h1>
          </section>

          <section>
            <span onClick={onClose}>x</span>
          </section>
        </div>
        <form className="formulario" onSubmit={handleSubmit(insertar)}>
          <section className="seccion1">
            <article>
              <InputText icono={<v.icononombre />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.correo}
                  type="text"
                  placeholder=""
                  {...register("correo", {
                    required: true,
                  })}
                />
                <label className="form__label">Correo</label>

                {errors.correo?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <article>
              <InputText icono={<v.icononombre />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.pass}
                  type="text"
                  placeholder=""
                  {...register("pass", {
                    required: true,
                  })}
                />
                <label className="form__label">Contraseña</label>

                {errors.pass?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <article>
              <InputText icono={<v.icononombre />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.name}
                  type="text"
                  placeholder=""
                  {...register("name", {
                    required: true,
                  })}
                />
                <label className="form__label">Nombre</label>

                {errors.name?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <ContainerSelector>
              <label>Tipo doc: </label>
              <Selector
                state={stateMarca}
                color="#fc6027"
                texto1="🎴"
                texto2={typedoc.descripcion}
                funcion={() => setStateMarca(!stateMarca)}
              />

              {stateMarca && (
                <ListaGenerica
                  bottom="-260px"
                  scroll="scroll"
                  setState={() => setStateMarca(!stateMarca)}
                  data={TipoDocData}
                  funcion={(p) => setTypedoc(p)}
                />
              )}

              {subaccion}
            </ContainerSelector>

            <article>
              <InputText icono={<v.iconostock />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.n_doc}
                  type="number"
                  placeholder=""
                  {...register("n_doc", {
                    required: true,
                  })}
                />
                <label className="form__label">Nro. doc</label>

                {errors.n_doc?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <article>
              <InputText icono={<v.iconostockminimo />}>
                <input
                  step="0.01"
                  className="form__field"
                  defaultValue={dataSelect.phone}
                  type="text"
                  placeholder=""
                  {...register("phone", {
                    required: true,
                  })}
                />
                <label className="form__label">Telefono</label>

                {errors.phone?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
            <article>
              <InputText icono={<v.iconocodigobarras />}>
                <input
                  className="form__field"
                  defaultValue={dataSelect.adress}
                  type="text"
                  placeholder=""
                  {...register("adress", {
                    required: true,
                  })}
                />
                <label className="form__label">Direccion</label>

                {errors.adress?.type === "required" && <p>Campo requerido</p>}
              </InputText>
            </article>
          </section>
          <section className="seccion2">
            <ContainerSelector>
              <label>Tipo: </label>
              <Selector
                state={stateCategoria}
                color="#fc6027"
                texto1="👷‍♂️"
                texto2={typeuser.descripcion}
                funcion={() => setStateCategoria(!stateCategoria)}
              />

              {stateCategoria && (
                <ListaGenerica
                  bottom="-150px"
                  scroll="scroll"
                  setState={() => setStateCategoria(!stateCategoria)}
                  data={TipouserData}
                  funcion={(p) => setTipouser(p)}
                />
              )}
            </ContainerSelector>
            PERMISOS:🔑
            <ListaModulos
              accion={accion}
              setCheckboxs={setCheckboxs}
              checkboxs={checkboxs}
              typeuser={typeuser}
              
            />
            {/* {checkboxs.map((item, index) => {
              if (item.check) {
                return <span>{item.nombre}</span>;
              } else {
                return null;
              }
            })} */}
          </section>
          <div className="btnguardarContent">
            <Btnsave
              icono={<v.iconoguardar />}
              titulo="Guardar"
              bgcolor="#EF552B"
            />
          </div>
        </form>
      </div>
    </Container>
  );
}
const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .sub-contenedor {
    overflow-y: auto;
    overflow-x: hidden;
    height: 90vh;

    &::-webkit-scrollbar {
      width: 6px;
      border-radius: 10px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #484848;
      border-radius: 10px;
    }
    width: 100%;
    max-width: 90%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .formulario {
      display: grid;
      grid-template-columns: 1fr;
      gap: 15px;
      @media ${Device.tablet} {
        grid-template-columns: repeat(2, 1fr);
      }
      section {
        gap: 20px;
        display: flex;
        flex-direction: column;
      }
      .btnguardarContent {
        display: flex;
        justify-content: end;
        grid-column: 1;
        @media ${Device.tablet} {
          grid-column: 2;
        }
      }
    }
  }
`;

const ContainerSelector = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  position: relative;
`;
