import { useState, useEffect } from 'react'
import { useRequestActions } from './zadania_service';
import { getAutoHeight, useCSSAnimation } from './zadania_css';
import { getDateFormatted, getLocalDate } from './zadania_time';
const Zadanie = ({ backendLink, zadanie, d, child, callback }) => {
    
    const [editMode, setEditMode] = useState(false);
    const [wysuniete, setWysuniete] = useState(false);
    const [nazwa, setNazwa] = useState(zadanie['nazwa'])
    const [data, setData] = useState(zadanie['data']);
    const { checkChildrenHeight, applyCSS, updateDiv } = useCSSAnimation(wysuniete, child, zadanie["ID"])
    const { removeTask, completeTask, updateTaskInfo } = useRequestActions(zadanie["ID"], backendLink, callback, applyCSS)

    const wysunZadania = () => {
        let parent = document.querySelector(`div[data-id='child${zadanie["ID"]}']`);
        checkChildrenHeight(parent, false)
        setWysuniete(!wysuniete);
    }
    const toggleEditMode = () => {
        if (editMode) updateTaskInfo(nazwa, data);
        setEditMode(!editMode)
    }

    window.addEventListener('resize', updateDiv);
    const czas = getDateFormatted(data, child)
    if (!child) {
        var children = JSON.parse(zadanie.children);
        children.sort(function (a, b) { return new Date(a["data"] + " GMT+0200") - new Date(b["data"] + " GMT+0200") })
    }
    const dateFormat = getLocalDate(data)

    useEffect(() => {
        updateDiv();
    }, [zadanie])

    return (
        <div className='mainTaskContainer'>
            <div keyprop={zadanie["ID"]} className={(child) ? 'taskRowChild' : 'taskRow'} style={(czas.getTime() - d.getTime() <= 0) ? { backgroundColor: "rgb(123, 122, 117)" } : ((d.getYear() == czas.getYear() && d.getMonth() == czas.getMonth() && d.getDate() == czas.getDate()) ? { backgroundColor: "#9f1818" } : {})} data-id={zadanie["ID"]}>
                <div className='taskContentWrapper'>
                    {(editMode) ? (<div className='taskName'><input onChange={(e) => { setNazwa(e.target.value) }} size={nazwa.length} className='nameChangeInput' type='text' value={nazwa}></input></div>) : (<div className='taskName'>{nazwa}</div>)}
                    <div className='taskContent'>
                        {editMode ? <input type='datetime-local' onChange={(e) => {
                            const date = new Date(e.target.value);
                            setData(date.toUTCString());
                        }} value={dateFormat}></input> : data}
                    </div>
                    {(!child) && (<div className='progress-bar' style={{ height: "3px", backgroundColor: "#73603c", width: "90%", margin: "auto", marginTop: "2vh", marginBottom: "1vh" }}><div className='progress' style={{ height: "100%", position: "relative", top: "0", left: "0", backgroundColor: "#ddddb6", width: (zadanie["ratio"] + "%") }}></div></div>)}
                </div>
                <div className='buttons'>
                    {(!child && JSON.parse(zadanie["children"])[0].ID != null) && <div className='taskUnwrap' onClick={() => { wysunZadania(zadanie["ID"]) }}> <i style={((wysuniete) ? { transform: "rotate(0deg)" } : { transform: "rotate(90deg)" })} className='icon-down-open'></i> </div>}
                    {((child || JSON.parse(zadanie["children"])[0].ID == null) && !editMode) && <div className='taskFinished' onClick={() => { completeTask() }}> <i className='icon-ok'></i> </div>}
                    {(editMode && (child || JSON.parse(zadanie["children"])[0].ID == null)) && <div className='taskRemoved' onClick={() => { removeTask() }}> <i className='icon-trash-empty'></i> </div>}
                    <div className='taskEdit' onClick={() => { toggleEditMode() }}><i className='icon-edit'></i></div>
                </div>
            </div>
            <div key={"child" + zadanie["ID"]} className="children" data-id={"child" + zadanie["ID"]}>
                {
                    (!child) &&
                    children.map((zadChild) => {
                        if (zadChild['nazwa'] != null)
                            return <Zadanie key={zadChild["ID"]} backendLink={backendLink} zadanie={zadChild} d={d} child={true} callback={callback}></Zadanie>
                        else
                            return null
                    })
                }
            </div>
        </div>
    )

}
export default Zadanie