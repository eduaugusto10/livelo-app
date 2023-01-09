import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { IMaskInput } from "react-imask";
import { ToastContainer } from "react-toastify";

import api from "../../services/api";
import { toastError, toastSuccess } from "../../components/Toast"
import { useNavigate } from "react-router-dom";

interface IUser {
    id: number
    name: string,
    email: string,
    cpf: string,
    birth: string,
    city: string,
    gender: string,
    state: string
}

function UserCard() {
    const history = useNavigate()
    const ref = useRef()
    const nameRef = useRef<HTMLInputElement>(null)
    const cpfRef = useRef<HTMLInputElement>(null)
    const [searchOption, setSearchOption] = useState(1)
    const [user, setUser] = useState<IUser[]>([])
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            api.get(`/user?type=${searchOption}&cpf=${cpfRef.current?.value}&name=${nameRef.current?.value}`, {

            }).then((result) => {
                setUser(result.data.data)
                if (result.data.data.length === 0)
                    toastError("Nenhum usuário encontrado")
            })
        } catch (error) {
            toastError("Erro geral no sistema")
        }
    }

    const handleDelete = (e: number) => {
        try {
            api.delete(`/user?id=${e}`)
                .then((result) => {
                    setUser(result.data.data)
                    toastSuccess("Usuário deletado com sucesso")
                })
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
            <ToastContainer />
            <h1>Usuário</h1>
            <form onSubmit={handleSubmit}>
                <h3>Localizar</h3>
                <div className="search-btn">
                    {searchOption === 1 &&
                        <div>
                            <input type={"text"} ref={nameRef} required />
                        </div>}
                    {searchOption === 2 &&
                        <div>
                            <IMaskInput
                                ref={ref}
                                mask={"000.000.000-00"} inputRef={cpfRef} />
                        </div>}
                    <select onChange={selectChange}>
                        <option value={1}>Nome</option>
                        <option value={2}>CPF</option>
                    </select>
                    <input className="button search" type={"submit"} value="Procurar" />
                </div>
            </form>
            {user.length > 0 &&
                <div className="user-description">
                    <div>
                        <span>Nome: {user[0].name}</span><button className="button micro-btn">alterar</button>
                    </div>
                    <span>E-mail: {user[0].email}</span>
                    <span>CPF: {user[0].cpf}</span>
                    <span>Dt.Nascimento: {user[0].birth}</span>
                    <span>Cidade: {user[0].city} - {user[0].state}</span>
                    <span>Sexo: {user[0].gender}</span>
                    <div>
                        <button className="btn-small" onClick={() => handleDelete(user[0].id)}>Deletar</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default UserCard