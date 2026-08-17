import { userManager } from './user_service.js';
import { useUserData } from './user_data.js';

import Button from '../utils/button.jsx'
import HeaderText from '../utils/headerText.jsx';
import ErrorBar from '../utils/errorBar.jsx';
import FancyLabel from '../utils/fancyLabel.jsx';
function UserViewData({dane, zamknijOkno, callback}) {

    const traits = useUserData(dane).traits
    const {removeAcc, update} = userManager(zamknijOkno, callback)
    return <>
            <HeaderText>Panel uzytkownika</HeaderText>
            <h2 style={{marginBottom:"-0.4vw"}}>Zmień dane:</h2>
            <ErrorBar></ErrorBar>
                {traits.map(element => {
                    return (<><div style={{margin:"1.5vw auto", display:"flex", width:"fit-content", marginRight: "37%", marginLeft:"auto"}}>
                        <div>
                            <FancyLabel>{element.name}</FancyLabel>
                            <input className='min-w-[10vw]' {...element.extra} type={element.type} value={element.value} onChange={(e) => {element.change(e.target.value)}}></input>
                        </div>
                        <input id='submit' onClick={()=>update(element)} style={{marginLeft: "1.4vw"}} type='submit' value='Zmień'></input>
                    </div></>)
            })}
            
            <Button clickFunc={()=>{window.open('https://discord.com/oauth2/authorize?client_id=1092757546420416522', '_blank')}} customColor={"rgb(59, 66, 136)"}>Dodaj bota do swojego serwera</Button>
            <Button clickFunc={()=>{removeAcc()}} customColor={"#602323"}>Usuń konto</Button>
    </>
}

export default UserViewData