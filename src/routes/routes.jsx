import { Routes,Route } from "react-router-dom"; 
import { Home,Login } from "../index.js";
import { UserAuth } from "../context/AuthContext.jsx";
import {ProtectedRoute} from "../hooks/ProtecteRoute.jsx";

export function MyRoutes() {
    const {user}= UserAuth();
return (
   
        <Routes>
            <Route path="/login" element={<Login/>} />

            <Route path="/" element={<Home/>} />
            <Route element ={<ProtectedRoute user={user} redirectTo="/login" />}>

            </Route>
        </Routes>

);
} 