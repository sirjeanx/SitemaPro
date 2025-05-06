import { Routes,Route } from "react-router-dom"; 
import { Home } from "../pages/Home.jsx";


export function MyRoutes() {
return (
   
        <Routes>
            <Route path="/" element={<Home/>} />
        </Routes>

);
} 