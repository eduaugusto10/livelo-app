import { ChangeEvent, FormEvent, useRef, useState } from "react"
import api from "../../services/api"
import { InputCPF } from "../InputCPF"
import { toastError } from "../Toast"

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

export function SelectSearchUser({ handleSetUser }: any) {
    const nameRef = useRef<HTMLInputElement>(null)
    const [searchOption, setSearchOption] = useState<Number>(1)
    const [cpfValue, setCPFValue] = useState<String>()

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            api.get(`/user?type=${searchOption}&cpf=${cpfValue}&name=${nameRef.current?.value}`, {

            }).then((result) => {
                handleSetUser(result.data.data)
                if (result.data.data.length === 0)
                    toastError(result.data.message)
            })
        } catch (error) {
            toastError("Erro geral no sistema")
        }
    }

    const handleCPF = (e: string) => {
        setCPFValue(e)
    }

    const selectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setSearchOption(Number(value))
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h3>Localizar</h3>
                <div className="search-btn">
                    {searchOption === 1 &&
                        <div>
                            <input type={"text"} ref={nameRef} required />
                        </div>}
                    {searchOption === 2 &&
                        <div>
                            <InputCPF handleCPF={handleCPF} />
                        </div>}
                    <select onChange={selectChange}>
                        <option value={1}>Nome</option>
                        <option value={2}>CPF</option>
                    </select>
                    <input className="button search" type={"submit"} value="Procurar" />
                </div>
            </form>
        </div>
    )
}