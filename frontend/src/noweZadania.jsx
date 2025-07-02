import {useState} from "react"

const ZadForm = ({zadania, zamknijOkno, blad, callback, userID}) => {
    const currentTime = new Date();

    const [nazwa, setName] = useState("")
    const [rodzic, setParent] = useState("0")
    const [data, setDate] = useState(`${new Date().getFullYear()}-${`${new Date().getMonth()+1}`.padStart(2, 0)}-${`${new Date().getDate() + 1}`.padStart(2, 0)}T${`${new Date().getHours()}`.padStart(2, 0)}:${`${new Date().getMinutes()}`.padStart(2, 0)}`)
    const [waga, setWeight] = useState("10")

    const onSubmit = async(e) => {
        e.preventDefault()
        const dane = {
            nazwa, rodzic, data, waga, userID
        }
        const url = "https://tasks-backend.rogal-rogal.duckdns.org/noweZadanie/" + userID;
        const options = {
            method: "POST",
            headers:  {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(dane)
        }
        const response = await fetch(url, options)
        if (response.status == 201 || response.status == 200)
        {
            zamknijOkno();
            callback();
        }
        else
            blad(0);
    }
    console.log()
    return <form onSubmit={onSubmit}>
            <h2>Dodaj nowe zadanie</h2>
            <span id="error-message-form"></span>
            <label htmlFor="formNazwa">Nazwa</label>
            <input type="tekst" id="formNazwa" value={nazwa} onChange={(e) => setName(e.target.value)}/>
            <label htmlFor="formRodzic">Rodzic</label>
            <select id="formRodzic" onChange={(e) => setParent(e.target.value)}>
                <option value="0" selected>-</option>
                {zadania.filter((it) => it["parentID"]==0).map((zadanie) => 
                    (
                        <option value={zadanie['ID']}>{zadanie["nazwa"]}</option>
                    )
                )}
            </select>
            <label htmlFor="formData">Data</label>
            <input type="datetime-local" id="formData" defaultValue={data} onChange={(e) => setDate(String(e.target.value))}/>
            <label htmlFor="formWaga">Waga</label>
            <input type="number" id="formWaga" value={waga} onChange={(e) => setWeight(e.target.value)}/>
            <button type='submit' >Dodaj zadanie</button>
    </form>
}

export default ZadForm