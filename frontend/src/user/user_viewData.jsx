import { userManager } from './user_service.js';
import { useUserData } from './user_data.js';

function UserViewData({backendLink, dane, zamknijOkno, userID, callback, logout}) {

    const traits = useUserData(dane).traits
    const {removeAcc, update} = userManager(userID, backendLink, zamknijOkno, logout, callback)
    return <>
            <div style={{fontSize:"2vw", fontWeight:"bold", marginBottom:"1.1vw"}}>Panel użytkownika</div>
            <h2 style={{marginBottom:"-0.4vw"}}>Zmień dane:</h2>
            <span style={{color:"red", height:"3vh", textAlign:"center"}} id='error-message-form'></span>
                {traits.map(element => {
                    return (<div className='formRow' style={{margin:"1.4vw auto", display:"flex", width:"fit-content", marginRight: "37%", marginLeft:"auto"}}>
                        <label >{element.name}</label>
                        <input {...element.extra} type={element.type} value={element.value} onChange={(e) => {element.change(e.target.value)}}></input>
                        <input id='submit' onClick={()=>update(element)} style={{marginLeft: "1.4vw"}} type='submit' value='Zmień'></input>
                    </div>)
            })}
            <button style={{backgroundColor:"rgb(59, 66, 136)"}} onClick={()=>{window.open('https://discord.com/oauth2/authorize?client_id=1092757546420416522', '_blank')}}>Dodaj bota do swojego serwera</button>
            <button style={{backgroundColor:"#602323"}} onClick={()=>{removeAcc()}}>Usuń konto</button>
    </>
}

export default UserViewData