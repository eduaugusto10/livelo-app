import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import api from "../../services/api";
import Header from "../../components/Header";
import { toastError, toastSuccess } from "../../components/Toast"

interface IStates {
    id: number,
    state: string,
    city: string,
    stateId: number
}

function CreateCity() {
    const history = useNavigate()
    const cityRef = useRef<HTMLInputElement>(null)
    const [states, setStates] = useState<IStates[]>([])
    const [stateChosen, setStateChosen] = useState<String>()

    useEffect(() => {
        api.get('/state')
            .then(result => {
                setStates(result.data)
            })
    }, [])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            api.post('/city', {
                city: cityRef.current?.value,
                stateId: stateChosen
            }).then((result) => {
                if (result.data.statusCode === 201)
                    toastSuccess(result.data.message)
                else
                    toastError(result.data.message)
            }).then(() => setTimeout(() => history("/"), 2000))
                .catch(() => toastError("Erro ao criar cidade"))
        } catch (error) {
            toastError("Erro ao criar cidade")
        }
    }
    const cityKey = (e: ChangeEvent<HTMLSelectElement>) => {
        setStateChosen(e.target.value)
    }

    return (
        <div className="container">
            <ToastContainer />
            <Header />
            <h1>Criar Cidade</h1>
            <form onSubmit={handleSubmit}>
                <h3>Insira o nome da cidade</h3>
                <input type={"text"} ref={cityRef} required />
                <h3>Escolha o Estado</h3>
                <div className="search-btn">
                    <select className='responsive-select' onChange={cityKey}>
                        <option hidden>Escolha o estado</option>
                        {states.map(element => <option key={element.id} value={element.id}>{element.state}</option>)}
                    </select>
                </div>
                <div>
                    <input className="button btn-small" type={"button"} value="Voltar" onClick={() => history('/')} />
                    <input className="button btn-small" type={"submit"} value="Registrar" />
                </div>
            </form>
        </div>
    )
}

export default CreateCity