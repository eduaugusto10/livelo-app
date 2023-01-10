import api from "../../services/api"
import { toastError, toastSuccess } from "../Toast"

export const updateCity = (city: String, id: number) => {
    try {
        api.put(`/city?id=${id}`, {
            city
        }).then((result) => {
            if (result.data.statusCode === 200)
                toastSuccess(result.data.message)
            else
                toastError(result.data.message)
        })
            .catch(() => toastError("Erro ao criar cidade"))
    } catch (error) {
        toastError("Erro ao criar cidade")
    }
}

export const updateName = (name: String, id: number) => {
    try {
        api.put(`/user?id=${id}`, {
            name: name
        }).then((result) => {
            if (result.data.statusCode === 200)
                toastSuccess(result.data.message)
            else
                toastError(result.data.message)
        })
            .catch(() => toastError("Erro ao criar cidade"))
    } catch (error) {
        toastError("Erro ao criar cidade")
    }
}