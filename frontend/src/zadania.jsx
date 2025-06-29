import React from "react"

const ZadaniaLista = ({zadania, callback}) => {

    const applyCSS = (id) =>
        
    {   
        let element = document.querySelector(`div[name='${id}']`);
        element.style.transition = 'opacity 0.8s ease-in-out';
        element.style.opacity= "0%";
        

    }

    const zadBezRodzica = zadania.filter((zad) => zad["parentID"] == 0);

    const usunZadania = async (id) => {

        applyCSS(id);
        const url = "https://tasks-backend.rogal-rogal.duckdns.org/usunZadanie/" + id;
        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        }
        let element = document.querySelector(`div[name='${id}']`);
        setTimeout(async () => {
            const response = await fetch(url, options)
            element.style.transition = 'opacity 0.005s ease-in-out';
            element.style.opacity= "100%";
            callback();
        }, 1000)


    }

    

    const wykonajZadanie = async (id) => {

        applyCSS(id);
        const url = "https://tasks-backend.rogal-rogal.duckdns.org/wykonajZadanie/" + id;
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            }
        }
        let element = document.querySelector(`div[name='${id}']`);
        setTimeout(async () => {
            const response = await fetch(url, options)
            element.style.transition = 'opacity 0.005s ease-in-out';
            element.style.opacity= "100%";
            callback();
        }, 1000)
    }

    const wysunZadania = (id) =>
    {
        var parent = document.getElementsByName("child" + id)[0];
        
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
                        return ( 
                        <div class='mainTaskContainer'>
                        <div class='taskRow' name={zadanie["ID"]}>
                            <div class='taskContentWrapper'>
                                <div class='taskName'>{zadanie["nazwa"]}</div>
                                <div class='taskContent'>{zadanie["data"]}</div>
                            </div>
                            { (JSON.parse(zadanie["children"])[0].ID)!= null &&<div class='taskUnwrap' onClick={() => {wysunZadania(zadanie["ID"])}}> v </div>}
                            { (JSON.parse(zadanie["children"])[0].ID)== null &&<div class='taskFinished'  onClick={() => {wykonajZadanie(zadanie["ID"])}}> o </div>}
                            <div class='taskRemoved' onClick={() => {usunZadania(zadanie["ID"])}}> x </div>
                        </div>
                        <div class="children" name={"child" + zadanie["ID"]}>
                            {
                                    zadania.filter((zad) => zad["parentID"] == zadanie["ID"]).map((zadChild) => {
                                        return (
                                        <div class='taskRowChild' name={zadChild["ID"]}>
                                            <div class='taskContentWrapper'>
                                                <div class='taskName'>{zadChild["nazwa"]}</div>
                                                <div class='taskContent'>{zadChild["data"]}</div>
                                            </div>
                                            <div class='taskFinished'  onClick={() => {wykonajZadanie(zadChild["ID"])}}> o </div>
                                            <div class='taskRemoved' onClick={() => {usunZadania(zadChild["ID"])}}> x </div>
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