import { sendRequest } from "./zadania_service.js";
import { useState } from "react"

export function onNewTaskInfo(userID, backendLink, blad, zamknijOkno, callback) {
    const currentTime = new Date();
    currentTime.setDate(currentTime.getDate() + 1)

    const [nazwa, setName] = useState("")
    const [rodzic, setParent] = useState("0")
    const [data, setDate] = useState(`${currentTime.getFullYear()}-${`${currentTime.getMonth() + 1}`.padStart(2, 0)}-${`${currentTime.getDate()}`.padStart(2, 0)}T12:00`)
    const [dataNull, setNoDate] = useState(true)
    const onSubmit = async (e) => {
        e.preventDefault()
        let dataTemp = data;
        if (!dataNull) dataTemp = "NULL";
        const dane = {
            nazwa, rodzic, dataTemp
        }
        const response = await sendRequest(userID, backendLink, null, "POST", "noweZadanie", JSON.stringify(dane))
        if (response.status == 201 || response.status == 200) {
            zamknijOkno();
            callback();
        }
        else
            blad(0);
    }

    return {nazwa, setName, setParent, data, setDate, dataNull, setNoDate, onSubmit}
}