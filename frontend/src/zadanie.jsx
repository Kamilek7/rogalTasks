import { useState} from 'react'

const Zadanie = ({zadanie, d, child, callback}) => {

    const [editMode, setEditMode] = useState(false);
    const [wysuniete, setWysuniete] = useState(false);
    const [nazwa, setNazwa] = useState(zadanie['nazwa'])
    const [data, setData] = useState(zadanie['data']);
    function getAutoHeight(el) {
        const clone = el.cloneNode(true);
        clone.style.height = "auto";
        clone.style.visibility = "hidden";
        clone.style.position = "absolute";
        clone.style.transition = "none";
        el.parentNode.appendChild(clone);
        const height = clone.scrollHeight;
        el.parentNode.removeChild(clone);
        return height;
    }

    const applyCSS = (id) =>
    {   
        let el = document.querySelector(`div[data-id='${id}']`);
        el.style.transition = 'all 0.5s ease-in-out';
        el.style.opacity= "0%";
        setTimeout(async () => {
            el.style.height='0px';
            el.style.padding='0px';
            el.style.margin='0px';
            if (el.className=="taskRowChild")
            {
                checkChildrenHeight(el.parentElement.parentElement, true)
                el.offsetHeight;
            }

        }, 600)

        
    }

    const usunZadania = async (id) => {

        applyCSS(id);
        const url = "https://tasks-backend.rogalrogalrogalrogal.online/usunZadanie/" + id;
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }
        setTimeout(async () => {
            const response = await fetch(url, options)
            
            callback();
        }, 1000)


    }

    

    const wykonajZadanie = async (id) => {

        applyCSS(id);
        const url = "https://tasks-backend.rogalrogalrogalrogal.online/wykonajZadanie/" + id;
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        }
        setTimeout(async () => {
            const response = await fetch(url, options)
            callback();
        }, 1000)
    }

    const checkChildrenHeight = (parent, flag) =>
    {
        parent.scrollHeight
        if (!wysuniete || flag)
        {
            requestAnimationFrame(() => {
                parent.style.height = getAutoHeight(parent) + "px";
                });

        }
        else
        {
            requestAnimationFrame(() => {
                parent.style.height = "0px";
                });

        }
    }

    const wysunZadania = (id) =>
    {  
        let parent = document.querySelector(`div[data-id='child${id}']`);        
        checkChildrenHeight(parent, false)
        setWysuniete(!wysuniete);
    }

    const toggleEditMode = (id) => {

        if (editMode)
        {
            updateTaskInfo(id);
        }
        setEditMode(!editMode)
    }

    const updateTaskInfo = async (id) => {
        const dane = {
            nazwa, data
        }
        const url = "https://tasks-backend.rogalrogalrogalrogal.online/updateTaskInfo/" + id;
        const options = {
            method: "PATCH",
            headers:  {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(dane)
        }
        const response = await fetch(url, options)
    }

        let czas;
        if (child)
            czas = new Date(data+ " GMT+0200");
        else
        {
            czas = new Date(data);
            var children = JSON.parse(zadanie.children);
            children.sort(function(a,b) {return new Date(a["data"] + " GMT+0200")- new Date(b["data"] + " GMT+0200")})
        }
        const localDate = new Date(data);
        var dateFormat = `${localDate.getFullYear()}-${`${localDate.getMonth()+1}`.padStart(2, 0)}-${`${localDate.getDate()}`.padStart(2, 0)}T${`${localDate.getHours()}`.padStart(2, 0)}:${`${localDate.getMinutes()}`.padStart(2, 0)}` 
        return (
            <div class='mainTaskContainer'>
                <div keyprop={zadanie["ID"]} class={(child)? 'taskRowChild' :'taskRow'} style={(czas.getTime() - d.getTime() <= 0) ? { backgroundColor: "rgb(123, 122, 117)" } : ((d.getYear() == czas.getYear() && d.getMonth() == czas.getMonth() && d.getDate() == czas.getDate()) ? { backgroundColor: "#9f1818" } : {})} data-id={zadanie["ID"]}>
                    <div class='taskContentWrapper'>
                        {(editMode)? (<div class='taskName'><input onChange={(e) =>{setNazwa(e.target.value)}} size={nazwa.length} class='nameChangeInput' type='text' value={nazwa}></input></div>) : (<div class='taskName'>{nazwa}</div>)}
                        <div class='taskContent'>{editMode ? <input type='datetime-local' onChange={(e) => {
                            const date = new Date(e.target.value);
                            setData(date.toUTCString());
                        }} value={dateFormat}></input> :data}</div>
                        {(!child)&& (<div class='progress-bar' style={{ height: "3px", backgroundColor: "#73603c", width: "90%", margin: "auto", marginTop: "2vh", marginBottom: "1vh" }}><div class='progress' style={{ height: "100%", position: "relative", top: "0", left: "0", backgroundColor: "#ddddb6", width: (zadanie["ratio"] + "%") }}></div></div>)}
                    </div>
                    <div class='buttons'>
                        {(!child && JSON.parse(zadanie["children"])[0].ID != null) && <div class='taskUnwrap' onClick={() => { wysunZadania(zadanie["ID"]) }}> <i style={((wysuniete)? {transform: "rotate(0deg)"} :{transform: "rotate(90deg)"})} class='icon-down-open'></i> </div>}
                        {((child || JSON.parse(zadanie["children"])[0].ID == null)&& !editMode) && <div class='taskFinished' onClick={() => { wykonajZadanie(zadanie["ID"]) }}> <i class='icon-ok'></i> </div>}
                        {(editMode && (child || JSON.parse(zadanie["children"])[0].ID == null)) && <div class='taskRemoved' onClick={() => {usunZadania(zadanie["ID"])}}> <i class='icon-trash-empty'></i> </div>}
                        <div class='taskEdit' onClick={() => { toggleEditMode(zadanie['ID']) }}><i class='icon-edit'></i></div>
                    </div>
                </div>
                <div key={"child" + zadanie["ID"]} class="children" data-id={"child" + zadanie["ID"]}>
                { 
                    (!child) &&
                        children.map((zadChild) => {
                            if (zadChild['nazwa']!=null)
                                return <Zadanie key={zadChild["ID"]} zadanie={zadChild} d={d} child={true} callback={callback}></Zadanie>
                            else
                                return <></>
                        })
                }
                </div>
            </div>
        )

}
export default Zadanie