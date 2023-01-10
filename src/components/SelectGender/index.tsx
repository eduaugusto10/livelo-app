import { useEffect, useState } from "react"
import api from "../../services/api"

interface IStates {
    id: number,
    gender: string
}

export function SelectGender({ genderProps }: any) {
    const [genders, setGenders] = useState<IStates[]>([])

    useEffect(() => {
        api.get('/gender')
            .then(result => {
                setGenders(result.data)
            })
    }, [])

    return (
        <div>
            <select className="select-gender" onChange={genderProps} required>
                <option hidden>Selecione sexo</option>
                {genders.map(element => <option key={element.id} value={element.id}>{element.gender}</option>)}
            </select>
        </div>
    )
}

