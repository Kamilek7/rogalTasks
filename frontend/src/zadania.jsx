import React from "react"

import Zadanie from "./zadanie";

const ZadaniaLista = ({zadania, callback}) => {

    

    const d = new Date();

    const zadBezRodzica = zadania.filter((zad) => zad["parentID"] == 0);

    return <div id='tasks'>
            <div id='taskContainer'>
                {
                    zadBezRodzica.map((zadanie) => 
                    {
                        return <Zadanie zadanie={zadanie} d={d} child={false} callback={callback}></Zadanie>
                    }
                )}

            </div>
            
    </div>
}

export default ZadaniaLista