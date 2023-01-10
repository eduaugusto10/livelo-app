import React, { ChangeEvent, useState } from 'react'
import { updateCity, updateName } from './modal-functions';
import './style.css'

export function Modal({ data, show, title, setShow, type }: any) {

    const [name, setName] = useState("")

    if (!show) {
        return null;
    }

    const updateType = () => {
        switch (type) {
            case 1:
                updateCity(name, data.id)
                setShow(!show)
                setName("")
                break;
            case 2:
                updateName(name, data.id)
                setShow(!show)
                setName("")
                break;
            default:
                break;
        }
    }
    const handleName = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }
    const handleCancelBtn = () => {
        setShow(!show)
        setName("")
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <h2>{title}</h2>
                <h5>Nome atual: {type === 1 ? data.city : data.name}</h5>
                <h5>Alterar para:</h5>
                <input type={"text"} value={name} onChange={handleName} />
                <div>
                    <button onClick={updateType}>Salvar</button>
                    <button onClick={handleCancelBtn}>Cancelar</button>
                </div>
            </div>
        </div >
    )
}
