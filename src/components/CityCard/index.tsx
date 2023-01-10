import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import api from "../../services/api";
import { toastError, toastSuccess } from "../../components/Toast"
import { Modal } from "../Modal";
import { SelectSearchCity } from "../SelectSearchCity";

interface ICities {
    id: number,
    state: String,
    city: String,
    stateId: String
}
interface IStates {
    id: number,
    state: string,
    city: string,
    stateId: number
}

function CityCard() {
    const [cities, setCities] = useState<ICities[]>([])
    const [show, setShow] = useState<Boolean>(false)
    const [cityData, setCityData] = useState<ICities>()

    const handleDelete = (e: Number) => {
        try {
            api.delete(`/city?id=${e}`)
                .then((result) => {
                    if (result.data.statusCode === 200) {
                        toastSuccess(result.data.message)
                        setCities([])
                    }
                    else toastError(result.data.message)
                }).catch(() => toastError("Erro ao deletar cidade"))
        } catch (error) {
            toastError("Erro geral no sistema")
        }
    }

    const alterCityName = (cities: ICities) => {
        setCityData(cities)
        setShow(!show)
    }
    const handleSetCity = (e: ICities[]) => {
        setCities(e)
    }
    return (
        <div className="container-card">
            <h1>Cidade</h1>
            <SelectSearchCity handleSetCity={handleSetCity} />
            {cities.length > 0 &&
                <div className="user-description">
                    <Modal type={1} setShow={setShow} show={show} data={cityData} title={"Alterar nome da cidade"} />
                    {cities && cities.map((city, index) => (
                        <div className="card-list" key={index}>
                            <div>
                                <span>{city.city} - {city.state}</span>
                                <div>
                                    <button className="button micro-btn" onClick={() => alterCityName(city)}>alterar</button>
                                    <button className="button micro-btn" onClick={() => handleDelete(city.id)}>deletar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default CityCard