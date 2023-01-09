import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { IMaskInput } from "react-imask";
import { ToastContainer } from "react-toastify";

import api from "../../services/api";
import { toastError, toastSuccess } from "../../components/Toast"
import { useNavigate } from "react-router-dom";

interface ICities {
    id: number,
    state: String,
    city: String,
    stateId: String
}

function CityCard() {
    const cityRef = useRef<HTMLInputElement>(null)
    const [cities, setCities] = useState<ICities[]>([])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            api.get(`/city?type=${1}&name=${cityRef.current?.value}&stateid=`)
                .then((result) => {
                    setCities(result.data.data)
                }).catch(() => toastError("Nenhum usuário encontrado"))
        } catch (error) {
            toastError("Erro geral no sistema")
        }
    }
    const handleDelete = (e: Number) => {
        try {
            api.delete(`/city?id=${e}`)
                .then((result) => {
                    if (result.data.statusCode === 200) toastSuccess(result.data.message)
                    else toastError(result.data.message)
                    setCities([])
                }).catch(() => toastError("Erro ao deletar cidade"))
        } catch (error) {
            toastError("Erro geral no sistema")
        }
    }

    return (
        <div className="container-card">
            <h1>Cidade</h1>
            <form onSubmit={handleSubmit}>
                <h3>Localizar</h3>
                <div className="search-btn">
                    <input type={"text"} ref={cityRef} />
                    <input className="button search" type={"submit"} value="Procurar" />
                </div>
            </form>
            {cities.length > 0 &&
                <div className="user-description">
                    {cities && cities.map((city, index) => (
                        <div key={index}>
                            <div>
                                <span>{city.city} - {city.state}</span>
                                <div>
                                    <button className="button micro-btn">alterar</button>
                                    <button className="button micro-btn" onClick={() => handleDelete(city.id)}>deletar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default CityCard