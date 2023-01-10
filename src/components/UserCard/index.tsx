import React, { useState } from "react";

import { ToastContainer } from "react-toastify";

import api from "../../services/api";
import { toastError, toastSuccess } from "../../components/Toast"
import { Modal } from "../Modal";
import { SelectSearchUser } from "../SelectUserSearch";

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

    const [users, setUsers] = useState<IUser[]>([])
    const [show, setShow] = useState<Boolean>(false)
    const [userData, setUserData] = useState<IUser>()

    const handleDelete = (e: number) => {
        try {
            api.delete(`/user?id=${e}`)
                .then((result) => {
                    toastSuccess(result.data.message)
                    setUsers([])
                })
        } catch (error) {
            toastError("Erro geral no sistema")
        }
    }

    const alterName = (cities: IUser) => {
        setUserData(cities)
        setShow(!show)
    }
    const handleSetUser = (e: IUser[]) => {
        setUsers(e)
    }
    return (
        <div className="container-card">
            <ToastContainer />
            <h1>Usuário</h1>
            <SelectSearchUser handleSetUser={handleSetUser} />
            {users.length > 0 &&
                <div className="user-description">
                    <Modal type={2} setShow={setShow} data={userData} show={show} title={"Alterar nome"} />
                    {users && users.map((user, index) => (
                        <div className="card-list" key={index}>
                            <div>
                                <span>Nome: {user.name}</span>
                            </div>
                            <span>E-mail: {user.email}</span>
                            <span>CPF: {user.cpf}</span>
                            <span>Dt.Nascimento: {user.birth}</span>
                            <span>Cidade: {user.city} - {user.state}</span>
                            <span>Sexo: {user.gender}</span>
                            <div>
                                <button className="button micro-btn" onClick={() => alterName(user)}>alterar</button>
                                <button className="button micro-btn" onClick={() => handleDelete(user.id)}>deletar</button>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default UserCard