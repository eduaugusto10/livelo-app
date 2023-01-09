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
            <div className="card-container">
                <div className="card">
                    <UserCard />
                    <button className="btn-small" onClick={() => history('/user-register')}>Registrar</button>
                </div>
                <div className="card">
                    <CityCard />
                    <button className="btn-small" onClick={() => history('/city-register')}>Registrar</button>
                </div>
            </div>
        </div>
    )
}

export default Home