import React, { FormEvent, useRef } from "react";
import { IMaskInput } from "react-imask";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import api from "../../../services/api";
import { toastError, toastSuccess } from "../../../components/Toast"

function CreateUser() {

    const history = useNavigate()
    const ref = useRef()
    const nameRef = useRef<HTMLInputElement>(null)
    const cpfRef = useRef<HTMLInputElement>(null)
    const genderRef = useRef<HTMLInputElement>(null)
    const birthRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const cityRef = useRef<HTMLInputElement>(null)

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
                .catch(() => toastError("Erro ao criar usuário"))
        } catch (error) {
            toastError("Erro ao criar usuário")
        }
    }
    return (
        <div>
            <ToastContainer />
            <h1>Registrar usuário</h1>
            <form onSubmit={handleSubmit}>
                <h3>Nome completo</h3>
                <input type={"text"} ref={nameRef} />
                <h3>CPF</h3>
                <IMaskInput
                    ref={ref}
                    mask={"000.000.000-00"} inputRef={cpfRef} />
                <h3>Sexo</h3>
                <input />
                <h3>Data de nascimento</h3>
                <input type={"date"} ref={birthRef} />
                <h3>E-mail</h3>
                <input type={"email"} ref={emailRef} />
                <h3>Cidade</h3>
                <input type={"text"} ref={cityRef} />
                <div>
                    <input className="button" type={"submit"} value="Voltar" />
                    <input className="button" type={"submit"} value="Registrar" />
                </div>
            </form>
        </div>
    )
}

export default CreateUser