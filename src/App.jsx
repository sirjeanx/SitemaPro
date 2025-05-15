import { useState } from "react";
import { AuthContextProvider, Light, Dark, Sidebar } from "./index";
import { MyRoutes } from "./routes/routes";
import styled, { ThemeProvider } from "styled-components";
import { createContext } from "react";
import { Device } from "./index";
import { MenuNavbar } from "./components/organismos/MenuNavbar";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
export const ThemeContext = createContext(null);

function App() {
  const [themeuse, setTheme] = useState("dark");
  const theme = themeuse === "light" ? "light" : "dark";
  const themeStyle = themeuse === "light" ? Light : Dark;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ThemeProvider theme={themeStyle}>
          <AuthContextProvider>
            <Contenier className={sidebarOpen ? "active" : ""}>
              <section className="ContentSidebar">
                <Sidebar
                  state={sidebarOpen}
                  setState={() => setSidebarOpen(!sidebarOpen)}
                />
              </section>
              <section className="ContentMenu">
                <MenuNavbar></MenuNavbar>
              </section>
              <section className="ContentRoutes">
                <MyRoutes />
              </section>
            </Contenier>
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthContextProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}
const Contenier = styled.main`
display: grid;
grid-template-columns: 1fr;
background-color: ${({ theme }) => theme.bgtotal};
.ContentSidebar{
display: none;
}
.ContentMenu{
  display : block;
  position:absolute;
  left: 20px
}
@media ${Device.tablet}{
  grid-template-columns: 65px 1fr;
&.active{
grid-template-columns: 220px 1fr;
}
.ContentSidebar{
display:initial;
}
.ContentMenu{
  display : none;
  }
}
.ContentRoutes{
  grid-column: 1;
  width: 100%;
@media ${Device.tablet}{
  grid-column: 2; 
    }
`;

export default App;
