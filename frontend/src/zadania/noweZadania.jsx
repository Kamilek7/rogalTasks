import { useState } from "react"
import { onNewTaskInfo } from "./zadania_newData"
import ErrorBar from "../utils/errorBar"
import HeaderText from "../utils/headerText"

const ZadForm = ({ backendLink, zadania, zamknijOkno, blad, callback, userID }) => {

    const formData = onNewTaskInfo(userID, backendLink, blad, zamknijOkno, callback)

    return <form onSubmit={formData.onSubmit}>
        <HeaderText>Dodaj nowe zadanie</HeaderText>
        <ErrorBar></ErrorBar>
        <label htmlFor="formNazwa">Nazwa</label>
        <input type="tekst" id="formNazwa" value={formData.nazwa} onChange={(e) => formData.setName(e.target.value)} />
        <label htmlFor="formRodzic">Rodzic</label>
        <select id="formRodzic" onChange={(e) => formData.setParent(e.target.value)} defaultValue={0}>
            <option value="0">-</option>
            {zadania.filter((it) => it["parentID"] == 0).map((zadanie) =>
            (
                <option key={zadanie['ID']} value={zadanie['ID']}>{zadanie["nazwa"]}</option>
            )
            )}
        </select>
        <div>
            <div className="flex items-center w-fit mx-auto px-4">
                <label className="block" htmlFor="formData">Data</label>
                <input className="ml-4 block" type='checkbox' checked={formData.dataNull} onChange={(e) => { formData.setNoDate(!formData.dataNull) }}></input>
            </div>

        </div>
        <input disabled={!formData.dataNull} type="datetime-local" id="formData" value={formData.dataNull ? formData.data : ''} onChange={(e) => formData.setDate(String(e.target.value))} />
        <button type='submit' >Dodaj zadanie</button>
    </form>
}

export default ZadForm