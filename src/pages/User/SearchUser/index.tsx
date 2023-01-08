import React, { FormEvent, useRef, useState, ChangeEvent } from "react";
import { IMaskInput } from "react-imask";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import api from "../../../services/api";
import { toastError, toastSuccess } from "../../../components/Toast"

function SearchUser() {

    const history = useNavigate()
    const ref = useRef()
    const nameRef = useRef<HTMLInputElement>(null)
    const cpfRef = useRef<HTMLInputElement>(null)
    const genderRef = useRef<HTMLInputElement>(null)
    const birthRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const cityRef = useRef<HTMLInputElement>(null)
    const [searchOption, setSearchOption] = useState("name")
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            api.post('/user', {
                name: nameRef.current?.value,
                cpf: cpfRef.current?.value,
                gender: genderRef.current?.value,
                birth: birthRef.current?.value,
                email: emailRef.current?.value,
                city: cityRef.current?.value,
            }).then(() => {
                toastSuccess("Usuário criado com sucesso")
            }).then(() => setTimeout(() => history("/adm"), 2000))
                .catch(() => toastError("Nenhum usuário encontrado"))
        } catch (error) {
            toastError("Erro geral no sistema")
        }
    }

    const selectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setSearchOption(value)
    }
    return (
        <div>
            <ToastContainer />
            <h1>Procurar usuário</h1>
            <form onSubmit={handleSubmit}>
                {searchOption === "name" &&
                    <div>
                        <h3>Insira o nome</h3>
                        <input type={"text"} ref={nameRef} />
                    </div>}
                {searchOption === "CPF" &&
                    <div>
                        <h3>Insira o CPF</h3>
                        <IMaskInput
                            ref={ref}
                            mask={"000.000.000-00"} inputRef={cpfRef} />
                    </div>}
                <select onChange={selectChange}>
                    <option value={"name"}>Nome</option>
                    <option value={"CPF"}>CPF</option>
                </select>
                <div>
                    <input className="button" type={"submit"} value="Voltar" />
                    <input className="button" type={"submit"} value="Procurar" />
                </div>
            </form>
        </div>
    )
}

export default SearchUser