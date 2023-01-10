import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateCity from "../pages/CityRegister";
import Home from "../pages/Home";
import CreateUser from "../pages/UserRegister";

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user-register" element={<CreateUser />} />
            <Route path="/city-register" element={<CreateCity />} />
            <Route path="*" element={<Home />} />
        </Routes>
    </BrowserRouter>
)

export default Router