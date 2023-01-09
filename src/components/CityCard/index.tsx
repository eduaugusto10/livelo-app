import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { IMaskInput } from "react-imask";
import { ToastContainer } from "react-toastify";

import api from "../../services/api";
import { toastError, toastSuccess } from "../../components/Toast"
import { useNavigate } from "react-router-dom";

interface IUser {
    name: string,
    email: string,
    cpf: string,
    birth: string,
    city: string,
    gender: string
}

function CityCard() {
    const history = useNavigate()
    const ref = useRef()
    const cityRef = useRef<HTMLInputElement>(null)
    const stateRef = useRef<HTMLInputElement>(null)
    const [searchOption, setSearchOption] = useState(2)
    const [states, setStates] = useState("")


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            api.get(`/city?type=${1}&name=${cityRef.current?.value}&stateid=${states}`, {

            }).then((result) => {
                setStates(result.data.data)
                toastSuccess("Usuário criado com sucesso")
            }).then(() => setTimeout(() => history("/adm"), 2000))
                .catch(() => toastError("Nenhum usuário encontrado"))
        } catch (error) {
            toastError("Erro geral no sistema")
        }
    }

    const selectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setSearchOption(Number(value))
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
        </div>
    )
}

export default CityCard