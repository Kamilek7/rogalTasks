import {useState} from "react"




const Harmonogram = ({harmonogram, zamknijOkno, blad, callback}) => {

    const [nazwa, setName] = useState("")
    const [waga, setPriority] = useState("")
    const [currentH, setCurrent] = useState("new")
    const [currentHID, setCurrentID] = useState("new")
    const [weekDayObject, setWeekDay] = useState([])
    

    harmonogram["new"] = {nazwa: "Nazwa",dni:[], waga:"10"};



    const setH = (e) =>
    {
        if (e!="new")
        {
            e = parseInt(e)
            setCurrentID(e)
            var elementPos = harmonogram.map((x) => {return x.ID; });
            var id = elementPos.indexOf(e)
            setCurrent(id)
            setWeekDay(harmonogram[id].dni);
        }
        else
        {
            setWeekDay([]);
            setCurrentID(e)
            setCurrent(e)
        }

    }

    const updateWeekDay = (value) => {
        var temp = weekDayObject
        if (document.getElementById(value).className=="harmoCellActive")
        {
            document.getElementById(value).classList.add("harmoCellDisabled")
            document.getElementById(value).classList.remove("harmoCellActive")
            temp.splice(temp.indexOf(value),1)
            
        }
        else{
            document.getElementById(value).classList.add("harmoCellActive")
            document.getElementById(value).classList.remove("harmoCellDisabled")
            temp.push(value)
            
        }
        setWeekDay(temp)
        
    }
    const onSubmit = async(e) => {
        e.preventDefault()
        var dniD;
        if (weekDayObject.length>0)
            dniD = weekDayObject.join(",")
        else
            dniD = ";"
        var dane = {
            nazwa, dniD, waga
        }
        var status = 0;
        if (currentHID=="new")
        {
            const url = "https://tasks-backend.rogal-rogal.duckdns.org/harmonogramCreate/1"
            const options = {
                method: "POST",
                headers:  {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(dane)
            }
            const response = await fetch(url, options);
            status = response.status
        }
        else
        {
            if (waga=="")
                dane.waga = harmonogram[currentH].waga
            if (nazwa=="")
                dane.nazwa = harmonogram[currentH].nazwa
            const url = "https://tasks-backend.rogal-rogal.duckdns.org/harmonogramEdit/" + currentHID
            const options = {
                method: "PATCH",
                headers:  {
                    "Content-Type" : "application/json"
                },
                body: JSON.stringify(dane)
            }
            const response = await fetch(url, options);
            status = response.status
        }
        if (status != 400 && status!=401)
        {
            zamknijOkno();
            callback();
        }
        else
            blad(1);
    }
    var wks = {"Poniedziałek":"a", "Wtorek":"b", "Środa":"c", "Czwartek":"d", "Piątek":"e"};
    var weeks = Object.keys(wks);
    var hours = Array(13).fill().map((x,i)=>i)
    return <form onSubmit={onSubmit}>
            <h2>Modyfikuj harmonogram</h2>
            <span id="error-message-form"></span>
            <select id='aktywnosc' onChange={(e) => setH(e.target.value)}>
                <option value='new'>Dodaj nowa aktywnosc</option>
                {harmonogram.map((h) => (
                    <option value={h['ID']}>{h['nazwa']}</option>
                ))}
            </select>
            <input id='nazwa' type='text' onChange={(e) => setName(e.target.value)} placeholder={harmonogram[currentH].nazwa}></input>
            <input id='waga' type='number' onChange={(e) => setPriority(e.target.value)} placeholder={harmonogram[currentH].waga}></input>
            <div class='harmContainer'>
                <table>
                    <tbody>
                        <tr><th>Godziny</th>{hours.map((hour)=> 
                        (<th>{hour+9}:00</th>))}</tr>
                            {weeks.map( (day) => 
                        (<tr>
                            <td>{day}</td>
                            {hours.map( (hour) => (<td>
                                <div id={wks[day]+hour} onClick={()=>{updateWeekDay(wks[day]+hour)}} class={harmonogram[currentH].dni.includes(wks[day]+hour) ? ("harmoCellActive") : "harmoCellDisabled"}>
                                </div>
                            </td>))}
                        </tr>))}
                    </tbody>
                </table>


            </div>
            <button type='submit' >Zaktualizuj harmonogram</button>
    </form>
}

export default Harmonogram