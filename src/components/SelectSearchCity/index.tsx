import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react"
import api from "../../services/api"
import { toastError } from "../Toast"

interface IStates {
    id: number,
    state: string,
    city: string,
    stateId: number
}

export function SelectSearchCity({ handleSetCity }: any) {

    const cityRef = useRef<HTMLInputElement>(null)
    const [searchOption, setSearchOption] = useState<Number>(1)
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
            api.get(`/city?type=${searchOption}&name=${cityRef.current?.value}&stateid=${stateChosen}`)
                .then((result) => {
                    handleSetCity(result.data.data)
                }).catch(() => toastError("Nenhuma cidade encontrada"))
        } catch (error) {
            toastError("Erro geral no sistema")
        }
    }

    const selectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setSearchOption(Number(value))
    }

    const cityKey = (e: ChangeEvent<HTMLSelectElement>) => {
        setStateChosen(e.target.value)
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Localizar</h3>
                <div className="search-btn">
                    {searchOption === 1 &&
                        <div>
                            <input className="input-home" type={"text"} ref={cityRef} required />
                        </div>}
                    {searchOption === 2 &&
                        <div>
                            <select className="select-small" onChange={cityKey}>
                                <option hidden>Escolha o estado</option>
                                {states.map(element => <option key={element.id} value={element.id}>{element.state}</option>)}
                            </select>
                        </div>}
                    <select onChange={selectChange}>
                        <option value={1}>Cidade</option>
                        <option value={2}>Estado</option>
                    </select>
                    <input className="button search" type={"submit"} value="Procurar" />
                </div>
            </form>
        </div>
    )
}