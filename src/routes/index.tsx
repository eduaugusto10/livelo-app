import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateCity from "../pages/City/CreateCity";
import Home from "../pages/Home";
import ChangeUser from "../pages/User/ChangeUser";
import CreateUser from "../pages/User/CreateUser";
import SearchUser from "../pages/User/SearchUser";

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user-register" element={<CreateUser />} />
            <Route path="/user-change" element={<ChangeUser />} />
            <Route path="/user-search" element={<SearchUser />} />
            <Route path="/city-register" element={<CreateCity />} />
            <Route path="*" element={<Home />} />
        </Routes>
    </BrowserRouter>
)

export default Router