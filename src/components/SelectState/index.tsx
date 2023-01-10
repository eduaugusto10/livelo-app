import React, { ChangeEvent, useEffect, useState } from "react"
import api from "../../services/api"

interface IStates {
    id: number,
    state: string,
    city: string,
    stateId: number
}

export function SelectState({ childToParent }: any) {
    const [states, setStates] = useState<IStates[]>([])
    const [cities, setCities] = useState<IStates[]>([])
    useEffect(() => {
        api.get('/state')
            .then(result => {
                setStates(result.data)
            })
    }, [])

    const cityKey = (e: ChangeEvent<HTMLSelectElement>) => {

        api.get(`/city?type=2&stateid=${e.target.value}`)
            .then(result => {
                setCities(result.data.data)
            })
    }

    return (
        <div>
            <select onChange={cityKey}>
                <option hidden>Escolha o estado</option>
                {states.map(element => <option key={element.id} value={element.id}>{element.state}</option>)}
            </select>
            <select className="select-city" onChange={childToParent}>
                <option hidden>Escolha a cidade</option>
                {cities.map(element => <option key={element.id} value={element.id}>{element.city}</option>)}
            </select>
        </div>)
}

