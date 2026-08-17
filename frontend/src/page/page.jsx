import { useState, useEffect } from 'react'
import { useWindow } from './page_window.js'
import ZadaniaLista from "../zadania/zadania.jsx"
import ZadForm from "../zadania/noweZadania.jsx"
import Harmonogram from "../harmonogram/harmonogram.jsx"
import UserConfig from "../user/user.jsx"
import { useFetchedData } from './page_data.js'
import PageButton from './pageButton.jsx'

function Page() {

    const { bladOkna, zamknijOkno, otworzOkno, trybGlobal } = useWindow()
    const { update, zadania, userData, harmonogram, specificDate } = useFetchedData()

    useEffect(() => {
        update();
        const interval = setInterval(() => {
            update();
        }, 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, [])

    return <>

        <div id='buttonsLayout' className='flex justify-center items-center'>
            <PageButton clickFunc={() => {otworzOkno(0)}} icon={"icon-plus"}></PageButton>
            <PageButton clickFunc={() => {otworzOkno(1)}} icon={"icon-calendar-plus-o"} optional={true}></PageButton>
            <PageButton clickFunc={() => {otworzOkno(3)}} icon={"icon-address-book-o"} optional={true}></PageButton>
            <PageButton clickFunc={() => {logout()}} icon={"icon-logout"}></PageButton>
        </div>

        <div className="modal-hidden">
            <div className="modal-content">
                <span className="close" onClick={zamknijOkno}>&times;</span>
                {trybGlobal == 0 && <ZadForm zadania={zadania} zamknijOkno={() => { zamknijOkno(0) }} blad={bladOkna} callback={update} />}
                {trybGlobal == 1 && <Harmonogram harmonogram={harmonogram} zamknijOkno={() => { zamknijOkno(1) }} blad={bladOkna} callback={update} />}
                {trybGlobal == 3 && <UserConfig dane={userData} zamknijOkno={() => { zamknijOkno(3) }} blad={bladOkna} callback={update} />}
            </div>

        </div>
        {specificDate != "any" && <div><div style={{ margin: "auto", textAlign: 'center', marginTop: "5vh", fontSize: "3vh" }}>Zadania dla {specificDate}</div><button onClick={() => { update("any") }} style={{ marginTop: "1vh" }}>Resetuj</button></div>}
        <ZadaniaLista zadania={zadania} callback={update} />
    </>
}

export default Page