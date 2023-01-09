import React from "react";
import { useNavigate } from "react-router-dom";
import CityCard from "../../components/CityCard";
import Header from "../../components/Header";
import UserCard from "../../components/UserCard";

function Home() {
    const history = useNavigate()
    return (
        <div className="container">
            <Header />
            <h1>O que deseja fazer?</h1>
            <UserCard />
            <button onClick={() => history('/user-register')}>Registrar</button>
            <CityCard />
            <button onClick={() => history('/city-register')}>Registrar</button>
        </div>
    )
}

export default Home