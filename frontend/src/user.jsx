import { useState, useEffect} from 'react'
import './App.css'
import './css/fontello.css'

function UserConfig({dane, zamknijOkno, blad, userID, callback, logout}) {

    const [login, setLogin] = useState(dane[0]["login"]);
    const [pass, setPass] = useState("");
    const [dc, setDc] = useState(dane[0]["discord"]);
    const [pow, setNot] = useState(dane[0]["ilePowiadomien"]);
    const [mode, setMode] = useState("dane");
    const traits = [{name:"Login", value: login, change:setLogin, nameSQL:"login"}, {name: "Hasło", value:pass, change:setPass, nameSQL:"haslo", type:"password"}, {name: "ID w Discordzie", value:dc, change:setDc, nameSQL:"discord"}, {name: "Ilość powiadomień", value:pow, change:setNot, nameSQL:"ilePowiadomien", type: "number", extra:{'min':0, 'max':16}}];

    const removeAcc = async () =>
    {
        const url = "https://tasks-backend.rogalrogalrogalrogal.online/userRemove/" +userID;
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        }
        const response = await fetch(url, options);
        zamknijOkno();
        logout();
    }

    const update = async (element) =>
    {
        const url = "https://tasks-backend.rogalrogalrogalrogal.online/userChange/" +userID;
        const danet = {
            what: element.nameSQL,
            value: element.value
        }
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(danet)
        }
        const response = await fetch(url, options);
        callback();
    }

  return <>
  
    <form onSubmit={(e)=>{e.preventDefault();}}>
        
            {mode=="dane"?(<div><div style={{fontSize:"2vw", fontWeight:"bold", marginBottom:"1.1vw"}}>Panel użytkownika</div>
            <h2 style={{marginBottom:"-0.4vw"}}>Zmień dane:</h2>
            <span style={{color:"red", height:"3vh", textAlign:"center"}} id='error-message-form'></span>
            {traits.map(element => {
                return (<div class='formRow' style={{margin:"1.4vw auto", display:"flex", width:"fit-content", marginRight: "37%", marginLeft:"auto"}}>
                    <label >{element.name}</label>
                    <input {...element.extra} type={element.type} value={element.value} onChange={(e) => {element.change(e.target.value)}}></input>
                    <input id='submit' onClick={()=>update(element)} style={{marginLeft: "1.4vw"}} type='submit' value='Zmień'></input>
                </div>)
            })}
            <button style={{backgroundColor:"rgb(59, 66, 136)"}} onClick={()=>{window.open('https://discord.com/oauth2/authorize?client_id=1092757546420416522', '_blank')}}>Dodaj bota do swojego serwera</button>
            <button style={{backgroundColor:"#602323"}} onClick={()=>{removeAcc()}}>Usuń konto</button>
            <button onClick={()=>{setMode("historia")}}>Pokaż historię zadań</button></div>):
            (
                <div><div style={{fontSize:"2vw", fontWeight:"bold", marginBottom:"1.1vw"}}>Historia zadań</div>
                <table class='history' ><tr><th>Nazwa</th><th>Data</th><th>Status</th></tr>
                {
                    dane.map(zadania => {
                        return (
                            <tr><td>{zadania["nazwa"]}</td><td>{zadania["data"]}</td><td>{zadania['status']}</td></tr>
                        )
                    })
                }
                </table>
            <button onClick={()=>{setMode("dane")}}>Pokaż dane</button></div>)
            }

    </form>
  </>
}

export default UserConfig
