import { Routes,Route } from "react-router-dom"; 
import { Home } from "../pages/Home.jsx";
import { UserAuth } from "../context/AuthContext.jsx";
import {ProtectedRoute} from "../hooks/ProtecteRoute.jsx";
import { Login } from "../pages/Login.jsx";

export function MyRoutes() {
    const {user}= UserAuth();
return (
   
        <Routes>
            <Route path="/login" element={<Login/>} />

            <Route element ={<ProtectedRoute user={user} redirectTo="/login" />}>
            <Route path="/" element={<Home/>} />

            </Route>
        </Routes>

);
} 