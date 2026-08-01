import { useState, useEffect } from 'react'
import { useWindow } from './page_window.js'
import ZadaniaLista from "../zadania/zadania.jsx"
import ZadForm from "../noweZadania.jsx"
import Harmonogram from "../harmonogram/harmonogram.jsx"
import UserConfig from "../user/user.jsx"
import { useFetchedData } from './page_data.js'

function Page({ backendLink, user, setCookie }) {

    const { bladOkna, zamknijOkno, otworzOkno, trybGlobal } = useWindow()
    const { update, zadania, userData, harmonogram, specificDate } = useFetchedData(backendLink, user)
    
    const logout = () => {
        setCookie("loginID", "")
    }

    useEffect(() => {
        update();
        const interval = setInterval(() => {
            update();
        }, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [])

    return <>

        <div id='buttonsLayout'>
            <button onClick={() => { otworzOkno(0) }}><i className="icon-plus"></i></button>
            <button className='optional' onClick={() => { otworzOkno(1) }}><i className="icon-calendar-plus-o"></i></button>
            <button className='optional' onClick={() => { otworzOkno(3) }}><i className="icon-address-book-o"></i></button>
            <button onClick={() => { logout() }}><i className="icon-logout"></i></button>
        </div>

        <div className="modal-hidden">
            <div className="modal-content">
                <span className="close" onClick={zamknijOkno}>&times;</span>
                {trybGlobal == 0 && <ZadForm backendLink={backendLink} zadania={zadania} zamknijOkno={() => { zamknijOkno(0) }} blad={bladOkna} callback={update} userID={user} />}
                {trybGlobal == 1 && <Harmonogram backendLink={backendLink} harmonogram={harmonogram} zamknijOkno={() => { zamknijOkno(1) }} blad={bladOkna} callback={update} userID={user} />}
                {trybGlobal == 3 && <UserConfig backendLink={backendLink} dane={userData} zamknijOkno={() => { zamknijOkno(3) }} blad={bladOkna} userID={user} callback={update} logout={logout} />}
            </div>

        </div>
        {specificDate != "any" && <div><div style={{ margin: "auto", textAlign: 'center', marginTop: "5vh", fontSize: "3vh" }}>Zadania dla {specificDate}</div><button onClick={() => { update("any") }} style={{ marginTop: "1vh" }}>Resetuj</button></div>}
        <ZadaniaLista backendLink={backendLink} zadania={zadania} callback={update} />
    </>
}

export default Page