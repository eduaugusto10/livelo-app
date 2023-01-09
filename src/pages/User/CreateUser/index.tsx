import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { IMaskInput } from "react-imask";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import api from "../../../services/api";
import { toastError, toastSuccess } from "../../../components/Toast"
import Header from "../../../components/Header";
import { SelectStateKeys } from "../../../components/SelectStateKeys";
import { SelectGenderKeys } from "../../../components/SelectGenderKeys";

function CreateUser() {

    const history = useNavigate()
    const ref = useRef()
    const nameRef = useRef<HTMLInputElement>(null)
    const cpfRef = useRef<HTMLInputElement>(null)
    const birthRef = useRef<HTMLInputElement>(null)
    const emailRef = useRef<HTMLInputElement>(null)
    const [cityId, setCityId] = useState<Number>();
    const [genderId, setGenderId] = useState<Number>();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            api.post('/user', {
                name: nameRef.current?.value,
                cpf: cpfRef.current?.value,
                genderId: genderId,
                birth: birthRef.current?.value,
                email: emailRef.current?.value,
                cityId: cityId,
            }).then((result) => {
                if (result.data.statusCode === 200) toastSuccess(result.data.data.message)
                else toastError(result.data.message)
            }).then(() => setTimeout(() => history("/"), 2000))
                .catch(() => toastError("Erro ao criar usuário"))
        } catch (error) {
            toastError("Erro ao criar usuário")
        }
    }

    const childToParent = (e: ChangeEvent<HTMLSelectElement>) => {
        setCityId(parseInt(e.target.value))
    }
    const genderProps = (e: ChangeEvent<HTMLSelectElement>) => {
        setGenderId(parseInt(e.target.value))
    }

    return (
        <div className="container">
            <ToastContainer />
            <Header />
            <h1>Registrar usuário</h1>
            <form onSubmit={handleSubmit}>
                <h3>Nome completo</h3>
                <input type={"text"} ref={nameRef} required />
                <h3>CPF</h3>
                <IMaskInput
                    ref={ref}
                    mask={"000.000.000-00"} inputRef={cpfRef} />
                <h3>Sexo</h3>
                <SelectGenderKeys genderProps={genderProps} />
                <h3>Data de nascimento</h3>
                <input type={"date"} ref={birthRef} required />
                <h3>E-mail</h3>
                <input type={"email"} ref={emailRef} required />
                <h3>Cidade</h3>
                <div className="search-btn">
                    <SelectStateKeys childToParent={childToParent} />
                </div>
                <div>
                    <input className="button btn-small" type={"button"} value="Voltar" onClick={() => history('/')} />
                    <input className="button btn-small" type={"submit"} value="Registrar" />
                </div>
            </form>
        </div>
    )
}

export default CreateUser