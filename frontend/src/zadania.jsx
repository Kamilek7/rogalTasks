import React from "react"
import { useState} from 'react'

const ZadaniaLista = ({zadania, callback}) => {

    const d = new Date();

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

    const zadBezRodzica = zadania.filter((zad) => zad["parentID"] == 0);

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
        
        let parent = document.querySelector(`div[data-id='child${id}']`);        
        var children = parent.children;
        if (children[0].className == "taskRowChild")
        {
            for (var i = 0; i< children.length; i++)
            {
                children[i].classList.add("taskRowChild-hidden");
                children[i].classList.remove("taskRowChild");
            }

            parent.classList.add("children-hidden");
            parent.classList.remove("children");
            setTimeout( ()=> {
                parent.style.display="none";
            },600);
        }
        else
        {
            parent.style.display="block";
            parent.style.overflow="hidden";
            setTimeout( ()=> {
                parent.classList.add("children");
                parent.classList.remove("children-hidden");
            for (var i = 0; i< children.length; i++)
            {

                children[i].classList.add("taskRowChild");
                children[i].classList.remove("taskRowChild-hidden");
            }          
            },10);
                        setTimeout( ()=> {

                parent.style.overflow="";       
            },400);

        }
    }
    return <div id='tasks'>
            <div id='taskContainer'>
                {
                
                zadBezRodzica.map((zadanie) => 
                {
                    let czas = new Date(zadanie["data"]);
                        return ( 
                        <div class='mainTaskContainer'>
                        <div key={zadanie["ID"]} class='taskRow' style={(czas.getTime()- d.getTime()<=0)?{backgroundColor:"rgb(123, 122, 117)"}:((d.getYear() == czas.getYear() && d.getMonth() == czas.getMonth() && d.getDate() == czas.getDate())?{backgroundColor:"#9f1818"}:{})}  data-id={zadanie["ID"]}>
                            <div class='taskContentWrapper'>
                                <div class='taskName'>{zadanie["nazwa"]}</div>
                                <div class='taskContent'>{zadanie["data"]}</div>
                                <div class='progress-bar' style={{height:"3px", backgroundColor:"#73603c", width:"90%", margin:"auto", marginTop:"2vh", marginBottom:"1vh"}}><div class='progress' style={{height:"100%", position:"relative", top:"0", left:"0", backgroundColor:"#ddddb6", width:( zadanie["ratio"] +"%")}}></div></div>
                            </div>
                            <div class='buttons'>
                                { (JSON.parse(zadanie["children"])[0].ID)!= null &&<div class='taskUnwrap' onClick={() => {wysunZadania(zadanie["ID"])}}> v </div>}
                                { (JSON.parse(zadanie["children"])[0].ID)== null &&<div class='taskFinished'  onClick={() => {wykonajZadanie(zadanie["ID"])}}> o </div>}
                                <div class='taskRemoved' onClick={() => {usunZadania(zadanie["ID"])}}> x </div>
                            </div>
                        </div>
                        <div key={"child" + zadanie["ID"]} class="children" data-id={"child" + zadanie["ID"]}>
                            {
                                    zadania.filter((zad) => zad["parentID"] == zadanie["ID"]).map((zadChild) => {
                                        let czasChild = new Date(zadChild["data"]+ " GMT+0200");
                                        return (
                                        <div key={zadChild["ID"]} class='taskRowChild' style={(czasChild.getTime()- d.getTime()<=0)?{backgroundColor:"rgb(123, 122, 117)"}:((d.getYear() == czasChild.getYear() && d.getMonth() == czasChild.getMonth() && d.getDate() == czasChild.getDate())?{backgroundColor:"#9f1818"}:{})} data-id={zadChild["ID"]}>
                                            <div class='taskContentWrapper'>
                                                <div class='taskName'>{zadChild["nazwa"]}</div>
                                                <div class='taskContent'>{zadChild["data"]}</div>
                                            </div>
                                            <div class='buttons'>
                                                <div class='taskFinished'  onClick={() => {wykonajZadanie(zadChild["ID"])}}> o </div>
                                                <div class='taskRemoved' onClick={() => {usunZadania(zadChild["ID"])}}> x </div>
                                            </div>
                                        </div>
                                        )
                                    })
                                
                            }

                        </div>
                        </div>
                    )
                }
                
                )}

            </div>
            
    </div>
}

export default ZadaniaLista