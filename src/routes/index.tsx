import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import CreateUser from "../pages/User/CreateUser";
import SearchUser from "../pages/User/SearchUser";

const Router = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<CreateUser />} />
            <Route path="/user-search" element={<SearchUser />} />
            <Route path="*" element={<Home />} />
        </Routes>
    </BrowserRouter>
)

export default Router