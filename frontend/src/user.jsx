import { useState, useEffect} from 'react'
import './App.css'
import './css/fontello.css'

function UserConfig({dane, zamknijOkno, blad, userID}) {

    const [login, setLogin] = useState(dane[0]["login"]);
    const [pass, setPass] = useState("");
    const [dc, setDc] = useState(dane[0]["discord"]);
    const [mode, setMode] = useState("dane");
    const traits = [{name:"Login", value: login, change:setLogin}, {name: "Hasło", value:pass, change:setPass}, {name: "DC ID", value:dc, change:setDc}];
    console.log(dane);
  return <>
  
    <form onSubmit={(e)=>{e.preventDefault()}}>
        
            {mode=="dane"?(<div><div style={{fontSize:"2vw", fontWeight:"bold", marginBottom:"1.1vw"}}>Panel użytkownika</div>
            <h2 style={{marginBottom:"-0.4vw"}}>Zmień dane:</h2>
            <span style={{color:"red", height:"3vh", textAlign:"center"}} id='errorCode'></span>
            {traits.map(element => {
                return (<div class='formRow' style={{margin:"1.4vw auto", display:"flex", width:"fit-content"}}>
                    <label >{element.name}</label>
                    <input value={element.value} onChange={(e) => {e.target.value}} type='text'></input>
                    <input id='submit' style={{marginLeft: "1.4vw"}} type='submit' value='Zmień'></input>
                </div>)
            })}
            <button onClick={()=>{setMode("historia")}}>Pokaż historię zadań</button></div>):
            (
                <div><div style={{fontSize:"2vw", fontWeight:"bold", marginBottom:"1.1vw"}}>Historia zadań</div>
                <table style={{margin:"auto",display:"block",width:"70%",maxHeight:"40vh", overflow:"scroll"}}>
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
