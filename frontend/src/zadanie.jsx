import { useState} from 'react'

const Zadanie = ({zadanie, d, child}) => {

    const [editMode, setEditMode] = useState(false);
    const [wysuniete, setWysuniete] = useState(false);
    const [nazwa, setNazwa] = useState(zadanie['nazwa'])
    const [data, setData] = useState(zadanie['data']);
    const applyCSS = (id) =>
        
    {   
        let el = document.querySelector(`div[data-id='${id}']`);
        el.style.transition = 'all 0.5s ease-in-out';
        el.style.opacity= "0%";
        setTimeout(async () => {
            el.style.height='0px';
            el.style.padding='0px';
            el.style.margin='0px';
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

    const wysunZadania = (id) =>
    {
        
        setWysuniete(!wysuniete);

        let parentParent = document.querySelector(`div[data-id='${id}']`);
        let parent = document.querySelector(`div[data-id='child${id}']`);        
        var children = parent.children;

        console.log(parent);
        if (children[0].className == "taskRowChild")
        {
            
        }
        else
        {
            
        }
        // if (children[0].className == "taskRowChild")
        // {
        //     for (var i = 0; i< children.length; i++)
        //     {
        //         children[i].classList.add("taskRowChild-hidden");
        //         children[i].classList.remove("taskRowChild");
        //     }

        //     parent.classList.add("children-hidden");
        //     parent.classList.remove("children");
        //     setTimeout( ()=> {
        //         parent.style.display="none";
        //     },600);
        //     
        // }
        // else
        // {
        //     
        //     parent.style.display="block";
        //     parent.style.overflow="hidden";
        //     setTimeout( ()=> {
        //         parent.classList.add("children");
        //         parent.classList.remove("children-hidden");
        //     for (var i = 0; i< children.length; i++)
        //     {

        //         children[i].classList.add("taskRowChild");
        //         children[i].classList.remove("taskRowChild-hidden");
        //     }          
        //     },10);
        //                 setTimeout( ()=> {

        //         parent.style.overflow="";       
        //     },400);

        // }
    }

    const toggleEditMode = (id) => {

        // if (!editMode)
        // {
        //     var parent = document.querySelector(`div[keyprop='${id}']`);
        //     var taskNameDiv = parent.children[0].children[0];
        //     taskNameDiv.innerHTML = `<input class='nameChangeInput' type='text' value='${taskNameDiv.innerHTML}'></div>`
        // }
        // else
        // {
        //     var parent = document.querySelector(`div[keyprop='${id}']`);
        //     var taskNameDiv = parent.children[0].children[0];
        //     taskNameDiv.innerHTML = `<input class='nameChangeInput' type='text' value='${taskNameDiv.innerHTML}'></div>`
        // }
        setEditMode(!editMode)
    }

        let czas;
        if (child)
            czas = new Date(data+ " GMT+0200");
        else
        {
            czas = new Date(data);
            var children = JSON.parse(zadanie.children);
        }
        return (
            <div class='mainTaskContainer'>
                <div key={zadanie["ID"]} keyprop={zadanie["ID"]} class={(child)? 'taskRowChild' :'taskRow'} style={(czas.getTime() - d.getTime() <= 0) ? { backgroundColor: "rgb(123, 122, 117)" } : ((d.getYear() == czas.getYear() && d.getMonth() == czas.getMonth() && d.getDate() == czas.getDate()) ? { backgroundColor: "#9f1818" } : {})} data-id={zadanie["ID"]}>
                    <div class='taskContentWrapper'>
                        {(editMode)? (<div class='taskName'><input onChange={() =>{}} size={nazwa.length} class='nameChangeInput' type='text' value={nazwa}></input></div>) : (<div class='taskName'>{nazwa}</div>)}
                        
                        <div class='taskContent'>{data}</div>
                        {(!child)&& (<div class='progress-bar' style={{ height: "3px", backgroundColor: "#73603c", width: "90%", margin: "auto", marginTop: "2vh", marginBottom: "1vh" }}><div class='progress' style={{ height: "100%", position: "relative", top: "0", left: "0", backgroundColor: "#ddddb6", width: (zadanie["ratio"] + "%") }}></div></div>)}
                    </div>
                    <div class='buttons'>
                        {(!child && JSON.parse(zadanie["children"])[0].ID != null) && <div style={((wysuniete)? {transform: "rotate(0deg)"} :{transform: "rotate(90deg)"})} class='taskUnwrap' onClick={() => { wysunZadania(zadanie["ID"]) }}> <i class='icon-down-open'></i> </div>}
                        {((child || JSON.parse(zadanie["children"])[0].ID == null)&& !editMode) && <div class='taskFinished' onClick={() => { wykonajZadanie(zadanie["ID"]) }}> <i class='icon-ok'></i> </div>}
                        {(editMode) && <div class='taskRemoved' onClick={() => {usunZadania(zadanie["ID"])}}> <i class='icon-trash-empty'></i> </div>}
                        <div class='taskEdit' onClick={() => { toggleEditMode(zadanie['ID']) }}><i class='icon-edit'></i></div>
                    </div>
                </div>
                <div key={"child" + zadanie["ID"]} class="children" data-id={"child" + zadanie["ID"]}>
                { 
                    (!child && wysuniete) &&
                        children.map((zadChild) => {
                            if (zadChild['nazwa']!=null)
                                return <Zadanie zadanie={zadChild} d={d} child={true}></Zadanie>
                            else
                                return <></>
                        })
                }
                </div>
            </div>
        )

}
export default Zadanie